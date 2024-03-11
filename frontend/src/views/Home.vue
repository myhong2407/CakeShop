<template>
    <headercomponent class=""></headercomponent>
  
    <!-- <main style=""> -->
      <!-- <main style="margin-top:100px;"> -->
        <!-- <div > -->
          <router-view v-slot="{ Component }">
            <transition name="fade" >
              <component :is="Component"></component>
            </transition>
          </router-view>
        <!-- </div> -->
    <!-- </main> -->
    <footercomponent/>
</template>


<script>
  // import headercomponent from "../layout/navbar.vue";
import headercomponent from "@/views/layout/navbar.vue";
import footercomponent from "./layout/footer.vue";
export default {
    components: {
        headercomponent,
        footercomponent,
    },
    
};
</script>
  

<style>

</style>