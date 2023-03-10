const express = require("express");
const router = express.Router();
/* const sendMail = require("../utils/nodemailer") */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const saltRounds = 10;
router.post("/signup", (req, res, next) => {

  const { email, password, username, lastname, isTransporter } = req.body;

  // Check if email or password or name are provided as empty strings
  if (email === "" || password === "" || username === "" || lastname === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }
  User.findOne({ email })
    .then((foundUser) => {
      /*   sendMail(foundUser.email, "Truck Mate: You have been correctly signed up!", name)
          .then(result => {
            res.json("ok", result)
          })
          .catch(err => next(err)) */
      if (foundUser) {
        res.json({ error: "el usuario ya existe" });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create({
        email,
        password: hashedPassword,
        username,
        lastname,
        isTransporter,
      });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, username, _id } = createdUser;
      // Create a new object that doesn't expose the password
      const user = { email, username, _id };
      // Send a json response containing the user object
      res.status(201).json({ user: username });
    })
    .catch((err) => next(err));
});
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      if (passwordCorrect) {
        const { _id, email, name } = foundUser;
        const payload = { _id, email, name };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err));
});
// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  // console.log(`req.payload`, req.payload);
  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});
router.get("/profile/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    /* .populate("package") */
    .then((response) => {
      res.json(response);
    })
    .catch((err) => next(err));
});
router.put("/profile/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { username, email } = req.body;
  User.findByIdAndUpdate(id, { username, email }, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
});
module.exports = router;
