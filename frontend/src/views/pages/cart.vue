<template>
<!-- breadcrumb-section -->
<div class="breadcrumb-section breadcrumb-bg">
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2 text-center">
        <div class="breadcrumb-text">
          <h1>Giỏ hàng</h1>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- end breadcrumb section -->

<!-- cart -->
<div class="cart-section mt-4 mb-150">
  <div class="container">
    <div class="row">
      <div class="col-lg col-md-12">
        <div class="cart-table-wrap">
          <table class="cart-table">
            <thead class="cart-table-head">
              <tr class="table-head-row">
                
                <th class="product-image"><strong>Hình ảnh</strong></th>
                <th class="product-name"><strong>Tên sản phẩm</strong></th>
                <th class="product-price"><strong>Giá</strong></th>
                <th class="product-quantity"><strong>Số lượng</strong></th>
                <th class="product-total"><strong>Tổng tiền</strong></th>
                <th class="product-remove"></th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-body-row" v-for="(product,index) in this.cart.product_list">
                <td class="product-image">
                  <img :src="'http://localhost:3000/images/'+product.prod_img" alt="">
                </td>
                <td class="product-name">{{product.prod_name}}</td>
                <td class="product-price"> {{product.prod_price}}</td>
                <td class="product-quantity">
                  <!-- <input type="number" placeholder="0"> -->
                  <input :value="product.prod_num" style="border-radius: 10px;" 
                    type="number" id="typeNumber" class="" />
                </td>
            
                <td class="product-total">{{ parseFloat(product.prod_num) * parseFloat(product.prod_price) }},000đ</td>
                <td class="product-remove">
                  <a href="#" @click="deleteProduct(product.prod_id)">
                    <i class="far fa-window-close"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- end cart -->

<!-- check out section -->
<div class="checkout-section mt-10 mb-100">
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <div class="checkout-accordion-wrap">
          <div class="accordion" id="accordionExample">
            <div class="card single-accordion">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    THÔNG TIN NHẬN HÀNG
                  </button>
                </h5>
              </div>

              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                  <div class="billing-address-form">
                    <form action="index.html">
                      <p><input v-model="this.name_user_receive" type="text" placeholder="Tên khách hàng"></p>
                      <p><input v-model="this.phone_user_receive" type="text" placeholder="Số điện thoại"></p>
                      <p><input v-model="this.destination" type="text" placeholder="Địa chỉ"></p>
                      <p>
                        <textarea v-model="this.note_receive" name="bill" id="bill" cols="30" rows="10" placeholder="Nội dung lời nhắn.."></textarea>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="order-details-wrap">
          <table class="order-details">
            <thead>
              <tr>
                <th><strong>ĐƠN ĐẶT HÀNG</strong></th>
                <th></th>
              </tr>
            </thead>
            <tbody class="order-details-body">
              <tr v-for="(product,index) in this.cart.product_list">
                <td>{{product.prod_name}}</td>
                <td>{{product.prod_price}}</td>
              </tr>

              <tr class="total-data">
                <td><strong>Phí giao hàng: </strong></td>
                <td>Miễn phí</td>
              </tr>

              <tr class="total-data">
                <td><strong>Tổng tiền: </strong></td>
                <td> {{ totalCost.toFixed(3) }}đ</td>
              </tr>
            </tbody>
          </table>
          <a href="#" class="boxed-btn" @click="submitOrder">Đặt hàng</a>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- end check out section -->


</template>
<script>
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import { useAccountStore } from "@/stores/AccountStore";

export default {
    components: {
        CartService
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        const AccountStore = useAccountStore();
        return {
            cart:{},
            message:"",
            AccountStore,
            totalCost: 0,
            destination:'',
            phone_user_receive:'',
            name_user_receive:'',
            note_receive:'',
            userId:null,
        };
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
         // Trong phương thức getCart
        async getCart(id) {
            try {
                this.totalCost = 0; // Reset totalCost để tránh cộng dồn khi gọi nhiều lần
                this.cart = await CartService.findByUserId(id);
                console.log(this.cart);
                for (let i = 0; i < this.cart.product_list.length; i++) {
                    const num = parseFloat(this.cart.product_list[i].prod_num);
                    const price = parseFloat(this.cart.product_list[i].prod_price);

                    if (!isNaN(num) && !isNaN(price)) {
                        this.totalCost += num * price;
                    } else {
                        console.error('Lỗi: prod_num hoặc prod_price không đúng định dạng.');
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProduct(product_id){
            try {
                await CartService.deleteOneProduct(this.cart._id,{"prod_id":product_id});
                await this.getCart(this.cart.account_id)
                location.reload()
            } catch (error) {
                console.log(error);
            }
        },

        async submitOrder(){
            try {
                if(this.cart.product_list.length == 0){
                  this.message = "there is no item in your cart!"
                }else{
                  const data = this.cart
                  data.user_id = this.cart.account_id
                  data.destination = this.destination
                  data.name_user_receive = this.name_user_receive
                  data.phone_user_receive = this.phone_user_receive
                  data.note_receive = this.note_receive
                  data.total_cost = this.totalCost
                  await OrderService.create(data)
                  await CartService.deleteAddProduct(this.cart.account_id);
                  this.totalCost = 0
                  await this.getCart(this.cart.account_id)
                  location.reload()
                }
                
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.getCart(this.id);
        this.message = "";
    },
};
</script>
<style>
</style>