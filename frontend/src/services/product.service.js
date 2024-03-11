import createApiClient from "./api.service";
import { useAccountStore } from "@/stores/AccountStore";
const userStore = useAccountStore();
const commonConfig = {
    headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
    },
};

class ProductService {
    constructor(baseUrl = "/api/admin/products"){
        this.api = createApiClient(baseUrl);
    }

    async getAll(){
        return (await this.api.get('/', commonConfig)).data;
    }

    async create(data){
        return (await this.api.post('/', data , commonConfig)).data;
    }

    async deleteAll(){
        return (await this.api.delete('/' , commonConfig)).data;
    }

    async get(id){
        return (await this.api.get(`/${id}`, commonConfig)).data;
    }

    async update(id,data){
        return (await this.api.put(`/${id}`, data, commonConfig)).data;
    }

    async delete(id){
        return (await this.api.delete(`/${id}`, commonConfig)).data;
    }

    async login(data){
        return (await this.api.post('/login',data, commonConfig )).data;
    }

    // async findByPlace(manufacture){
    //     return (await this.api.get(`/findByPlace/${manufacture}` )).data;
    // }

    // async findByBrand(brand){
    //     return (await this.api.get(`/findByBrand/${brand}` )).data;
    // }
}

export default new ProductService();