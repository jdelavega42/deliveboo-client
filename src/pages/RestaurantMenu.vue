<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: "RestaurantMenu",
    data() {
        return {
            restaurant: null,
            errorMessage: "",
            store
        };
    },
    mounted() {
        const slug = this.$route.params.slug;
        axios.get(`${store.apiBaseUrl}/api/restaurants/${slug}`).then(resp => {
            if (resp.data.success) {
                this.restaurant = resp.data.results

            } else {

                this.errorMessage = `${slug} non è un ristorante`
            }
        });
    }

}
</script>

<template></template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;
</style>