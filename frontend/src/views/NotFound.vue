<template>
    <!-- breadcrumb-section -->
    <headercomponent class=""></headercomponent>

<div class="breadcrumb-section breadcrumb-bg">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 offset-lg-2 text-center">
                <div class="breadcrumb-text">
                    <p></p>
                    <h1>404 - Not Found</h1>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- end breadcrumb section -->
<!-- error section -->
<div class="full-height-section error-section" style="height: 68%;">
    <div class="full-height-tablecell">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 offset-lg-2 text-center">
                    <div class="error-text">
                        <i class="far fa-sad-cry"></i>
                        <h1>Oops! Không tìm thấy trang.</h1>
                        
                        
                        <router-link :to="{name: 'user.home'}">
                            <a href="" class="boxed-btn">Trang về Trang chủ</a>
                        </router-link> 

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- end error section -->
<footercomponent/>

</template>

<script>
import headercomponent from "@/views/layout/navbar.vue";
import footercomponent from "./layout/footer.vue";
export default {
    components: {
        headercomponent,
        footercomponent,
    },
    
};
</script>