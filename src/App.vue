<script >
import HeaderMenu from './components/HeaderMenu.vue';

export default {
  components:
    { HeaderMenu }
}

</script>

<template>
  <HeaderMenu />
  <router-view />
</template>

<style lang="scss">
@use "./style/general.scss" as *;
@use "./style/partials/variables" as *;
</style>