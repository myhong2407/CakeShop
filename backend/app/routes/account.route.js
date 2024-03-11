const express = require("express");
const accounts = require("../controllers/account.controller");

const router = express.Router();

router.route("/") 
    .post(accounts.login)
router.route("/create")
    .post(accounts.create);

module.exports = router;