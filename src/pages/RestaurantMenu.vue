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
                this.products = this.restaurant.products;
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
                this.store.state.ordable = true;


            } else if (this.quantity[index] > 0 && this.store.state.cart[0] && product.restaurant_id == this.store.state.cart[0].restaurant_id) {
                this.store.state.cart.push({ ...product, quantity: this.quantity[index] });
                this.store.updateLocalStorage();

            } else if (this.quantity[index] > 0 && this.store.state.cart[0] && product.restaurant_id != this.store.state.cart[0].restaurant_id) {
                // alert('Puoi inserire prodotti di un solo ristorante, aggiungi altro di ' + this.restaurant.name + ' o rimuovili')
                let modal = document.getElementById('errorCart')
                modal.classList.add('d-block')



            }
        },
        closeModal() {
            let modal = document.getElementById('errorCart')
            modal.classList.remove('d-block')
        },
        removeCart() {
            this.closeModal()
            this.store.state.cart = []
            this.store.updateLocalStorage()
            this.store.state.ordable = false;


        }

    },
    //   },
};
</script>

<template>
    <div class="container">
        <!-- RESTAURANT INFO -->
        <div class="row mt-5">
            <!-- NAME AND MORE INFO -->
            <div class="col-lg-6 col-md-12 col-sm-12 restaurant-info restaurant-name">
                <div class="text-light p-5">
                    <h2 class="fs-1 fw-bolder text-uppercase text-light my-3">{{ restaurant.name }}</h2>
                    <ul>
                        <li class="d-block">
                            <span v-for="cooking in restaurant.cookings" class="badge rounded-pils text-bg-danger m-1">{{ cooking.name }}</span>
                        </li>
                        <li class="d-block">
                            <p class="fs-5">Partita IVA: {{ restaurant.PIVA }}</p>
                        </li>
                        <li class="d-block">
                            <p class="fs-5">Indirizzo: {{ restaurant.address }}</p>
                        </li>
                        <li class="d-block">
                            <p class="fs-5">Telefono: {{ restaurant.number }}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- IMAGES -->
            <div
                class="col-lg-6 d-none d-lg-flex justify-content-center align-items-center text-center border border-danger">
                <h2>IMMAGINE</h2>
            </div>
        </div>

        <!-- MENU -->
        <div class="ms-menu mt-5 d-flex">
            <div class="justify-content-center  flex-grow-1">

                <h2 class="mt-5 fs-3 fw-bolder text-center text-uppercase">I nostri prodotti</h2>
                <div class="row justify-content-center p-1 ">
                    <div class="col-12 rounded row my-1 p-1 "
                        :class="product.visibility ? 'single-product' : 'product-unaviable'"
                        v-for="(product, index) in products" :key="index">
                        <div class="col-lg-4 col-md-6 col-sm-12">

                            <div class="carousel slide" :id="'carouselExampleControls-' + index" data-bs-ride="carousel">
                                <div v-if="product.image_path" class="carousel-inner">
                                    <div class="carousel-item" v-for="(image, imageIndex) in product.image_path"
                                        :class="{ 'active': imageIndex === 0 }">
                                        <img :src="`${store.apiBaseUrl}/${image}`" class="d-block w-100 rounded-3"
                                            alt="...">

                                    </div>
                                </div>
                                <div v-else class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="../assets/img/images.png" class="d-block w-100 rounded-3" alt="...">
                                    </div>
                                </div>

                                <button class="carousel-control-prev" type="button"
                                    :class="product.image_path && product.image_path.length > 1 ? '' : 'd-none'"
                                    :data-bs-target="'#carouselExampleControls-' + index" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button"
                                    :class="product.image_path && product.image_path.length > 1 ? '' : 'd-none'"
                                    :data-bs-target="'#carouselExampleControls-' + index" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>

                        </div>
                        <div class="col-lg-8 col-md-6 col-sm-12 row">
                            <div class="col-lg-6 col-md-12 col-sm-12 d-flex flex-column justify-content-between p-3">
                                <div>
                                    <div class="name fs-1 text-uppercase mt-2">{{ product.name }}</div>
                                    <div class="price fs-4">{{ product.price }} &euro;</div>
                                    <div class="description d-flex justify-content-between align-items-center">
                                        <span>Descrizione: {{ product.description }}</span>
                                        <span v-if="product.visibility"
                                            class="border border-success text-success p-1 rounded-1">
                                            Disponibile</span>
                                        <span v-else class="border border-danger text-danger p-1 rounded-1">Non
                                            disponibile</span>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="col-lg-6 col-md-12 col-sm-12 text-center d-flex justify-content-center align-items-center">
                                <div class="w-75 mt-3">
                                    <div for="number">Quantità</div>
                                    <div class=" quantity-form mb-4">
                                        <div class="d-flex align-items-center h-100">
                                            <div class="p-2" @click="product.visibility ? decrement(index) : ''">
                                                <i class="fa-solid fa-minus"></i>
                                            </div>
                                            <input :class="{ 'product-disabled': !product.visibility }" type="number"
                                                :id="'number-' + product.id" class="quantity-number form-control"
                                                name="number" v-model="quantity[index]"
                                                @input="addQuantity(index, $event.target.value)" min="1" />
                                            <div class="p-2" @click="product.visibility ? increment(index) : ''">
                                                <i class="fa-solid fa-plus"></i>
                                            </div>
                                        </div>
                                        <div class="text-danger text-center" v-if="quantity[index] < 1">
                                            "Inserisci un valore maggiore di 0"
                                        </div>
                                    </div>
                                    <div>
                                        <div v-if="product.visibility"
                                            :data-bs-toggle="this.quantity[index] > 0 && this.store.state.cart[0] && product.restaurant_id != this.store.state.cart[0].restaurant_id ? 'modal' : ''"
                                            data-bs-target="#errorCart" @click="addToCart(product, index)">
                                            <span class="add-cart">Aggiungi al carrello <i
                                                    class="fa-solid fa-cart-plus"></i></span>
                                        </div>
                                        <div v-else>
                                            <span class="add-cart-disabled">Prodotto non disponibile</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>

    <!-- MODAL -->

    <div class="modal fade" id="errorCart" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="errorCart" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title fs-5" id="staticBackdropLabel">Attenzione</h2>
                </div>
                <div class="modal-body">
                    Puoi ordinare solo da un ristorante alla volta
                </div>
                <div class="modal-footer">
                    <button type="button" @click="removeCart()" data-bs-dismiss="modal" class="btn btn-danger">Svuota
                        carrello</button>
                    <button type="button" @click="closeModal()" class="btn btn-secondary"
                        data-bs-dismiss="modal">Chiudi</button>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;

.restaurant-info {
    height: 350px;
}

.restaurant-name {
    background-color: $primary-green;
    color: white;
    font-size: 1.2rem;

    .cookings {
        font-size: 1.5rem;
    }
}

h2 {
    color: $primary-green;
    font-weight: bold;
}

.product-disabled {
    pointer-events: none;
    opacity: 0.5;
}

.add-cart-disabled {
    pointer-events: none;
    opacity: 0.5;
}


.single-product {
    border: 2px solid $primary-green;
}

.product-unaviable {
    background-color: lightgray;
    border: 2px solid $primary-red;
}

.add-cart {
    display: inline-block;
    border-radius: 5px;
    padding: 5px 15px;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s, background-color 2s, color 1s;
    background-color: white;
    color: black;

    &:hover {
        transform: translateX(10px) scale(1.05);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 1), -5px 0 10px rgba(0, 0, 0, 1);
        background-color: $primary-green;
        color: white;
    }
}

img {
    max-height: 200px;
    object-fit: cover;
}

i {
    margin-left: 5px;
}

.quantity-number {
    min-width: 40px;
    /* Imposta la larghezza desiderata in base alle tue esigenze */
}

// PER NON MOSTRARE LA BARRA CHE INCREMENTA I NUMERI
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
    display: none;
}
</style>
