const { ObjectId } = require("mongodb");

class CategoryService {
    constructor(client) {
        this.Category = client.db().collection("categories");
    }

    extractCategoryData(payload) {
        const category = {
            cate_name: payload.cate_name,
            cate_desc: payload.cate_desc,
            // cate_thumb: payload.cate_thumb,
        };

        //Remove undefined fields
        Object.keys(category).forEach(
            (key) => category[key] === undefined && delete category[key]
        );
        return category;
    }

    async create(payload) {
        const category = this.extractCategoryData(payload);
        const result = await this.Category.insertOne(category);
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Category.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }

    async findById(id) {
        return await this.Category.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractCategoryData(payload);
        const result = await this.Category.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Category.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
}

module.exports = CategoryService;