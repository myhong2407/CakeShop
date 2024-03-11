const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }

    extractProductData(payload) {
        const product = {
            prod_name: payload.prod_name,
            prod_price: payload.prod_price,
            prod_quantity: payload.prod_quantity,
            prod_category: payload.prod_category,
            prod_desc: payload.prod_desc,
            prod_img: payload.prod_img,
            prod_reviews:[
                {
                    user_id: '',
                    full_name: '',
                    comment: ''
                }
            ]
        };

        //Remove undefined fields
        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        );
        return product;
    }

    async create(payload) {
        const product = this.extractProductData(payload);
        const result = await this.Product.insertOne(product);
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }
    
    async findByAdress(address) {
        return await this.find({
            address: { $regex: new RegExp(address), $options: "i"},
        });
    }

    async findById(id) {
        return await this.Product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractProductData(payload);
        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    
}

module.exports = ProductService;