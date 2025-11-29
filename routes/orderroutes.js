import express from "express";
import ORDER from "../models/order.js";
import Joi from "joi";
const router = express.Router();
router.use(express.json());

const orderItemSchema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
    price: Joi.number().min(0).required(),
});

const orderValidationSchema = Joi.object({
    orderId: Joi.string(),
    user: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().optional(),
        phone: Joi.string().required(),
        message: Joi.string().required(),
    }).required(),
    items: Joi.array().items(orderItemSchema).required(),
    totalAmount: Joi.number().min(0).required(),
    status: Joi.string().valid('pending', 'picked', 'delivered', 'cancelled').default('pending'),
    shippingAddress: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().default("Karachi"),
    }).required(),
    paymentMethod: Joi.string().default('cash_on_delivery').required(),
});


// GET all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await ORDER.find();
        res.status(200).send({ orders });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// POST a new order
router.post('/order', async (req, res) => {
    try {
        const { error, value } = orderValidationSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        value.orderId = Math.random().toString(36).substring(2, 9);

        const newOrder = await ORDER.create(value);

        res.status(201).json({
            message: "Order created successfully",
            orderId: value.orderId,
            order: newOrder
        });

    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});


// GET an order by orderId
router.get('/order/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await ORDER.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ order });
    } catch (err) {
        console.error("Error fetching order:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});



// PUT (update) an order by ID
router.put('/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = orderValidationSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedOrder = await ORDER.findByIdAndUpdate(id, value, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
    } catch (err) {
        console.error("Error updating order:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});



// DELETE an order by ID
router.delete('/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await ORDER.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
        console.error("Error deleting order:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;