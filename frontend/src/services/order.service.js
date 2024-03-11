import createApiClient from "./api.service";
// import { userAccStore } from "@/Store/userStore";
// const userStore = userAccStore();

const commonConfig = {
    headers: {
        // 'Authorization': `Bearer ${userStore.user.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

class OrderService {
    constructor(baseUrl = "/api/orders"){
        this.api = createApiClient(baseUrl);
    }

    async getAll(){
        return (await this.api.get('/')).data;
    }

    async create(data){
        return (await this.api.post('/', data )).data;
    }

    async get(id){
        return (await this.api.get(`/${id}`)).data;
    }

    async update(id,data){
        return (await this.api.put(`/${id}`,data)).data;
    }

    async delete(id){
        return (await this.api.delete(`/${id}`)).data;
    }
   

    async approve(id){
        return (await this.api.get(`/approve/${id}`)).data;
    }

    async findByUserId(id){
        return (await this.api.get(`/findByUserId/${id}`)).data;
    }
}

export default new OrderService();