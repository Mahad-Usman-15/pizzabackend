import express from "express";
import Product from "../models/products.js";
import Joi from "joi";
const router = express.Router();
router.use(express.json());


const ProductSchema = Joi.object({
  sku: {
    quantity: Joi.number().min(1).required()
  },
  product: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().required()
  },
  category: Joi.string().required(),
})

router.post("/products", async (req, res) => {
  try {
    const { error, value } = ProductSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newProduct = new Product(value);
    await newProduct.save();

    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.send("Failed to fetch the product")
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Update product by id
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = ProductSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, value, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Internal server error" });
  }


})


export default router