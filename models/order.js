import mongoose from "mongoose";
const { Schema } = mongoose;

const orderItemSchema = new Schema({
productId: { type: String, required: true },

    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
}, { timestamps: true });

const orderSchema = new Schema({
    orderId:{type:String, required: true, unique: true},
    user: {
        firstname: { type: String, required: true },
        lastname: { type: String, optional: true },
        phone: { type: String, required: true },
        message:{type: String, required: true }
    },
    items: [orderItemSchema], // Array of order items using the sub-schema
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'picked', 'delivered', 'cancelled'],
        default: 'pending',
    },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true, default: "Karachi" },
    },
    paymentMethod: {
        type: String,
        default: 'cash_on_delivery',
        required: true,
    },

}, { timestamps: true });

const ORDER = mongoose.model('Order', orderSchema);

export default ORDER