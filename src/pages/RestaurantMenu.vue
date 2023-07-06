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
    <div class="container-fluid">

        <div class="row row-cols-2">
            <div class="col restaurant-info restaurant-name">
                <div class="info d-flex flex-column justify-content-center align-items-center h-100">

                    <h1 class="name m-1">Nome</h1>
                    <div class="cookings m-3">Italiano, cinese</div>
                    <div class="description m-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas sed
                        dignissimos
                        tempora quasi libero voluptas laborum dolorem itaque deleniti quaerat est, accusantium numquam
                        harum, saepe, veniam cumque? Incidunt, reiciendis illum.</div>
                    <!-- <div>f</div> -->
                </div>
            </div>
            <div class="col restaurant-info restaurant-image">
                <div class="image d-flex  justify-content-center align-items-center h-100">
                    <h2>IMMAGINI</h2>
                </div>
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

    .cookings {
        font-size: 1.5rem;
    }

    .description {
        font-size: 1.2rem;
        width: 90%;
    }

}
</style>