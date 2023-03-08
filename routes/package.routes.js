const express = require("express");
const router = express.Router();

router.get("/all", (req, res, next) => {
  res.json("All packages");
});
router.post("/new", (req, res, next) => {
  res.json("NEW")
})

router.put("/edit/:packageId", (req, res, next) => {
  res.json("Package edit")
})
router.delete("/delete/:packageId", (req, res, next) => {
  res.json("Delete")
})

module.exports = router;
