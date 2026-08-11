const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const brevoConfigured = () =>
  process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL;

const sendViaBrevo = async ({ to, toName, subject, html }) => {
  const res = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        email: process.env.BREVO_SENDER_EMAIL,
        name: process.env.BREVO_SENDER_NAME || "Verve",
      },
      to: [{ email: to, name: toName || to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Brevo send failed (${res.status}): ${errBody}`);
  }
};

export const sendResetEmail = async (to, resetUrl) => {
  const subject = "Reset your Verve password";
  const html = `
    <p>You requested a password reset.</p>
    <p><a href="${resetUrl}">Click here to reset your password</a> (link expires in 30 minutes).</p>
    <p>If you didn't request this, you can safely ignore this email.</p>
  `;

  if (!brevoConfigured()) {
    console.log(
      "\n=== PASSWORD RESET (Brevo not configured, printing instead) ===",
    );
    console.log(`To: ${to}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log(
      "================================================================\n",
    );
    return;
  }

  await sendViaBrevo({ to, subject, html });
};

export const sendWelcomeEmail = async (to, name) => {
  const subject = "Welcome to Verve!";
  const html = `
    <p>Hi ${name},</p>
    <p>Thanks for creating an account with Verve. We're glad you're here!</p>
    <p>Start browsing whenever you're ready -- your cart will follow you across devices now that you're signed in.</p>
  `;

  if (!brevoConfigured()) {
    console.log(
      `\n=== WELCOME EMAIL (Brevo not configured, skipping) === To: ${to}\n`,
    );
    return;
  }

  try {
    await sendViaBrevo({ to, toName: name, subject, html });
  } catch (err) {
    // A failed welcome email shouldn't ever break signup -- log and move on.
    console.error("Welcome email failed to send:", err.message);
  }
};
