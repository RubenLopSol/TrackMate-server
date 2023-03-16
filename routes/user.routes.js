const express = require("express");
const router = express.Router();
const User = require("../models/User.model")
const fileUploader = require("../config/cloudinary.config");


router.post("/upload", fileUploader.single("avatar"), (req, res, next) => {
    // console.log("file is: ", req.file)
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    res.json({ fileUrl: req.file.path });
  });
  // POST '/user/avatar' => for saving a avatar in the database
router.post("/avatar/:idUser", (req, res, next) => {
  const {idUser}= req.params
  console.log("req.body=",req.body)
  User.findByIdAndUpdate(idUser, req.body)
    .then((avatar) => {
      console.log("Created new : ", avatar);
      res.status(200).json(avatar);
    })
    .catch((err) => next(err));
});

router.put("/edit/:idUser", (req, res, next) => {
    const { idUser } = req.params;
    const { driverCoordinates } = req.body;

    User.findByIdAndUpdate( idUser, {driverCoordinates})
    .then(result => {
        res.json(result)
    })
    .catch(err => console.log(err))
})

module.exports = router;
