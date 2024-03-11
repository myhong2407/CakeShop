require('dotenv').config()

const CategoryService = require("../services/category.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const path = require("path");
var res = require("express/lib/response");

exports.create = async (req, res, next) => {
    // res.send({ message: "create handler"});
    if(!req.body?.cate_name || !req.body?.cate_desc) {
    console.log(req.body?.cate_name)
    console.log(req.body?.cate_desc)
        return next(new ApiError(400, "Can not be empty"));
    }

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const data = {
            'cate_name': req.body.cate_name,
            'cate_desc': req.body.cate_desc,
        }
        console.log(data);
        const document = await categoryService.create(data);
        return res.send({success: true});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the category")
        );
    }
};

exports.findAll = async (req, res, next) => {
    // res.send({ message: "findAll handler"});
    let documents = [];

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await categoryService.findByName(name);
        } else {
            documents = await categoryService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving categories")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    // res.send({ message: "findOne handler"});
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.findById(req.params.id);
        if(!document) {
            return next(new ApiError(404, "category not found"));
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
        const categoryService = new CategoryService(MongoDB.client);
        const data = {
            'cate_name': req.body.cate_name,
            'cate_desc': req.body.cate_desc,
        }
        const document = await categoryService.update(req.params.id, data);
        if(!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "category was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating category with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    // res.send({ message: "delete handler"});
    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "category not found"));
        }
        return res.send({ message: "category was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete category with id=${req.params.id}`
            )
        );
    }
}