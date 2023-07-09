import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import RestaurantMenu from "./pages/RestaurantMenu.vue";
import Payment from "./pages/Payment.vue";
import thankYou from "./pages/thankYou.vue";



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/restaurantMenu/:slug",
      name: "restaurant",
      component: RestaurantMenu,
    },
    {
      path: "/order",
      name: "order",
      component: Payment,
    },
    {
      path: "/state",
      name: "state",
      component: thankYou,
    },
  ],
});

export { router };
