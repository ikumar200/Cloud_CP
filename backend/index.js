const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const admin = require("./firebase");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔐 Middleware to verify Firebase ID token
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// 📥 Store user data
app.post("/store_user_data", authenticate, async (req, res) => {
  const { email, name } = req.body;
  const uid = req.user.uid;

  try {
    await pool.query(
      "INSERT INTO users (uid, email, name, registered_at) VALUES ($1, $2, $3, NOW()) ON CONFLICT (uid) DO NOTHING",
      [uid, email, name]
    );
    res.status(200).json({ message: "User data stored" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 📤 Get user data
app.get("/get_user_data", authenticate, async (req, res) => {
  const uid = req.user.uid;

  try {
    const result = await pool.query("SELECT * FROM users WHERE uid = $1", [uid]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Health check
app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
