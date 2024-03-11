const express = require("express");
const categories = require("../controllers/category.controller");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.route("/")
    .get(categories.findAll)
    .post(categories.create);
    // .delete(categories.deleteAll);
// router.route("/favorite")
//     .get(categories.findAllFavorite);
router.route("/:id") 
    .get(categories.findOne)
    .put(categories.update)
    .delete(categories.delete);
module.exports = router;