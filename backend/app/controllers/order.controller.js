require('dotenv').config()
const OrderService = require("../services/order.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const path = require("path");
var res = require("express/lib/response");


exports.create = async (req, res, next) => {
    console.log(req.body)
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.create(req.body);
        return res.send({message:"create order successful"});
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the product")
        );
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.findById(req.params.id);
        if (!document){
            return next(new ApiError(404, "product not found"));
        }
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500,`Error retrieving contact with id=${req.params.id}`)
        );
    }
};

exports.findByUserId = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.findByUserId(req.params.id);
        console.log(req.params.id);
        if (!document){
            return next(new ApiError(404, "product not found"));
        }
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500,`Error retrieving contact with id=${req.params.id}`)
        );
    }
};

exports.findAll = async (req, res, next) => {
    let document = []
    try {
        const orderService = new OrderService(MongoDB.client);
        const documents = await orderService.find({});
        return res.send(documents);
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while retrieving contacts")
        );
    }

};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update cannot be empty"));
    }

    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.update(req.params.id, req.body);

        if (!document) {
            return next(new ApiError(404, "order not found"));
        }

        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.ApproveId = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.approveById(req.params.id, { status: true });
        if (!document) {
            return next(new ApiError(404, "order not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.Delete = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "product not found"));
        }
        return res.send({ message: "cart was deleted succussfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete contact with id=${req.param.id}`
            )
        );
    }
};

// exports.getTopSale = async (req, res, next) => {
//     try {
//         const orderService = new OrderService(MongoDB.client);
//         const document = await orderService.getTopSale();
//         if (!document) {
//             return next(new ApiError(404, "not found"));
//         }
//         return res.send(document);
//     } catch (error) {
//         return next(
//             new ApiError(
//                 500,
//                 'error with data'
//             )
//         );
//     }
// };

// module.exports = OrderService;



// module.exports = {
//     create,
//     findOne,
//     update,
//     Delete,
//     ApproveId,
//     findAll,
//     findByUserId,
//     getTopSale
// }