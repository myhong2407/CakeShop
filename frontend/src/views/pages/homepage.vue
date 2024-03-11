<template>
<!-- hero area -->
<div class="hero-area hero-bg">
    <div class="container">
        <div class="row">
            <div class="col-lg-9 offset-lg-2 text-center">
                <div class="hero-text">
                    <div class="hero-text-tablecell">
                        <p class="subtitle">Sản phẩm mới</p>
                        <h1>BÁNH MOUSSE</h1>
                        <div class="hero-btns">
                            <router-link :to="{name: 'user.products'}">
                                <a href="shop.html" class="boxed-btn">Khám phá</a>

                            </router-link>
                            <router-link :to="{name: 'contact'}">
                               <a href="contact.html" class="bordered-btn">Liên hệ</a>

                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- end hero area -->


<!--  -->
<div class="container-fluid pt-5">
        <div class="container">
            <div class="section-title position-relative text-center mx-auto mb-5 pb-3" style="max-width: 600px;">
                <h2 class="text-primary font-secondary"></h2>
                <h1 class="display-4 text-uppercase">Welcome To CakeShop</h1>
            </div>
            <div class="row gx-5">
                <div class="col-lg-5 mb-5 mb-lg-0" style="min-height: 400px;">
                    <div class="position-relative h-100">
                        <img class="position-absolute w-100 h-100" src="src/assets/assets/img/bg.jpg" style="object-fit: cover;">
                    </div>
                </div>
                <div class="col-lg-6 pb-5">
                    <h4 class="mb-4">Bánh kem là 1 trong loại bánh được xuất phát từ nước Tây Âu, vào giữa thế kỷ thứ 19.</h4>
                    <p class="mb-5">Bánh kem thường là biểu tượng của sự kỷ niệm và niềm vui, thường xuất hiện trong các dịp đặc biệt như sinh nhật, kỷ niệm, và hầu như bất kỳ lễ hội nào. Sự sáng tạo không giới hạn trong việc làm bánh kem đã tạo ra vô số loại bánh đa dạng về hương vị, kết cấu, và trang trí, mang đến cho mọi người niềm hạnh phúc đặc biệt từ mỗi lớp kem và từng lát bánh.</p>
                    <div class="row g-5">
                        <div class="col-sm-6">
                            <div class="d-flex align-items-center justify-content-center bg-primary border-inner mb-4" style="width: 90px; height: 90px;">
                                <i class="fa fa-heartbeat fa-2x text-white"></i>
                            </div>
                            <h4 class="text-uppercase">100% Healthy</h4>
                            <p class="mb-0">Nâng cao giá trị dinh dưỡng của chiếc bánh bằng cách đổi bột mì trắng lấy bột mì nguyên hạt hoặc bột hạt, dùng nước sốt táo thay vì đường và thay dầu hoặc bơ bằng chuối nghiền.</p>
                        </div>
                        <div class="col-sm-6">
                            <div class="d-flex align-items-center justify-content-center bg-primary border-inner mb-4" style="width: 90px; height: 90px;">
                                <i class="fa fa-award fa-2x text-white"></i>
                            </div>
                            <h4 class="text-uppercase">Award Winning</h4>
                            <p class="mb-0">Trải qua chặng đường xây dựng và phát triển, CakeShop đã trở thành một thương hiệu tin cậy và thân thuộc với khách hàng trên cả nước, bánh ngọt nội địa trên thị trường Việt Nam.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!--  -->



<!-- features list section Dịch vụ nổi bật -->
<div class="list-section pt-80 pb-80">
    <div class="container">

        <div class="row">
           
            <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <div class="list-box d-flex align-items-center">
                    <div class="list-icon">
                        <i class="fas fa-shipping-fast"></i>
                    </div>
                    <div class="content">
                        <h3>Miễn phí giao hàng</h3>
                        <p>Khi đơn hàng trên 0đ</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <div class="list-box d-flex align-items-center">
                    <div class="list-icon">
                        <i class="fas fa-phone-volume"></i>
                    </div>
                    <div class="content">
                        <h3>Hỗ trợ 24/7</h3>
                        <p>Nhận hỗ trợ cả ngày</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6">
                <div class="list-box d-flex justify-content-start align-items-center">
                    <div class="list-icon">
                        <i class="fas fa-sync"></i>
                    </div>
                    <div class="content">
                        <h3>Hoàn trả</h3>
                        <p>Nhận hoàn tiền trong vòng 3 ngày!</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<!-- end features list section -->


<!-- product section -->
<div class="product-section mt-150 mb-150">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 offset-lg-2 text-center">
                <div class="section-title">	
                    <h3><span class="orange-text">Sản phẩm </span> Nổi bật</h3>
                    <p style="width: 600px;">
                        Chào mừng bạn đến với bộ sưu tập bánh đến từ nhà Cake Shop
                    </p>
                </div>
            </div>
        </div>

        <div class="row">


            <div v-for="(product,index) in this.filteredproducts"
                :key="product._id" class="col-lg-3 col-md-6 text-center">
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
                    <p class="product-price text-danger">{{product.prod_price}} </p>
                    
                    <a href="" class="cart-btn">
                        <i class="fas fa-shopping-cart"></i> Thêm giỏ hàng
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- end product section -->
<section class="instagram spad">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 p-0">
                <div class="instagram__text">
                    <div class="section-title">
                        <span>Follow us on instagram</span>
                        <h2>KHOẢNH KHẮC NGỌT NGÀO ĐƯỢC LƯU LẠI LÀM KỶ NIỆM.</h2>
                    </div>
                    <h5>@cakeshop</h5>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-6">
                        <div class="instagram__pic">
                            <img src="src/assets/assets/img/instagram/instagram-1.jpg" alt="">
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-6">
                        <div class="instagram__pic middle__pic">
                            <img src="src/assets/assets/img/instagram/instagram-2.jpg" alt="">
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-6">
                        <div class="instagram__pic">
                            <img src="src/assets/assets/img/instagram/instagram-3.jpg" alt="">
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-6">
                        <div class="instagram__pic">
                            <img src="src/assets/assets/img/instagram/instagram-4.jpg" alt="">
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-6">
                        <div class="instagram__pic middle__pic">
                            <img src="src/assets/assets/img/instagram/instagram-5.jpg" alt="">
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-6">
                        <div class="instagram__pic">
                            <img src="src/assets/assets/img/instagram/banhkem3.jpg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>



</template>

<script>
import ProductService from "@/services/product.service";
export default {
    components: {
        ProductService,
    },
    data() {
        return {
            product:{},
            products:[],
            activeIndex: -1,
            searchText:'',
        };
    },
    watch: {
        'searchText' : function(v) {
            this.searchText = v.toLowerCase().trim();
        },
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
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
                return this.products.filter((_product, index) =>
                this.productStrings[index].includes(this.searchText)
            );
        },

        activeproduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredproducts[this.activeIndex];
        },

        filteredproductsCount() {
            return this.filteredproducts.length;
        },

    },
    methods: {
        async getAllProducts(){
            try {
                this.products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.getAllProducts();
            this.activeIndex = -1;
        },

    },
    mounted() {
        this.refreshList();
    },
};

</script>