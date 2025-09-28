const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/fastfood");
    console.log("✅ MongoDB Connected: fastfood");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }
}
connectDB();

// ✅ Product Schema & Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  description: String,
  location: String,
});
const Product = mongoose.model("Product", productSchema, "products");

// ✅ User Schema & Model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String, 
   role: { type: String, default: "user" },
});
const User = mongoose.model("User", userSchema);

// 📦 Routes
// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get products by category
app.get("/products/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📝 SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    res.json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 🔑 LOGIN (no bcrypt)

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

  

    res.json({
      message: "Login successful",
      user: { id: user._id, firstName: user.firstName, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post("/products", async (req, res) => {
  try {
    const { name, price, category, image, description, location } = req.body;

    const newProduct = new Product({ name, price, category, image, description, location });
    await newProduct.save();

    res.json({ message: "Product added successfully", newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
