const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const connection = require("./database/db");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connection();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

app.use("/api/auth", userRoutes);
app.use("/api", postRoutes);

app.listen(5000, () => console.log("Server works on port 5000"));
