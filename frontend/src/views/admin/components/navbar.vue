<template>
<!--Main Navigation-->
<!-- Top container -->
<div class="w3-bar w3-top w3-black w3-large" style="z-index:4">
  <button class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" onclick="w3_open();"><i class="fa fa-bars"></i>  Menu</button>
  <span class="w3-bar-item w3-right">Dashboard</span>
</div>

<!-- Sidebar/menu -->
<nav class="w3-sidebar w3-collapse w3-white w3-animate-left" style="z-index:3;width:300px;" id="mySidebar"><br>
  <div class="w3-container w3-row">
    <div class="w3-col s4">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ9yhUvL9R1Gjw7mWDrR6O8ttWtUPC0cKFiZC_nYE&s" class="w3-circle w3-margin-right" style="width:46px">
    </div>
    <div class="w3-col s8 w3-bar">
      <span>Welcome, <strong>{{ this.userStore.user.name }}</strong></span><br>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-envelope"></i></a>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-user"></i></a>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-cog"></i></a>
    </div>
  </div>
  <hr>
  <div class="w3-container">
    <h5>Dashboard</h5>
  </div>
  <div class="w3-bar-block">
    <a class="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onclick="w3_close()" title="close menu"><i class="fa fa-remove fa-fw"></i>  Close Menu</a>
      <a class="w3-bar-item w3-button w3-padding"><i class="fa fa-bank fa-fw"></i>  General</a>  
    
    <router-link
    :to="{
        name: 'admin.user',
    }"
    > 
    <a class="w3-bar-item w3-button w3-padding">
      <i class="fa fa-users fa-fw"></i>  User
    </a>
    </router-link>
    <router-link
      :to="{
          name: 'admin.product',
      }"
    > 
    <a  class="w3-bar-item w3-button w3-padding">
      <i class="fa fa-eye fa-fw"></i>  Product
    </a>
    </router-link>
    <router-link
      :to="{
          name: 'admin.order',
      }"
    > 
    <a  class="w3-bar-item w3-button w3-padding">
      <i class="fa fa-diamond fa-fw"></i>  Orders 
    </a>
    </router-link>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-history fa-fw"></i>  History</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-cog fa-fw"></i>  Settings</a><br><br>
  </div>
</nav>
  <!--Main Navigation-->
  

</template>
<script>
// import "@/assets/navbar.js";
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}

import { userAccStore } from "@/Store/userStore";
export default {
    components: {
    },
    data() {
        const userStore = userAccStore()
        return {
          userStore,
        };
    },
    methods: {
    },
};
</script>
<style scoped src="@/assets/navbar.css">
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
@import url(https://www.w3schools.com/w3css/4/w3.css);
@import url(https://fonts.googleapis.com/css?family=Raleway);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
@import './assets/navbar.css';
</style>