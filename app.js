require("dotenv").config();

require("./db");

const express = require("express");

const app = express();
require("./config")(app);

const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

const packageRoutes = require("./routes/package.routes");
app.use("/package", packageRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

require("./error-handling")(app);

module.exports = app;
