import express from "express";
import Contact from "../models/contact.js";
import Joi from "joi";

const router = express.Router();
router.use(express.json());

router.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find();  // FIXED
        res.status(200).json(contacts);
    }
    catch (error) {
        console.log("Error=>", error);
        res.status(500).json("Internal Server Error");
    }
});

router.post("/contact", async (req, res) => {
    try {
        const contactFormSchema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().pattern(/^\d{10}$/).required(),
            message: Joi.string().min(10).max(500).required(),
        });

        const { error, value } = contactFormSchema.validate(req.body);
        if (error) {
            console.log(error.details[0].message);
            return res.status(400).json({ message: error.details[0].message });
        }

        const newContact = await Contact.create(value);
        res.status(200).json({ message: "Message successfully sent", user: newContact });

    } catch (err) {
        console.error("Error sending message:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
