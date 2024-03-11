const { ObjectId } = require("mongodb");

class CartService {
    constructor(client) {
        this.Cart = client.db().collection("carts");
        this.Account = client.db().collection("accounts");
        this.Product = client.db().collection("products");
    }

    extractCartData(payload) {
        const cart = {
            account_id: payload.account_id,
            product_list:[
                {
                    prod_id: payload.product_list[0].prod_id,
                    prod_name: payload.product_list[0].prod_name,
                    prod_price: payload.product_list[0].prod_price,
                    prod_img: payload.product_list[0].prod_img,
                    prod_num: payload.product_list[0].prod_num,

                }
            ],
        };

        //Remove undefined fields
        Object.keys(cart).forEach(
            (key) => cart[key] === undefined && delete cart[key]
        );
        return cart;
    }

    async create(payload) {
        const cart = this.extractCartData(payload);
        const cursor = await this.Cart.findOne({
            "account_id": cart.account_id
        });
        console.log(cursor)
        if(cursor == null){
            const result = await this.Cart.insertOne(cart);
            console.log(result.value)
            return result.value;
        } else {
            const aval = await this.Cart.findOne({"account_id":cart.account_id,"product_list.prod_id":cart.product_list[0].prod_id})
//            console.log(aval)
            const tmp = await this.Cart.aggregate([
                {$unwind : '$product_list'},
                {$match: {
                    'product_list.prod_id': cart.product_list[0].prod_id,
                    "account_id":cart.account_id }
                },
            ]).toArray();
            console.log(tmp)
            if(aval == null){
                const result = await this.Cart.updateOne(
                    { "account_id": cart.account_id },
                    { $push: { product_list: cart.product_list[0] } }
                )
                return result.value;
            } else {
                const result = await this.Cart.updateOne(
                   {
                       "account_id":aval.account_id,
                   },
                   { $set: { "product_list.$[elem].prod_num": cart.product_list[0].prod_num + tmp[0].product_list.prod_num }},
                   { arrayFilters: [ { "elem.prod_id": cart.product_list[0].prod_id } ]}
                )
                console.log(result.value)
                return result.value;
            }

        }
    }

    async find(filter) {
        const cursor = await this.Cart.find(filter);
        return await cursor.toArray();
    }

    async findByUserId(userid) {
//        console.log(userid)
        const result = await this.Cart.findOne({
                                "account_id": userid
                            });
        return result;
    }
    
    async findByAdress(address) {
        return await this.find({
            address: { $regex: new RegExp(address), $options: "i"},
        });
    }

    async findById(id) {
        return await this.Cart.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const result = await this.Cart.findOneAndUpdate(
            filter,
            { $set: payload},
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Cart.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAllProduct(user_id){
        const result = await this.Cart.updateOne(
            { "account_id": user_id },
            {
                $set: {
                    product_list: []
                }
            }
        );
        return result.value;
    }

    async deleteProduct(id,product_id) {
        const filter = await this.Cart.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        const update = []
        for (let i = 0; i < filter.product_list.length; i++){
            if(filter.product_list[i].prod_id != product_id){
                update.push(filter.product_list[i])
            }
        }
//        console.log(filter)
        const result = await this.Cart.updateOne(
            { "account_id": filter.account_id },
            {
                $set: {
                    product_list: update
                }
            });
            console.log("555555555555")
        console.log(result.value)
        return result.value;
    }
}

module.exports = CartService;