const express = require("express");
const products = require("../controllers/product.controller");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join('./public/images'));
        console.log("file saved in "+path.join('./public/images'));
    },
    filename:function(req, file, cb){
        var name = Date.now()+path.extname(file.originalname);
        console.log(file)
        cb(null,name);
    }
});
const upload = multer({storage:storage});

router.route("/")
    .get(products.findAll)
    .post(upload.single('file'),products.create);
    // .delete(products.deleteAll);
// router.route("/favorite")
//     .get(products.findAllFavorite);
router.route("/:id") 
    .get(products.findOne)
    .put(upload.single('file'),products.update)
    .delete(products.delete);
module.exports = router;