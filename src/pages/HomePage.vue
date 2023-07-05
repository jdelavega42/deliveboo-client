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
            loading: null,
            message: null,
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
            this.message = null;
            this.loading = true;
            this.restaurants = [];

            axios.get(`${store.apiBaseUrl}/api/filtered_restaurant/` + this.cookingType.name).then((resp) => {
                this.restaurants = resp.data.results;
            }).finally(() => {
                this.loading = false;
                if (this.restaurants.length) {
                    this.message = "Ecco i ristoranti per: " + this.cookingType.name
                } else {
                    this.message = "Nessun ristorante per: " + this.cookingType.name

                }

            })
        }

    }
}
</script>

<template>
    <div class="container">

        <!-- COOKINGS TYPE -->
        <h1 class="text-center">COSA TI VA OGGI?</h1>
        <div class="cookings-list d-flex row row-cols-4">

            <div class="col text-center" v-for="cooking in     cookings    ">
                <div class="cooking-type p-3 m-3 rounded"
                    :class="{ 'bg-red': cookingType && cookingType.name === cooking.name }" role='button'
                    @click="cookingType = cooking, getRestaurants()">{{
                        cooking.name }}</div>
            </div>
        </div>


        <!-- RESTAURANTS LIST -->
        <div class="restaurants-list" v-if="loading != null">

            <h1 class="text-center mt-4">I nostri ristoranti</h1>

            <div v-if="loading" class="text-center">CARICAMENTO</div>


            <div>{{ message }}</div>

            <div class="restaurants-list d-flex row row-cols-4">
                <div class="col text-center" v-for="    restaurant     in     restaurants    ">
                    <div class="restaurant p-3 m-3 rounded" role='button'>{{
                        restaurant.name }}</div>

                    <div v-for="cooking in restaurant.cookings"> {{ cooking }} </div>
                </div>
            </div>



            <!-- <router-link :to="{ name: 'home' }">Visualizza i tuoi progetti</router-link> -->
        </div>

    </div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;

h1 {

    color: $primary-green;
    font-weight: bold;

}

.cookings-list {
    color: $primary-red;


    .cooking-type {
        border: 2px solid $primary-red;
        text-transform: capitalize;
        font-size: 1.5rem;

    }

    .bg-red {
        color: white;
        background-color: $primary-red;
    }
}


.cooking-type:hover {
    color: white;
    background-color: $primary-red;

}

.restaurant {
    box-sizing: border-box;
    border: 2px solid white;

}

.restaurant:hover {
    border-color: $primary-red;
}
</style>