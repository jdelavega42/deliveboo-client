<script >
import HeaderMenu from './components/HeaderMenu.vue';

export default {
  components:
    { HeaderMenu }
}

</script>

<template>
  <HeaderMenu />
  <h1 class="text-center m-2">asfhcvxb</h1>

  <router-view />
</template>

<style lang="scss">
@use "./style/general.scss" as *;
</style>