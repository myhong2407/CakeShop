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
                            <!-- <button type="button" class="btn btn-info"  data-bs-toggle="modal" data-bs-target="#myModal">Add</button> -->
                            <router-link
                            :to="{
                                name: 'admin.category.add',
                            }"
                            >
                            <button type="button" class="btn btn-info" >Thêm danh mục</button>
                            </router-link>
                        </div>
                    </div>
    
                    <div class="card-body">
                        <table class="table table-striped" id="table1">
                            <thead>
                                <tr>
                                    <th>Tên danh mục</th>
                                    <th>Mô tả</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="this.filteredcategories.length > 0"
                                    v-for="(category,index) in this.filteredcategories"
                                    :key="category._id" 
                                    >
    
                                    <td>
                                        <div class="d-flex align-items-center">
                                          <div class="ms-3">
                                            <h6 class="fw-bold mb-1">{{category.cate_name}}</h6>
                                          </div>
                                        </div>
                                    </td>
    
                                    <td>{{category.cate_desc}}</td>
    
                                    <td>
                                        <button type="button" class="btn btn-link" data-mdb-ripple-color="dark" @click="DeleteCategory(category._id)">
                                            <i class="fas fa-trash-alt text-danger"></i> 
                                        </button>
                                        <div class="btn-group" role="group">
                                            <router-link
                                            :to="{
                                                name: 'admin.category.edit',
                                                params: { id: category._id },
                                            }"
                                            >
                                            <button type="button" class="btn btn-link" data-mdb-ripple-color="dark" >
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            </router-link>
                                            <!-- <button type="button"  @click="DeleteCategory(category._id)" class="btn btn-link" data-mdb-ripple-color="dark">Xóa</button> -->
                                        </div>
                                    
                                    </td>
    
                                
    
                                </tr>
                                <tr v-else>Không có danh mục</tr>
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
              <h4 class="modal-title">Add New categories</h4>
            </div>
      
            <!-- Modal body -->
            <div class="modal-body">
                <addCategoryForm />
            </div>
      
            
      
          </div>
        </div>
    </div>

</template>

<script>
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
import addCategoryForm from "./addCategory.vue";
import CategoryService from "@/services/category.service";

export default {
    components: {
        addCategoryForm,
        CategoryService,
    },
    data() {
        return {
            category:{},
            categories:[],
            activeIndex: -1,
            searchText:'',
        };
    },

    watch: {
        searchText: function(newText) {
            this.activeIndex = -1;
        },
    },

    computed: {
        categoriesStrings() {
            return this.categories.map((category) => {
                const { cate_name, cate_desc } = category;
                return [cate_name, cate_desc].join("").toLowerCase();
            });
        },

        filteredcategories() {
            if (!this.searchText) return this.categories;

            const searchTextLower = this.searchText.toLowerCase().trim();

            return this.categories.filter((_category, index) =>
                this.categoriesStrings[index].includes(searchTextLower)
            );
        },


        activecategory() {
            if (this.activeIndex < 0) return null;
            return this.filteredcategories[this.activeIndex];
        },

        filteredcategoriesCount() {
            return this.filteredcategories.length;
        },

    },
    methods: {
        async getAllcategories(){
            try {
                this.categories = await CategoryService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async createCategory(data){
            const formData = new FormData();
            formData.append('cate_desc',data.cate_desc);
            formData.append('cate_name',data.cate_name);
            console.log(formData);
            try{
                console.log(formData);
                await CategoryService.create(formData);
                this.message = "category được tao thành công.";
                this.getAllcategories();
                console.log('-------------------------------------------------')
                console.log(this.message);
            } catch(err) {
                console.log(err);
            }
        },
        async DeleteCategory(id) {
            try{
                await CategoryService.delete(id);
                this.getAllcategories();
            } catch(err) {
                console.log(err);
            }
        },
        refreshList() {
            this.getAllcategories();
            this.activeIndex = -1;
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