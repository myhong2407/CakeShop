<template>
<!-- breadcrumb-section -->
<div class="breadcrumb-section breadcrumb-bg">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 offset-lg-2 text-center">
                <div class="breadcrumb-text">
                    <!-- <p>See more details</p> -->
                    <h1>Chi tiết sản phẩm</h1>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- end breadcrumb section -->

<!-- single product -->
<div class="single-product mt-4 mb-150">
    <div class="container">
        <div class="row">
            <div class="col-md-5">
                <div class="single-product-img">
                    <img :src="'http://localhost:3000/images/'+this.product.prod_img" alt="">
                </div>
            </div>
            <div class="col-md-7">
                <div class="single-product-content">
                    <h3>{{this.product.prod_name}}</h3>
                    <p class="single-product-pricing">{{this.product.prod_price}}</p>
                    <p>{{this.product.prod_desc}}</p>
                    <div class="single-product-form">
                        <form action="index.html">
                            <!-- <input type="number" placeholder="0"> -->
                            <input min="1" :max="this.product.quantity" style="border-radius: 10px;" 
                            type="number" id="typeNumber" v-model="this.number" class="form-control" />

                        </form>
                        <p><strong>Danh mục: </strong> {{this.product.prod_category}}</p>
                        <a href="" class="cart-btn" @click="submitAddToCart"><i class="fas fa-shopping-cart"></i> Thêm giỏ hàng</a>
                     
                    </div>
                    <h4>Share:</h4>
                    <ul class="product-share">
                        <li><a href=""><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href=""><i class="fab fa-twitter"></i></a></li>
                        <li><a href=""><i class="fab fa-google-plus-g"></i></a></li>
                        <li><a href=""><i class="fab fa-linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- end single product -->


    <!-- <hr>
    <div class="container containerA1 py-4 my-4 mx-auto d-flex flex-column">
        <div class="header">
            <div class="row r1">
                <div class="col-md-9 abc">
                    <h1 class="text-dark" style="margin-left:-200px;">{{this.product.name}}</h1>
                </div>
                <div class="col-md-3 text-right pqr"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></div>
                <h5 class="text-right para">Based on 250 Review</h5>
            </div>
        </div>
        <div class="container-body mt-4">
            <div class="row">
                <div class="col-md-5 p-0 klo">
                    <ul>
                        <li>100% Quality</li>
                        <li>Free Shipping</li>
                        <li>Easy Returns</li>
                        <li>12 Months Warranty</li>
                        <li>EMI Starting from (On Credit Cards)</li>
                        <li>Normal Delivery : 4-5 Days</li>
                        <li>Express Delivery : 2-3 Days</li>
                        <li>COD Available (All Over India)</li>
                        <li>price: ${{this.product.prod_price}}</li>
                        <li>Create At: {{this.product.prod_category}}</li>
                        <li>Available: {{this.product.prod_quantity}}</li>
                    </ul>
                </div>
                <div class="col-md-7"> <img class="" style="position:absolute; right: 150px;" :src="'http://localhost:3000/images/'+this.product.prod_img" width="400" height="400"> </div>
            </div>
        </div>
        <div class="footer d-flex flex-column mt-5">
            <div class="row r4">
                <div class="col-md-2 myt des">
                    <a href="#">Description</a>
                    <h6>{{this.product.prod_desc}}</h6>

                </div>
                <div class="col-md-2 myt "><a href="#">Review</a></div>
                <div class="col-md-2 mio offset-md-4">
                    <button type="button" class="btn btn-outline-warning" @click="submitAddToCart"><a href="#">ADD TO CART</a></button>
                    <div class="form-outline mt-2 border border-info" style="width: 22rem;">
                        <input min="1" :max="this.product.quantity" style="border-radius: 10px;" type="number" id="typeNumber" v-model="this.number" class="form-control" />
                        <label class="form-label" for="typeNumber">Maximum {{this.product.quantity}}</label>
                    </div>
                    <div v-if="this.message !=''" class="note note-success mb-3">
                        <strong>Note :</strong> <h6>{{this.message}}</h6> 
                    </div>
                </div> -->
                <!-- <div class="col-md-2 myt "><button type="button" class="btn btn-outline-warning"  @click="submitAddToCart"><a href="#">BUY NOW</a></button></div> -->
                <!-- <div class="col-8"></div>
                <div class="col-4">
                </div>
            </div>
        </div>
    </div> -->
        <!-- <Gallery style="left:50px;position: relative; height:650px;" ></Gallery> -->

</template>
<script>
import ProductService from "@/services/product.service";
import CartService from "@/services/cart.service";
import { useAccountStore } from "@/stores/AccountStore";
// import Gallery from "./gallery.vue"
export default {
    components: {
        ProductService,
        CartService,
        // Gallery,
    },
    props: {
        id: { type: String, required: true },
    },
    watch: {
        'id' : function(v){
            this.id = v;
            console.log(this.id);
            // getProduct(this.id);
        }
    },
    data() {
        const AccountStore = useAccountStore();
        return {
            number: 1,
            product: {},
            products:[],
            activeIndex: 0,
            message: "",
            AccountStore,
            userId: null,
        };
    },
    computed: {
        id(){
            return this.$store.state.route.params.id;
        },
        product(){
            return this.$store.getters.getProduct(this.id);
        }
    },
    mounted() {
        const userData = localStorage.getItem('user'); // Lấy dữ liệu người dùng từ localStorage
        if (userData) {
            const user = JSON.parse(userData); // Chuyển chuỗi JSON thành đối tượng JavaScript
            if (user && user._id) {
                this.userId = user._id; // Gán giá trị email vào biến userEmail trong data
            }
        }
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await ProductService.get(id);
                console.log(this.product)
            } catch (error) {
                console.log(error);
            }
        },
        async submitAddToCart(){
            const data = {
                "account_id": this.userId,
                "product_list":[
                    {
                        "prod_id": this.product._id,
                        "prod_name": this.product.prod_name,
                        "prod_num": this.number,
                        "prod_img": this.product.prod_img,
                        "prod_price":this.product.prod_price
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
        }
    },
    created() {
        this.getProduct(this.id);
        this.message = "";
    },
};
</script>
<style>
@import '@/assets/product_detail.css';
</style>