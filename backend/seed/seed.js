import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import { buildProducts } from "./products.js";
import { buildNewArrivals } from "./newArrivalsProducts.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  const products = [...buildProducts(), ...buildNewArrivals()];
  await Product.insertMany(products);
  console.log(`Inserted ${products.length} products.`);
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
