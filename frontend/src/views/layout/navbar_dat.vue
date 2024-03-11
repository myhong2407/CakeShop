<template>

  <hr>
    <div>HIiiiiiiiiiii</div>
    <p> {{ AccountStore.user._id }}</p>
    <div class="w3-top">
      <div class="w3-bar w3-white w3-card" id="myNavbar">
        <a class="w3-bar-item w3-button w3-wide"> 
            <!-- <router-link
                :to="{
                    name: 'user',
                }"
                >
                <a class="active" href="">Home</a>
            </router-link> -->
          </a>
        <!-- Right-sided navbar links -->
        <div class="w3-right w3-hide-small">
          <a class="w3-bar-item w3-button">
            <!-- <router-link
            :to="{
                name: 'user',
            }"
            >
              <a class="active" href="">Home</a>
            </router-link> -->
          </a>
          <a  class="w3-bar-item w3-button"><i class="fa fa-user"></i> 
            <!-- <router-link
            :to="{
                name: 'user.products',
            }"
            >
              <a href="">Products</a>
            </router-link> -->
          </a>
          <a class="w3-bar-item w3-button"><i class="fa fa-th"></i> 
            <!-- <router-link
            :to="{
                name: 'user.cart',
                params: { id: this.AccountStore.user._id },
            }"
            >
              <a href="">Cart</a>
            </router-link> -->
          </a>
          <a class="w3-bar-item w3-button"><i class="fa fa-usd"></i> 
            <!-- <router-link
            :to="{
                name: 'user.order',
            }"
            >
              <a href="">Order</a>
            </router-link> -->
          </a>
        </div>
        <!-- Hide right-floated links on small screens and replace them with a menu icon -->
    
        <a href="javascript:void(0)" class="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" onclick="w3_open()">
          <i class="fa fa-bars"></i>
        </a>
      </div>
    </div>
 </template>


<script>
  import { useAccountStore } from "@/stores/AccountStore";
  import UserService from "@/services/user.service";
  
  export default {
    components: {
      UserService
    },
    data() {
      const AccountStore = useAccountStore();
      return {
          showNavbar:false,
          AccountStore
        }
      },
    methods:{
     handleScroll (event) {
        window.pageYOffset>0?this.showNavbar=true:this.showNavbar=false;
      },
      async logout(){
          try {
              this.AccountStore.logout;
          } catch (error) {
              console.log(error);
          }
      },
    },
    created () {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
</script>
  
<style>
  @import url(https://fonts.googleapis.com/css?family=Open+Sans);
  @import url(https://www.w3schools.com/w3css/4/w3.css);
  @import url(https://fonts.googleapis.com/css?family=Raleway);
  @import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
  
  body,h1,h2,h3,h4,h5,h6 {font-family: "Raleway", sans-serif}
  
  body{
    height: 100%;
    line-height: 1.8;
  }
  
  .bgimg-1 {
    background-position: center;
    background-size: cover;
    background-image: url("/w3images/mac.jpg");
    min-height: 100%;
  }
  
  .w3-bar .w3-button {
    padding: 16px;
  }
  
  body{
    background: #f2f2f2;
    font-family: 'Open Sans', sans-serif;
  }
  body {
    margin: 0;
    font-size: 28px;
    font-family: Arial, Helvetica, sans-serif;
  }
  
  .header {
    background-color: #fbfbfb;
    padding: 0px;
    height: 100px;
    text-align: center;
  }
  
  #navbar {
    padding: 4px; 
    overflow: hidden;
    color:black;
    background-color: #ffffff;
    height: 60px;
  }
  
  #navbar a {
    float: left;
    display: block;
    color: #000000;
    text-align: center;
    padding: 5px 16px;
    text-decoration: none;
    font-size: 17px;
  }
  
  #navbar a:hover {
    background-color: #ddd;
    color: black;
  }
  
  #navbar a.active {
    background-color: #4CAF50;
    color: rgb(0, 0, 0);
  }
  
  .content {
    padding: 16px;
  }
  
  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
  }
  
  .sticky + .content {
    padding-top: 60px;
  }
  .fade-enter-active
   {
    transition: all 1s;
  }
  .fade-leave-active {
    transition: all 2s;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
  
  }
</style>