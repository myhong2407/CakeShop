<template>
    <div class="page-heading" style="">
        
        <div class="row" style="display: grid;">
            <section class="section">
                <div class="card">
                    
                    <div class="card-header d-flex justify-content-between row">
                        <div class="row" style="width:600px;">
                            <div class="input-group col-8">
                                <input type="text" class="form-control bg-white border-0 small" placeholder="Tìm kiếm..."
                                v-model="searchText" aria-describedby="basic-addon2">
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button">
                                        <i class="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                       
                        <div class="col-2 " style="display: grid;">
                            <router-link
                            :to="{
                                name: 'admin.product.add',
                            }"
                            >
                            <button type="button" class="btn btn-info" >Thêm sản phẩm</button>
                            </router-link>
                            <!-- <button type="button" class="btn btn-info"  data-bs-toggle="modal" data-bs-target="#myModal">Add</button> -->
                        </div>
                    </div>
    
                    <div class="card-body">
                        <table class="table table-striped" id="table1">
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Hình ảnh</th>
                                    <th>Giá tiền</th>
                                    <th>Số lượng</th>
                                    <th>Danh mục</th>
                                    <th>Mô tả</th>
                                    <th>Sửa/Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="this.filteredproducts.length > 0"
                                    v-for="(product,index) in this.filteredproducts"
                                    :key="product._id" 
                                    >
    
                                    <td>
                                        <div class="d-flex align-items-center">
                                          <div class="ms-3">
                                            <h6 class="fw-bold mb-1">{{product.prod_name}}</h6>
                                          </div>
                                        </div>
                                    </td>
    
                                    <td><img :src="'http://localhost:3000/images/'+product.prod_img" width="88" alt=""></td>
    
                                    <td>{{product.prod_price}}</td>
                                    
                                    <td>{{product.prod_quantity}}</td>
    
                                    <td>{{product.prod_category}}</td>
    
                                    <td>{{product.prod_desc}}</td>
    
                                    <td>
                                        <button type="button" class="btn btn-link" data-mdb-ripple-color="dark" @click="DeleteProduct(product._id)">
                                            <i class="fas fa-trash-alt text-danger"></i> 
                                        </button>
                                        <div class="btn-group" role="group">
                                            <router-link
                                            :to="{
                                                name: 'admin.product.edit',
                                                params: { id: product._id },
                                            }"
                                            >
                                            <button type="button" class="btn btn-link" data-mdb-ripple-color="dark" >
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            </router-link>
                                            <!-- <button type="button"  @click="DeleteProduct(product._id)" class="btn btn-link" data-mdb-ripple-color="dark">Xóa</button> -->
                                        </div>
                                    
                                    </td>
    
                                
    
                                </tr>
                                <tr v-else>No products</tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
        
    </div>

    <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
      
            <!-- Modal Header -->
            <div class="modal-header header">
              <h4 class="modal-title">Add New Products</h4>
            </div>
      
            <!-- Modal body -->
            <div class="modal-body">
                <addProductForm @add:product="createProduct"/>
            </div>
      
            
      
          </div>
        </div>
    </div>

</template>

<script>
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
import addProductForm from "./addProduct.vue";
import CategoryService from "@/services/category.service";
import ProductService from "@/services/product.service";
export default {
    components: {
        addProductForm,
        ProductService,
        CategoryService
        
    },
    data() {
        return {
            categories: [],
            product:{},
            products:[],
            activeIndex: -1,
            active1Index: -1,
            searchText:'',
            cateText:''
        };
    },
    watch: {
        searchText: function(newText) {
            this.activeIndex = -1;
        },
    },

    computed: {
        // Chuyển các đối tượng product thành chuỗi để tiện cho tìm kiếm.
        productStrings() {
            return this.products.map((product) => {
                const { prod_name, prod_desc, prod_price, prod_quantity,prod_category } = product;
                return [prod_name, prod_desc, prod_price, prod_quantity,prod_category].join("").toLowerCase();
            });
        },

        // Trả về các product có chứa thông tin cần tìm kiếm.
        filteredproducts() {
            if (!this.searchText) return this.products;
            const searchTextLower = this.searchText.toLowerCase().trim();

            return this.products.filter((_product, index) =>
                this.productStrings[index].includes(searchTextLower)
            );
        },

        activeproduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredproducts[this.activeIndex];
        },

        filteredproductsCount() {
            return this.filteredproducts.length;
        },
        categoryStrings() {
            return this.categories.map((category) => {
                const { cate_name, cate_desc } = category;
                return [cate_name, cate_desc].join("").toLowerCase();
            });
        },
        filteredcategories() {
            // if (!this.searchText) return this.categories;
            //     return this.categories.filter((_category, index) =>
            //     this.categoryStrings[index].includes(this.searchText)
            // );
            return this.categories
        },

    },
    methods: {
        async getAllProducts(){
            try {
                this.products = await ProductService.getAll();
                console.log(this.products);
                if(this.cateText) {
                    this.products = products.filter(product => product.prod_category === this.cateText);
                    console.log(this.products);
                }
                
            } catch (error) {
                console.log(error);
            }
        },
        async getAllCategories(){
            try {
                this.categories = await CategoryService.getAll();
                console.log(this.categories);
            } catch (error) {
                console.log(error);
            }
        },
        async createProduct(data){
            const formData = new FormData();
            formData.append('file',data.file);
            formData.append('prod_img',data.file.name);
            formData.append('prod_desc',data.prod_desc);
            formData.append('prod_price',data.prod_price);
            formData.append('prod_quantity',data.prod_quantity);
            formData.append('prod_name',data.prod_name);
            formData.append('prod_category',data.prod_category);
            console.log(formData);
            try{
                console.log(formData);
                await ProductService.create(formData);
                this.message = "Product được tao thành công.";
                this.getAllProducts();
                console.log(this.message);
            } catch(err) {
                console.log(err);
            }
        },
        async DeleteProduct(id) {
            try{
                await ProductService.delete(id);
                this.getAllProducts();
            } catch(err) {
                console.log(err);
            }
        },
        refreshList() {
            this.getAllCategories();
            this.getAllProducts();
            this.activeIndex = -1;
            this.active1Index = -1;
        },
        
    },
    mounted() {
        this.refreshList();
    },
    };
</script>

<style scoped src="@/assets/navbar.css">
@import './assets/navbar.css';
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css';
</style>