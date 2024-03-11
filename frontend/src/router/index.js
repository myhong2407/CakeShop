import { createWebHistory, createRouter } from "vue-router";
import {useAccountStore} from "@/stores/AccountStore"

const routes = [
    {
        path: "/",
        name: "homepage",
        component: () => import("@/views/Home.vue"),
        children: [
          {
            path: "/",
            name: "user.home",
            component: () => import("@/views/pages/homepage.vue"),
          },
          {
              path: "/about",
              name: "about",
              component: () => import("@/views/About.vue"),
          },
          {
              path: "/contact",
              name: "contact",
              component: () => import("@/views/Contact.vue"),
          },
          {
            path: "/user/products",
            name: "user.products",
            component: () => import("@/views/pages/product.vue"),
          },
          {
              path: "/user/products/:id",
              name: "user.product.detail",
              component: () => import("@/views/pages/productDetail.vue"),
              props: true
          },
          {
              path: "/user/cart/:id",
              name: "user.cart",
              component: () => import("@/views/pages/cart.vue"),
              props: true
          },
          {
              path: "/user/order",
              name: "user.order",
              component: () => import("@/views/pages/order.vue"),
          },
          {
              path: "/user/order/:id",
              name: "user.order.detail",
              component: () => import("@/views/pages/orderDetail.vue"),
              props: true
          },
        ]
    },
    {
        path: "/admin",
        component: () => import("@/views/admin/AdminPage.vue"),
        children: [
          {
            path: "/admin/product",
            name: "admin.product",
            component: () => import("@/views/admin/components/product.vue"),
          },
          {
            path: "/admin/product/add",
            name: "admin.product.add",
            component: () => import("@/views/admin/components/addProduct.vue"),
          },
          {
              path: "/admin/product/:id",
              name: "admin.product.edit",
              component: () => import("@/views/admin/components/editProduct.vue"),
              props: true
          },
          {
            path: "/admin/category",
            name: "admin.category",
            component: () => import("@/views/admin/components/category.vue"),
          },
          {
            path: "/admin/category/add",
            name: "admin.category.add",
            component: () => import("@/views/admin/components/addCategory.vue"),
          },
          {
              path: "/admin/category/:id",
              name: "admin.category.edit",
              component: () => import("@/views/admin/components/editCategory.vue"),
              props: true
          },
          {
              path: "/admin/order",
              name: "admin.order",
              component: () => import("@/views/admin/components/order.vue"),
          },
          {
              path: "/admin/order/:id",
              name: "admin.order.detail",
              component: () => import("@/views/admin/components/orderDetail.vue"),
              props: true
          },
        ]
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/SignUp.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/SignIn.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const userStore = useAccountStore();
    if (!userStore.user && to.name !== 'login' && to.name !== 'register') {
      // Kiểm tra xem có dữ liệu trong localStorage hay không
      const userData = localStorage.getItem('user');
      if (userData) {
        // Nếu có thì đưa dữ liệu vào store
        userStore.user = JSON.parse(userData);
      } else {
        next({
          path: '/login',
          replace: true,
        });
      }
    } else {
      next();
    }
    
  });

export default router;