<template>
<!-- header -->
<div class="top-header-area" >
  <div class="container">
      <div class="row">
          <div class="col-lg-12 col-sm-12 text-center">
              <div class="main-menu-wrap">
                  <!-- logo -->
                  <div class="site-logo" >
                      <!-- <a href="index.html"> -->
                          <!-- LOGO
                      </a> -->
                    <router-link :to="{name: 'user.home'}">
                      <img src="../../assets/assets/img/logo_cake.png" alt="" style="width: 50%;">
                    </router-link>
                  </div>
                  <!-- logo -->

                  <!-- menu start -->
                  <nav class="main-menu">
                    <ul>
                        <li class="current-list-item">
                          <router-link :to="{name: 'user.home'}">
                            <a href="#">Trang chủ</a>
                          </router-link>
                          
                        </li>
                        <li>
                          <router-link :to="{name: 'about'}">
                            <a href="about.html">Giới thiệu</a>
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{name: 'user.products'}">
                            <a href="">
                              Sản phẩm
                            </a>
                          </router-link> 
                        </li>
                        <li>
                          <router-link :to="{name: 'contact'}">
                            <a href="">Liên hệ</a>
                          </router-link> 
                          
                        </li> 
                        <li>
                          <router-link :to="{name: 'user.order'}">
                            <a href="">Đơn hàng</a>
                          </router-link> 
                        </li>

                        <!-- <li><a href="#">Pages</a>
                            <ul class="sub-menu">
                                <li><a href="404.html">404 page</a></li>
                                <li><a href="about.html">About</a></li>
                                <li><a href="cart.html">Cart</a></li>
                                <li><a href="checkout.html">Check Out</a></li>
                                <li><a href="contact.html">Contact</a></li>
                                <li><a href="news.html">News</a></li>
                                <li><a href="shop.html">Shop</a></li>
                            </ul>
                        </li>
                        <li><a href="news.html">News</a>
                            <ul class="sub-menu">
                                <li><a href="news.html">News</a></li>
                                <li><a href="single-news.html">Single News</a></li>
                            </ul>
                        </li>
                        <li><a href="shop.html">Shop</a>
                            <ul class="sub-menu">
                                <li><a href="shop.html">Shop</a></li>
                                <li><a href="checkout.html">Check Out</a></li>
                                <li><a href="single-product.html">Single Product</a></li>
                                <li><a href="cart.html">Cart</a></li>
                            </ul>
                        </li> -->

                        <li v-if="this.userId" >
                            <div class="header-icons">
                              <router-link :to="{
                                name: 'user.cart',
                                params: { id: this.userId}
                              }">
                                <a class="shopping-cart">
                                  <i class="fas fa-shopping-cart"></i>
                                  <i style="
                                    position: absolute;
                                    background-color: brown;
                                    line-height: 16px;
                                    font-size: 10px;
                                    padding: 0px 5px;
                                    border-radius: 20px;
                                    left: 40px;
                                    top: 25px;
                                  ">
                                  {{this.cart.product_list?.length}} 
                                  <!-- 2 -->
                                </i>
                                </a>
                                  
                              </router-link> 
                                <a class="mobile-hide search-bar-icon" href="#">
                                  <router-link :to="{name: 'user.products'}">
                                    <i class="fas fa-search"></i>
                                          
                                  </router-link> 
                                </a>
                                <a class="mobile-hide search-bar-icon" href="#" @click="logout">Đăng xuất</a>
                                <!-- <button type="button" class="boxed-btn" @click="logout">Đăng xuất</button> -->

                            </div>
                        </li>
                        <li v-else>
                            <div class="header-icons">
                              <router-link :to="{name: 'register'}">
                                <a class="shopping-cart" href="">Đăng ký</a>
                              </router-link> 
                              <router-link :to="{name: 'login'}">
                                <a class="mobile-hide search-bar-icon" href="#">Đăng nhập</a>
                              </router-link> 
                            </div>
                        </li>
                    </ul>
                </nav>
                
                <!-- <router-link :to="{name: 'user.cart', }"> -->
                          <router-link :to="{name: 'user.products'}">
                              <a class="mobile-show search-bar-icon" href="#"><i class="fas fa-search"></i></a>
                            
                          </router-link> 

                <!-- </router-link>  -->
                <div class="mobile-menu"></div>
                <!-- menu end -->
              
              </div>
          </div>
      </div>
  </div>
</div>
<!-- end header -->
</template>
  
  
<script>
// import '../../assets/assets/js/sticker';
// import '../../assets/assets/js/main';
// import '../../assets/assets/js/waypoints';
// import '../../assets/assets/js/jquery.countdown';

import { useAccountStore } from "@/stores/AccountStore";
import UserService from "@/services/user.service";
import CartService from "@/services/cart.service";

export default {
  components: {
    UserService,
    CartService
  },
  data() {
    const AccountStore = useAccountStore();
    return {
        showNavbar:false,
        AccountStore,
        userId: null,
        numOfProd: 0,
        cart:{},
      }
  },
  mounted() {
      const userData = localStorage.getItem('user'); // Lấy dữ liệu người dùng từ localStorage
      if (userData) {
          const user = JSON.parse(userData); // Chuyển chuỗi JSON thành đối tượng JavaScript
          if (user && user._id) {
              this.userId = user._id; // Gán giá trị email vào biến userEmail trong data
              // this.cart = CartService.findByUserId(this.userId);
              // console.log(this.cart);
              this.getCart(this.userId);

          }
      }
  },
  methods:{
  //  handleScroll (event) {
  //     window.pageYOffset>0?this.showNavbar=true:this.showNavbar=false;
  //   },
    async getCart(id) {
        try {
            this.cart = await CartService.findByUserId(id);
            console.log(this.cart);
            
        } catch (error) {
            console.log(error);
        }
    },
    async logout(){
        try {
            this.AccountStore.logout;
            localStorage.removeItem('user');
            location.reload()

        } catch (error) {
            console.log(error);
        }
    },
  },
  created () {
    this.getCart(this.userId);
    // console.log(this.userId)
    // window.addEventListener('scroll', this.handleScroll);
  },
  // destroyed () {
  //   window.removeEventListener('scroll', this.handleScroll);
  // }
}
</script>
