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

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="#">Logo</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container-fluid">

        <!-- RESTAURANT INFO -->
        <div class="row row-cols-2">

            <!-- NAME AND MORE INFO -->
            <div class="col restaurant-info restaurant-name">
                <div class="info d-flex flex-column justify-content-center align-items-center h-100">

                    <h1 class="name m-1">Nome</h1>
                    <div class="cookings m-3">Italiano, cinese</div>
                    <div class="description m-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas sed
                        dignissimos
                        tempora quasi libero voluptas laborum dolorem itaque deleniti quaerat est, accusantium numquam
                        harum, saepe, veniam cumque? Incidunt, reiciendis illum.</div>
                    <div class="address m-2">Via Luigi Delle Bicocche</div>
                    <div class="number m-1">30303030243</div>
                </div>
            </div>

            <!-- IMAGES -->
            <div class="col restaurant-info restaurant-image">
                <div class="image d-flex  justify-content-center align-items-center h-100">
                    <h2>IMMAGINI</h2>
                </div>
            </div>

        </div>
        <!-- MENU -->
        <div class="menu d-flex flex-column align-items-center">
            <div class="single-product w-75">

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;

.restaurant-info {

    height: 500px;
}

.restaurant-name {
    background-color: $primary-green;
    color: white;
    font-size: 1.2rem;

    .cookings {
        font-size: 1.5rem;
    }

    .description {
        width: 90%;
    }

}

.single-product {
    height: 100px;
    background-color: red;
}
</style>