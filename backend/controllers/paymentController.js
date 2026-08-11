import crypto from "crypto";
import User from "../models/User.js";
import Order from "../models/Order.js";

const generateSignature = (message) => {
  const hmac = crypto.createHmac("sha256", process.env.ESEWA_SECRET_KEY);
  hmac.update(message);
  return hmac.digest("base64");
};

// Step 1: build a pending order from the user's cart, and return the form
// fields the frontend needs to auto-submit to eSewa's payment page.
export const initiateEsewaPayment = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");
    if (user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let subtotalCents = 0;
    let addonsCents = 0;
    let hiddenFeesCents = 0;
    const lineItems = [];

    for (const item of user.cart) {
      subtotalCents += item.product.priceCents * item.quantity;
      const addonTotal = (item.addons || []).reduce((s, a) => s + a.priceCents, 0);
      addonsCents += addonTotal * item.quantity;
      hiddenFeesCents += (item.product.hiddenFeeCents || 0) * item.quantity;
      lineItems.push({
        name: item.product.name,
        quantity: item.quantity,
        priceCents: item.product.priceCents,
        addons: item.addons,
      });
    }

    const totalCents = subtotalCents + addonsCents + hiddenFeesCents;
    const transactionUuid = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

    const order = await Order.create({
      user: user._id,
      lineItems,
      subtotalCents,
      addonsCents,
      hiddenFeesCents,
      totalCents,
      transactionUuid,
      status: "pending",
    });

    // eSewa wants amounts as plain rupees (not cents/paisa), as a number/string.
    const totalAmount = (totalCents / 100).toFixed(2);
    const productCode = process.env.ESEWA_PRODUCT_CODE;

    const signedFieldNames = "total_amount,transaction_uuid,product_code";
    const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
    const signature = generateSignature(message);

    res.status(200).json({
      formAction: process.env.ESEWA_FORM_URL,
      fields: {
        amount: totalAmount,
        tax_amount: "0",
        total_amount: totalAmount,
        transaction_uuid: transactionUuid,
        product_code: productCode,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: `${process.env.BACKEND_URL}/api/payment/esewa/success`,
        failure_url: `${process.env.BACKEND_URL}/api/payment/esewa/failure`,
        signed_field_names: signedFieldNames,
        signature,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Step 2: eSewa redirects the user's browser here after payment, with a
// base64-encoded `data` query param. Verify its signature before trusting it.
export const handleEsewaSuccess = async (req, res) => {
  try {
    const decoded = JSON.parse(Buffer.from(req.query.data, "base64").toString("utf-8"));
    const { transaction_uuid, total_amount, product_code, status, signed_field_names, signature } = decoded;

    const fieldMap = { total_amount, transaction_uuid, product_code };
    const message = signed_field_names.split(",").map((f) => `${f}=${fieldMap[f]}`).join(",");
    const expectedSignature = generateSignature(message);

    if (expectedSignature !== signature || status !== "COMPLETE") {
      return res.redirect(`${process.env.CLIENT_URL}/order/failure`);
    }

    const order = await Order.findOne({ transactionUuid: transaction_uuid });
    if (!order) {
      return res.redirect(`${process.env.CLIENT_URL}/order/failure`);
    }

    // Extra safety net: cross-check against eSewa's own status API rather
    // than trusting the redirect alone, since query params can in principle
    // be replayed or tampered with in transit.
    const statusCheckUrl =
      `${process.env.ESEWA_STATUS_URL}?product_code=${product_code}` +
      `&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`;
    const statusRes = await fetch(statusCheckUrl);
    const statusData = await statusRes.json();

    if (statusData.status !== "COMPLETE") {
      order.status = "failed";
      await order.save();
      return res.redirect(`${process.env.CLIENT_URL}/order/failure`);
    }

    order.status = "paid";
    order.paidAt = new Date();
    await order.save();

    await User.findByIdAndUpdate(order.user, { cart: [] });

    res.redirect(`${process.env.CLIENT_URL}/order/success?orderId=${order._id}`);
  } catch (err) {
    console.error("eSewa verification failed:", err);
    res.redirect(`${process.env.CLIENT_URL}/order/failure`);
  }
};

export const handleEsewaFailure = async (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/order/failure`);
};

// Used by the frontend success page to fetch and display order details.
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};