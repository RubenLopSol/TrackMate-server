
const express = require("express");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

const cors = require("cors");
require("dotenv").config();

//const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

module.exports = (app) => {

  app.set("trust proxy", 1);

  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL || "http://localhost:3000"
    })
  );

  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
