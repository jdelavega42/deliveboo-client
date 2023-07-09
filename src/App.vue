<script >
import { store } from "./store";
import "/node_modules/@fortawesome/fontawesome-free/css/all.css";
import HeaderMenu from './components/HeaderMenu.vue';
import CartOffcanvas from "./components/CartOffcanvas.vue";
import Payment from "./components/Payment.vue";

export default {
  components:
    { HeaderMenu, CartOffcanvas, Payment },
  data() {
    return {
      store,
    };
  },
  mounted() {

    // Verifica se il localStorage contiene già un array "cart"
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      // Se presente, aggiorna l'array "cart" nello stato dello store
      this.store.state.cart.push(...JSON.parse(cartData));
    }
  },
}

</script>

<template>
  <HeaderMenu />
  <CartOffcanvas />
  <Payment />
  <router-view />
</template>

<style lang="scss">
@use "./style/general.scss" as *;
@use "./style/partials/variables" as *;
</style>