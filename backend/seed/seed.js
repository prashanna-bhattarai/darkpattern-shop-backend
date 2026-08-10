import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import { buildProducts } from "./products.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB for seeding.");

  await Product.deleteMany({});
  console.log("Cleared existing products.");

  const products = buildProducts();
  await Product.insertMany(products);
  console.log(`Inserted ${products.length} products.`);

  await mongoose.disconnect();
  console.log("Done. Disconnected.");
};

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
