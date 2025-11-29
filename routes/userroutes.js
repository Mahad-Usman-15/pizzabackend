import express from "express"
import User from "../models/user.js";

const router = express.Router();
// router.use(express.json())
// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  }
  catch (error) {
    console.log("Error=>", error)
    res.status(500).json("Internal Server Error")
    console.log("Internal Server Error")
  }
})


// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: "Not an admin" });
    }

    return res.status(200).json({
      message: "Admin login successful",
      user
    });

  } catch (error) {
    console.log("Error =>", error);
    return res.status(500).json({ message: "Server error" });
  }
});

//Admin create login
router.post("/create-admin", async (req, res) => {
  try {
    const admin = await User.create(req.body);

    if (admin) {
      res.status(201).json({ message: "Admin created successfully", admin });
      console.log("Admin:", admin);

    } else {
      res.status(400).json({ message: "Admin not created" });
    }
  } catch (error) {
    console.log("Error=>", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router