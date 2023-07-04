<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: "HomePage",
    data() {
        return {
            cookings: [],
            restautants: [],
            store
        };
    },
    mounted() {
        this.getCookings();

    },
    methods: {
        getCookings() {
            axios.get(`${store.apiBaseUrl}/api/cookings`).then((resp) => {
                this.cookings = resp.data.results;
            })
        }
    }
}
</script>

<template>
    <div class="container">
        <h2>Cosa ti va oggi?</h2>

        <!-- <router-link :to="{ name: 'home' }">Visualizza i tuoi progetti</router-link> -->

    </div>
</template>

<style lang="scss" scoped></style>