require('dotenv').config()
const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const path = require("path");
var res = require("express/lib/response");

exports.create = async (req, res, next) => {
    // res.send({ message: "create handler"});
    if(!req.body?.prod_name || !req.body?.prod_price || !req.body?.prod_quantity 
        || !req.body?.prod_category || !req.body?.prod_img || !req.body?.prod_desc) {
        return next(new ApiError(400, "Can not be empty"));
    }

    try {
        const productService = new ProductService(MongoDB.client);
        const data = {
            'prod_img':  req.file.filename,
            'prod_desc': req.body.prod_desc,
            'prod_price': req.body.prod_price,
            'prod_quantity': req.body.prod_quantity,
            'prod_name': req.body.prod_name,
            'prod_category': req.body.prod_category,
        }
        console.log(data)
        const document = await productService.create(data);
        // return res.send(document);
        res.send({ success: true});
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
        const productService = new ProductService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await productService.findByName(name);
        } else {
            documents = await productService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving products")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    // res.send({ message: "findOne handler"});
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if(!document) {
            return next(new ApiError(404, "product not found"));
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
        const productService = new ProductService(MongoDB.client);
        const data = {
            'prod_img': req.file.filename,
            'prod_desc': req.body.prod_desc,
            'prod_price': req.body.prod_price,
            'prod_quantity': req.body.prod_quantity,
            'prod_name': req.body.prod_name,
            'prod_category': req.body.prod_category,
        }
        const document = await productService.update(req.params.id, data);
        if(!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "product was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating product with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    // res.send({ message: "delete handler"});
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "product not found"));
        }
        return res.send({ message: "product was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete product with id=${req.params.id}`
            )
        );
    }
}