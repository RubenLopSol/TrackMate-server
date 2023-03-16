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
router.post("/avatar/:idUser", (req, res, next) => {
  const {idUser}= req.params
  console.log("req.body is =",req.body)
  User.findByIdAndUpdate(idUser, req.body)

    .then((avatar) => {
      console.log("Updated user info : ", avatar);
      res.status(200).json(avatar);
    })
    .catch((err) => next(err));
});

// GET '/user/avator/:idUser'
// router.get("/avatar/:idUser", (req, res, next) => {
//   const {idUser}= req.params
//   //console.log("req.body=",req.body)
//   User.findById(idUser)

//     .then((result) => {
//       console.log("Search avator for user:  ", result.avatar);
//       res.status(200).json(result);
//     })
//     .catch((err) => next(err));
// });



module.exports = router;

