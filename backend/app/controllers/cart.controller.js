require('dotenv').config()
const CartService = require("../services/cart.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const path = require("path");
var res = require("express/lib/response");


exports.create = async (req, res, next) => {
    // res.send({ message: "create handler"});
    if(!req.body?.account_id) {
        return next(new ApiError(400, "Can not be empty"));
    }

    try {
        const cartService = new CartService(MongoDB.client);
        // console.log("abc");
        const document = await cartService.create(req.body);
        console.log(document)
        if (document) {
            return res.send({ success: true, cart: document});
        }
        res.send(document)
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the product")
        );
    }
};

exports.findAll = async (req, res, next) => {
    // res.send({ message: "findAll handler"});
    let documents = [];

    try {
        const cartService = new CartService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await cartService.findByName(name);
        } else {
            documents = await cartService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving objects")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    // res.send({ message: "findOne handler"});
    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.findById(req.params.id);
        if(!document) {
            return next(new ApiError(404, "object not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
}

exports.findOneByUserId = async (req, res, next) => {
    // res.send({ message: "findOne handler"});
    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.findByUserId(req.params.id);
        if(!document) {
            return next(new ApiError(404, "object not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
}

exports.update = async (req, res, next) => {
    // res.send({ message: "update handler"});
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "object was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating object with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    // res.send({ message: "delete handler"});
    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "object not found"));
        }
        return res.send({ message: "object was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete object with id=${req.params.id}`
            )
        );
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        console.log(req.params.id)
        const data = await cartService.findById(req.params.id);
        console.log(data)

        const document = await cartService.deleteProduct(req.params.id, req.body.prod_id);
        return res.send(document);

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing products")
        );
    }
}

exports.deleteAllProduct = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.deleteAllProduct(req.params.id);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing products")
        );
    }
}