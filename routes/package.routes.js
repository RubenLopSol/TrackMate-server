const express = require("express");
const router = express.Router();
const Package = require("../models/Package.model")

router.get("/all", (req, res, next) => {
  Package.find()
  .then(response => {
    res.json(response)
  })
});
router.post("/new", (req, res, next) => {
  const {title, description, address } = req.body
  console.log("hola")
  Package.create({title, description, address })
  .then(response => {
    res.json({response})
  })
  .catch(err => next(err))
})

router.put("/edit/:packageId", (req, res, next) => {
  res.json("Package edit")
})
router.delete("/delete/:packageId", (req, res, next) => {
  res.json("Delete")
})

module.exports = router;
