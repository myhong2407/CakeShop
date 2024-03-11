import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "/api/account") {
        this.api = createApiClient(baseUrl);
    }

    async create(data) {
        return (await this.api.post('/create', data)).data;
    }

    async login(data) {
        return (await this.api.post('/', data)).data;
    }
}

export default new UserService();