<template>
<!-- <div class="container-fluid d-flex justify-content-center p-5 align-content-center bg-info" style="height:300px;">
    <h3>Our Product</h3>
</div> -->
	<!-- breadcrumb-section -->
	<div class="breadcrumb-section breadcrumb-bg">
		<div class="container">
			<div class="row">
				<div class="col-lg-8 offset-lg-2 text-center">
					<div class="breadcrumb-text">
						<!-- <p>Fresh and Organic</p> -->
						<h1>Tất cả sản phẩm</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- end breadcrumb section -->


<div class="container row d-flex justify-content-center" style="margin-left:50px;">
    <div class="col-4 px-4">
        
        <div class="searchbar my-4">
            <input class="search_input" type="search"
            name="" placeholder="Tìm kiếm..."
            v-model="searchText" 
            @input="updateModelValue" 
            @keyup.enter="submitsearch"
            >
            <button @click="submitsearch" type="button" class="search_icon" style="border: none;"><i class="fas fa-search"></i></button>
        </div>
        
        <dl class=" p-4 border border-1 rounded">
            <dt class="mb-3"> <h5><b>Danh mục</b></h5></dt>
            <dt class="row d-flex justify-content-between" v-if="this.filteredcategories.length > 0"
                v-for="(category,index) in this.filteredcategories"
                :key="category._id" > 
                <h6 class="text-secondary col-8"><a href="#" class="text-secondary fst-normal" >{{category.cate_name}}</a></h6>
                <h6 class="text-secondary col-4 fst-normal"></h6>
            </dt>
        </dl>
    </div>
    
    <div class="col-8 row bg-light">
            <div v-for="(product,index) in this.filteredproducts"
                :key="product._id" class="col-lg-4 col-md-6 text-center">
                <div class="single-product-item">
                    <div class="product-image">
                        
                        <router-link
                        :to="{
                            name: 'user.product.detail',
                            params: { id: product._id },
                        }"
                        >
                            <img width="100" height="100" :src="'http://localhost:3000/images/'+product.prod_img" class="img-fluid rounded thumbnail-image imageSize">
                        </router-link>


                    </div>
                    <h3>{{product.prod_name}}</h3>
                    <p class="product-price text-danger" style="font-size: larger;">{{product.prod_price}} </p>
                    
                    <a href="" class="cart-btn"  @click="submitAddToCart(product._id, product.prod_name, 1, product.prod_img, product.prod_price)">
                        <i class="fas fa-shopping-cart"></i> Thêm giỏ hàng
                    </a>
                </div>
            </div>
        
    </div>
</div>
</template>
<script>
import ProductService from "@/services/product.service";
import CartService from "@/services/cart.service";
import CategoryService from "@/services/category.service";

export default {
    components: {
        ProductService,
        CartService,
        CategoryService,

    },
    data() {
        return {
            category:{},
            categories:[],
            product:{},
            products:[],
            activeIndex: -1,
            searchText:'',
            userId: null,
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
        categoriesStrings() {
            return this.categories.map((category) => {
                const { cate_name, cate_desc } = category;
                return [cate_name, cate_desc].join("").toLowerCase();
            });
        },
        // Trả về các category có chứa thông tin cần tìm kiếm.
        filteredcategories() {
            if (!this.searchText) return this.categories;
                return this.categories.filter((_category, index) =>
                this.categoriesStrings[index].includes(this.searchText)
            );
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
        async getAllProducts(){
            try {
                this.products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async submitAddToCart(id, name, num, img, price){
            const data = {
                "account_id": this.userId,
                "product_list":[
                    {
                        "prod_id": id,
                        "prod_name": name,
                        "prod_num": num,
                        "prod_img": img,
                        "prod_price":price
                    }
                ]
            }
            console.log(data)
            try {
                await CartService.create(data);
                this.message = "your cart was updated!!!"
                // router.push({ name: 'user.cart', params: { id: this.AccountStore.user._id  } })
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.getAllcategories();
            this.getAllProducts();
            this.activeIndex = -1;
        },

        // async findByPlace(data){
        //     try {
        //         this.products = await ProductService.findByPlace(data);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },

        // async findByBrand(data){
        //     try {
        //         this.products = await ProductService.findByBrand(data);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    },
    mounted() {
        const userData = localStorage.getItem('user'); // Lấy dữ liệu người dùng từ localStorage
        if (userData) {
            const user = JSON.parse(userData); // Chuyển chuỗi JSON thành đối tượng JavaScript
            if (user && user._id) {
                this.userId = user._id; // Gán giá trị email vào biến userEmail trong data
            }
        }
        this.refreshList();
    },
};

</script>
