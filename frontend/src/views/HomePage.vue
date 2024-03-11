<template>
    <div>
      <p>Email người dùng: {{ userEmail }}</p> <!-- Hiển thị email người dùng từ biến userEmail -->
      <!-- Các phần tử khác của template -->
    </div>
</template>
<script>
import { useAccountStore } from "@/stores/AccountStore";

export default {
  data() {
    const AccountStore = useAccountStore();

    return {
      userEmail: "", // Khai báo biến để lưu email người dùng
      AccountStore,
      // Các dữ liệu khác của component
    }
  },
  mounted() {
    const userData = localStorage.getItem('user'); // Lấy dữ liệu người dùng từ localStorage
    if (userData) {
      const user = JSON.parse(userData); // Chuyển chuỗi JSON thành đối tượng JavaScript
      if (user && user._id) {
        this.userEmail = user._id; // Gán giá trị email vào biến userEmail trong data
      }
    }
  }
}
</script>
