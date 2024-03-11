const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

class AccountService {
    constructor(client) {
        this.Account = client.db().collection("accounts");
    }

    extractAccountData(payload) {
        const account = {
            email: payload.email,
            password: payload.password,
            role: 'user',
            personal_info: {
                full_name: '',
                gender: '',
                address: '',
                phone: ''
            }
        };

        Object.keys(account).forEach(
            (key) => account[key] === undefined && delete account[key]
        );
        return account;
    }

    // async create(payload) {
    //     const account = this.extractAccountData(payload);
    //     const result = await this.Account.insertOne(account);
    //     return result.value;
    // }
    async create(payload) {
        const account = this.extractAccountData(payload);

        const user = await this.Account.findOne({ email: account.email });
        // console.log(user);
        if (user) {
        // Trường đã tồn tại trong collection, trả về true
            return false;
        } else {
        // Trường chưa tồn tại trong collection, trả về false
            // Hash password before storing in database
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(account.password, saltRounds);
            account.password = hashedPassword;

            const result = await this.Account.insertOne(account);
            return result.value;
        }
    }

    async findByEmail(email) {
        return await this.Account.findOne({
            email: { $regex: new RegExp(email)},
        });
    }
}

module.exports = AccountService;