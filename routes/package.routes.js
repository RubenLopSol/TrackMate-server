const express = require("express");
const { findByIdAndUpdate } = require("../models/Package.model");
const router = express.Router();
const Package = require("../models/Package.model")

router.get("/all" , (req, res, next) => {
Package.find()
.then(response => {
  res.json(response)
})
.catch(err=> next(err))
})

router.get("/:idUser", (req, res, next) => {
  const {idUser} = req.params;
  Package.find( {creator: idUser} )
    .then(response => {
      res.json(response)
    })
    .catch(err => next(err))
});
router.post("/new", (req, res, next) => {
  const { title, description, address, size, coordinates, creator } = req.body;
    Package.create({ title, description, address, size, coordinates, creator })
      .then(response => {
        res.json(response);
      })
      .catch(err => next(err))
})

router.get("/:idPackage", (req, res, next) => {
  const { idPackage } = req.params;
  Package.findById(idPackage)
    .populate("creator")
    .then(response => {
      res.json(response)
    })
    .catch(err => next(err))
})
router.put("/:idPackage/edit", (req, res, next) => {
  const { idPackage } = req.params;
  const { title, description, address, size, /* isTransported */} = req.body;

 /*  if (isTransported != "Pending") return; */

  Package.findByIdAndUpdate(idPackage, {title, description, address, size, /* isTransported */}, {new:true})
  .then(result => {
    res.json(result)
  })
  .catch(err=> next(err))

})

router.delete("/:idPackage/delete", (req, res, next)=> {
  const{id} = req.params;
  if(isTransported != "Pending") return;
  Package.findByIdAndDelete(id)
  .then(result=> {
    res.json(result)
  })
  .catch(err=>next(err))
})



module.exports = router;
