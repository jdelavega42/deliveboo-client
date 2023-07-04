<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: "HomePage",
    data() {
        return {
            cookings: [],
            restaurants: [],
            cookingType: null,
            store
        };
    },
    mounted() {
        this.getCookings();

    },
    methods: {
        getCookings() {
            axios.get(`${store.apiBaseUrl}/api/cookingType`).then((resp) => {
                this.cookings = resp.data.results;
            })
        },
        getRestaurants() {
            axios.get(`${store.apiBaseUrl}/api/filtered_restaurant/` + this.cookingType).then((resp) => {
                this.restaurants = resp.data.results;
            })
        }

    }
}
</script>

<template>
    <div class="container">
        <h2>Cosa ti va oggi?</h2>
        <div v-for="cooking in cookings" @click="cookingType = cooking.name, getRestaurants()">{{ cooking.name }}</div>
        <div v-for="restaurant in restaurants">{{ restaurant.name }}</div>
        <!-- <router-link :to="{ name: 'home' }">Visualizza i tuoi progetti</router-link> -->

    </div>
</template>

<style lang="scss" scoped></style>