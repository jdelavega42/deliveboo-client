<script >
import { store } from "./store";
import "/node_modules/@fortawesome/fontawesome-free/css/all.css";
import HeaderMenu from './components/HeaderMenu.vue';
import CartOffcanvas from "./components/CartOffcanvas.vue";
import Payment from "./pages/Payment.vue";

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
    if (this.store.state.cart.length > 0 && this.store.state.cart.every(obj => obj.quantity > 0)) {
      this.store.state.ordable = true
    } else {
      this.store.state.ordable = false

    }

  },
}

</script>

<template>
  <HeaderMenu />
  <CartOffcanvas />
  <router-view />
</template>

<style lang="scss">
@use "./style/general.scss" as *;
@use "./style/partials/variables" as *;
</style>