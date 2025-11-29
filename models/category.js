import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        category: { name: { type: String, unique: true, required: true }, sectionid: { type: String, unique: true, required: true } },
    },
    { timestamps: true }
)

const Category = mongoose.model("Categories", categorySchema);

export default Category;
