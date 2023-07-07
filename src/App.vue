<script >
import "/node_modules/@fortawesome/fontawesome-free/css/all.css";
import HeaderMenu from './components/HeaderMenu.vue';
import CartOffcanvas from "./components/CartOffcanvas.vue";

export default {
  components:
    { HeaderMenu, CartOffcanvas }
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