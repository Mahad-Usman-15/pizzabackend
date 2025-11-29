import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { Schema } = mongoose;
const productSchema = new Schema(
    {
        sku: {
            quantity: { type: Number, required: true,min:1 },
        },
        product: {
            name: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true }
        },
        category: { type: String, required: true },
    },
    { timestamps: true }
)

const Product = mongoose.model("Products", productSchema);

export default Product;
