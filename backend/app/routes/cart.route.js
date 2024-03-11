require('dotenv').config()
const express = require('express');
const carts = require("../controllers/cart.controller");
// const auths = require("../auth/auth");
const router = express.Router();


router.route("/")
    // .get(carts.findAll)
    .post(carts.create);
    // .delete(carts.deleteAll);
// router.route("/favorite")
//     .get(carts.findAllFavorite);
router.route("/:id") 
    .get(carts.findOne)
    .put(carts.update)
    .delete(carts.delete);

router.route("/deleteOneProduct/:id").post(carts.deleteProduct);
router.route("/deleteAllProduct/:id").get(carts.deleteAllProduct);
router.route("/findByUserId/:id").get(carts.findOneByUserId);
module.exports = router;