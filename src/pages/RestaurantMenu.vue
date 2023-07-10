<script>
import axios from "axios";
import { store } from "../store";
export default {
    name: "RestaurantMenu",
    data() {
        return {
            restaurant: [],
            errorMessage: "",
            products: [],
            quantity: [],
            // errorQuantity: "",
            store,
        };
    },
    mounted() {
        const slug = this.$route.params.slug;
        axios.get(`${store.apiBaseUrl}/api/restaurantMenu/${slug}`).then((resp) => {
            if (resp.data.success) {
                this.restaurant = resp.data.results[0];
                this.products = this.restaurant.product;
                this.quantity = this.products.map(() => 1); // Inizializza l'array dei valori con 1 per ogni input


            } else {
                this.errorMessage = `${slug} non è un ristorante`;
            }
        });

    },
    methods: {
        increment(index) {
            this.quantity[index]++;
        },

        decrement(index) {

            if (this.quantity[index] > 1) {
                this.quantity[index]--;
            }
        },
        addQuantity(index, quantity) {
            if (quantity > 1) {
                this.quantity[index] = parseInt(quantity);
                // this.errorQuantity = ""

            } else {
                // this.errorQuantity = "La quantità deve essere maggiore di 0"

            }
        },
        addToCart(product, index) {

            const existingProduct = this.store.state.cart.find((item) => item.id === product.id);
            if (existingProduct && this.quantity[index] > 0) {
                existingProduct.quantity = this.quantity[index];
                this.store.updateLocalStorage();

            } else if (this.quantity[index] > 0 && !this.store.state.cart[0]) {


                // Il prodotto non esiste nell'array "cart"
                // Aggiungi il prodotto all'array "cart"
                this.store.state.cart.push({ ...product, quantity: this.quantity[index] });
                this.store.updateLocalStorage();
            } else if (this.quantity[index] > 0 && this.store.state.cart[0] && product.restaurant_id == this.store.state.cart[0].restaurant_id) {
                this.store.state.cart.push({ ...product, quantity: this.quantity[index] });
                this.store.updateLocalStorage();
            } else if (this.quantity[index] > 0 && this.store.state.cart[0] && product.restaurant_id != this.store.state.cart[0].restaurant_id) {
                alert('Puoi inserire prodotti di un solo ristorante, aggiungi altor di ' + this.store.state.cart[0].name + ' o rimuovili')
            }
        }

    },
};
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
                    <h1 class="name m-1">{{ restaurant.name }}</h1>
                    <div v-for="cooking in restaurant.cookings" class="cookings m-3">
                        {{ cooking.name }}
                    </div>
                    <div class="description m-3">
                        {{ restaurant.PIVA }}
                    </div>
                    <div class="address m-2">{{ restaurant.address }}</div>
                    <div class="number m-1">{{ restaurant.number }}</div>
                </div>
            </div>

            <!-- IMAGES -->
            <div class="col restaurant-info restaurant-image">
                <div class="image d-flex justify-content-center align-items-center h-100">
                    <h2>IMMAGINI</h2>
                </div>
            </div>
        </div>
        <!-- MENU -->
        <h2 class="text-center mt-3">I nostri prodotti</h2>
        <div class="menu d-flex flex-column align-items-center">
            <div class="single-product rounded m-2 d-flex justify-content-around align-items-center"
                v-for="(product, index) in products" :key="index">
                <div class="images">
                    <img class="rounded" src="../assets/img/pizza_ph.jpg" alt="" />
                </div>
                <div class="info d-flex flex-column h-100 justify-content-around">
                    <div class="name mt-2">{{ product.name }}</div>
                    <div class="description">{{ product.description }}</div>
                    <div class="price my-2 me-3 align-self-end">
                        Prezzo {{ product.price }} $
                    </div>
                    <div v-if="product.visibility">Il prodotto è disponibile</div>
                    <div v-else>Il Prodotto non è disponibile</div>
                </div>
                <div class="cart-section d-flex flex-column h-100 justify-content-around h-100">
                    <div class="text-center" for="number">Quantità:</div>
                    <div class="position-relative quantity-form">
                        <div class="position-absolute error-quantity" v-if="quantity[index] < 1">"Inserisci un valore
                            maggiore di 0"</div>

                        <div class="d-flex align-items-center h-100">
                            <div class="p-2" @click="decrement(index)">
                                <i class="fa-solid fa-minus"></i>
                            </div>
                            <input type="number" :id="'number-' + product.id" class="quantity-number form-control"
                                name="number" v-model="quantity[index]" @input="addQuantity(index, $event.target.value)"
                                min="1" />

                            <div class="p-2" @click="increment(index)">
                                <i class="fa-solid fa-plus"></i>
                            </div>
                        </div>
                    </div>
                    <div class="text-center" @click="addToCart(product, index)">
                        Aggiungi al carrello <i class="fa-solid fa-cart-plus"></i>
                    </div>
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
    font-size: 1.2rem;

    .cookings {
        font-size: 1.5rem;
    }

    .description {
        width: 90%;
    }
}

h2 {
    color: $primary-green;
    font-weight: bold;
}

.single-product {
    height: 140px;
    border: 2px solid $primary-red;
    width: 85%;

    .images {
        height: 90%;

        img {
            height: 100%;
            max-width: 170px;
        }
    }

    .info {
        width: 65%;

        .name {
            font-size: 1.2rem;
        }
    }

    .cart-section {
        height: 90%;
        width: 15%;

        .error-quantity {
            color: red;
            top: -20px;
            font-size: .8rem;
        }
    }
}

// PER NON MOSTRARE LA BARRA CHE INCREMENTA I NUMERI
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
    display: none;
}
</style>
