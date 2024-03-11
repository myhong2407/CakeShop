<template>
<!-- breadcrumb-section -->
<div class="breadcrumb-section breadcrumb-bg">
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2 text-center">
        <div class="breadcrumb-text">
          <h1>Danh sách đơn hàng</h1>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- end breadcrumb section -->
<div class="container  order-container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Mã đơn hàng</th>
          <th scope="col">Thời gian đặt hàng</th>
          <th scope="col">Mã khách hàng</th>
          <th scope="col">Tổng tiền</th>
          <th scope="col">Trạng thái</th>
         
        </tr>
      </thead>

      <tbody>
        <tr v-for="(order, index) in this.orders" :key="order._id">
          <router-link
            :to="{
                name: 'user.order.detail',
                params: { id: order._id },
            }"
            style="display: contents; color: inherit; text-decoration: none;"
            >
            <td class="dark-pink-text">{{ order._id }}</td>
            <td>{{ order.date_time }}</td>
            <td>{{ order.user_id }}</td>
            <td>{{ order.total_cost }}.000đ</td>
            <td>
              <img v-if="order.status == true" src="../../assets/assets/img/check.png"  alt="Check Mark" style="width: 68px;" class="status-img">
              <img v-else src="../../assets/assets/img/Waiting.png" alt="Waiting" class="status-img" style="width: 68px;">
            </td>
         

          </router-link>
        

        </tr>

      </tbody>

    </table>
</div>
</template>

<script>
import { useAccountStore } from "@/stores/AccountStore";
import OrderService from "@/services/order.service";
export default {
    components: {
        OrderService,
    },
    data() {
        const AccountStore = useAccountStore();
        return {
            AccountStore,
            data:{},
            orders:[],
            userId:null,

        };
    },
    methods: {
        async getorders(){
            try {
                this.orders = await OrderService.findByUserId(this.userId);
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
        const userData = localStorage.getItem('user'); // Lấy dữ liệu người dùng từ localStorage
        if (userData) {
            const user = JSON.parse(userData); // Chuyển chuỗi JSON thành đối tượng JavaScript
            if (user && user._id) {
                this.userId = user._id;
                this.refreshList(); // Gán giá trị email vào biến userEmail trong data
            }
        }
    },
}
</script>

<style>
 
  .order-container {
    margin: 40px 50px;
  }

  /* Style for the table */
  .table {
    width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  }

  .table th,
  .table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
  }

  .table th {
    background-color: #f8f9fa;
    font-weight: bold;
  }

  .status-img {
    width: 24px;
  }

  .btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }

  .dark-pink-text {
    color: #e75480; /* Dark pink color code */
  }
</style>