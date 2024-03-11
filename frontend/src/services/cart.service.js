import createApiClient from "./api.service";
import { useAccountStore } from "@/stores/AccountStore";
const userStore = useAccountStore()
const commonConfig = {
    headers: {
        // 'Authorization': `Bearer ${userStore.user.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

class CartService {
    constructor(baseUrl = "/api/carts"){
        this.api = createApiClient(baseUrl);
    }

    async create(data){
        return (await this.api.post('/', data)).data;
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

    async deleteOneProduct(id,data){
        return (await this.api.post(`/deleteOneProduct/${id}`,data)).data;
    }

    async findByUserId(id){
        return (await this.api.get(`/findByUserId/${id}`,commonConfig)).data;
    }

    async deleteAddProduct(id){
        return (await this.api.get(`/deleteAllProduct/${id}`)).data;
    }
}

export default new CartService();