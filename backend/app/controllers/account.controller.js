const AccountService = require("../services/account.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const bcrypt = require('bcrypt');

exports.create = async (req, res, next) => {
    // console.log(req.body?.email);
    // console.log(req.body?.password);
    if(!req.body?.email || !req.body?.password) {
        return next(new ApiError(400, "Email or password can not be empty"));
    }

    try {
        const accountService = new AccountService(MongoDB.client);
        // console.log("abc");
        const document = await accountService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.login = async (req, res, next) => {
    // let documents = [];

    try {
        const accountService = new AccountService(MongoDB.client);
        const {email, password} = req.body;
        console.log(email);
        if(email) {
            documents = await accountService.findByEmail(email);
            // console.log(documents.password);
            if(documents) {
                const match = await bcrypt.compare(password, documents.password);
                if(match) {
                    // res.send("Dang nhap thanh cong");
                    return res.send(documents);
                } else {
                    // res.send("Sai mat khau");
                    return res.send({error: true});
                } 
            } else {
                res.send('Không tìm thấy tài khoản');
            }
        } else {
            res.send('Vui lòng nhập email');
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }

    return 0;
}