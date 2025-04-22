const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/user.routes");
const db = require("./models");

var corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

// Sync DB
db.sequelize
  .sync({ force: false })
  .then(() => console.log("Database synced"))
  .catch((err) => console.log("Error syncing DB:", err));

module.exports = app;
