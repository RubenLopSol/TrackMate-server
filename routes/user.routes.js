const express = require("express");
const router = express.Router();
const User = require("../models/User.model")
const fileUploader = require("../config/cloudinary.config");


// POST "/user/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("avatar"), (req, res, next) => {
    // console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    res.json({ fileUrl: req.file.path });
  });

  // POST '/user/avatar' => for saving a avatar in the database
router.post("/avatar", (req, res, next) => {

  User.create(req.body)
    .then((createdAvatar) => {
      console.log("Created new movie: ", createdAvatar);
      res.status(200).json(createdAvatar);
    })
    .catch((err) => next(err));
});

module.exports = router;

