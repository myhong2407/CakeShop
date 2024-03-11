<template>
<!-- breadcrumb-section -->
<div class="breadcrumb-section breadcrumb-bg">
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2 text-center">
        <div class="breadcrumb-text">
          <!-- <p>Fresh and Organic</p> -->
          <h1>Chi tiết đơn hàng</h1>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- end breadcrumb section -->

<div class="container">
    <div>
        <section class="h-100 gradient-custom">
            <div class="container py-5 h-100">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-10 col-xl-8">
                  <div class="card w-100" style="border-radius: 10px;">
                    <div class="card-header w-100 px-4 py-4">
                      <h4 class="text-muted mb-0 text-center"><strong style="color: #F1B4BB;">ĐƠN HÀNG: #{{this.order._id}}</strong></h4>
                    </div>
                    <div class="card-body w-100 p-4">
                      
                      <div v-for="(product,index) in this.order.product_list" class=" w-100 card shadow-0 border mb-4">
                        <div class="card-body w-100 ">
                          <div class="row">
                            <div class="col-md-2">
                              <img :src="'http://localhost:3000/images/'+product.prod_img"
                                class="img-fluid" alt="Phone">
                            </div>
                            <div class="col-md-4 text-center d-flex justify-content-center align-items-center">
                              <h5 class="text-muted mb-0">{{product.prod_name}}</h5>
                            </div>
                            <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p class="text-muted mb-0 small"></p>
                            </div>
                            <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <h5 class="text-muted mb-0">x {{product.prod_num}}</h5>
                            </div>
                            <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <h5 class="text-muted mb-0">{{product.prod_price}}</h5>
                            </div>
                          </div>
                          
                        </div>
                      </div>
          
                      <div class="d-flex justify-content-between pt-2">
                        <p class="fw-bold mb-0">Thông tin đơn hàng</p>
                        <p class="text-muted mb-0">
                          <!-- <span class="fw-bold me-4">Total</span> {{this.order.total_cost}} -->
                        </p>
                      </div>
          
                      <div class="d-flex justify-content-between pt-2">
                        <p class="text-muted mb-0">Tên người nhận: {{this.order.name_user_receive}}</p>
                      </div>
          
                      <div class="d-flex justify-content-between">
                        <p class="text-muted mb-0">Thời gian đặt hàng: {{this.order.date_time}}</p>
                        <p class="text-muted mb-0"><span class="fw-bold me-4"></span> </p>
                      </div>
          
                      <div class="d-flex justify-content-between mb-5">
                        <p class="text-muted mb-0">Địa chỉ: {{this.order.destination}}</p>
                        <!-- <p class="text-muted mb-0"><span class="fw-bold me-4">Delivery Charges</span> Free</p> -->
                      </div>
                    </div>
                    <div class="card-footer">
                      <h5>
                        <span class="h3">Tổng số tiền: </span>
                        <span class="h3 mb-0 ms-2">{{this.order.total_cost}}.000đ</span>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    </div>
</div>
</template>
<script>
import orderService from "@/services/order.service";
export default {
    components: {
        orderService,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            order:{},
        };
    },
    methods: {
        async getorders(){
            try {
                this.order = await orderService.get(this.id);
                console.log(this.orders)
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.getorders();
            this.activeIndex = -1;
        },
    
        
    },
    mounted() {
        this.refreshList();
    },
}
</script>