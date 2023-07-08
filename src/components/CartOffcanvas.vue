<script>
import { store } from '../store';
import { updateProducts, addToCart, removeFromCart, updateOrder, updateCart, productMultiplier, totalCart } from '../utilities/helpers';
export default {
    name: "CartOffcanvas",
    data() {
        return {
            store,
            updateProducts,
            addToCart,
            removeFromCart,
            updateOrder,
            updateCart,
            productMultiplier,
            totalCart
        }
    },
    mounted(){
        this.productMultiplier(),
        this.totalCart()
    }
}
</script>

<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            <h3 class=" offcanvas-title fw-normal mb-0 text-black">Shopping Cart</h3>
        </div>
        <!-- lorem -->
        <div class="offcanvas-body">
            <div class="container py-1">
                <div class="row d-flex justify-content-center align-items-center">
                    <!-- INIZIO SINGOLA CARTA -->
                    <div class="card rounded-3 mb-2">
                        <div class="row d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between p-1">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                    class="img-fluid rounded-3 col-6" alt="Cotton T-shirt">
                                <div class="col-6 text-center p-1 d-flex flex-column justify-content-between">
                                    <p class="lead fw-normal mb-2">Pasta al pesto</p>

                                    <!-- aggiungere funzione productMultiplier -->
                                    <h5 class="mb-0">&euro;<span class="price">499.00</span></h5>

                                    <div class="d-flex">
                                        <button class="btn btn-link px-2"
                                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                            <i class="fas fa-minus"></i>
                                        </button>


                                        <!-- Modificare value -->
                                        <input id="form1" min="1" name="quantity" value="2" type="number"
                                            class="text-center form-control form-control-sm" />

                                        <button class="btn btn-link px-2"
                                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <button class="btn  w-100 btn-outline-danger"><i class="fas fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- FINE SINGOLA CARTA -->


                    <!-- INIZIO CARTE DA CANCELLARE -->
                    <div class="card rounded-3 mb-2">
                        <div class="row d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between p-1">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                    class="img-fluid rounded-3 col-6" alt="Cotton T-shirt">
                                <div class="col-6 text-center p-1 d-flex flex-column justify-content-between">
                                    <p class="lead fw-normal mb-2">Pasta al pesto</p>

                                    <!-- aggiungere funzione productMultiplier -->
                                    <h5 class="mb-0">&euro;<span class="price">499.00</span></h5>

                                    <div class="d-flex">
                                        <button class="btn btn-link px-2"
                                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                            <i class="fas fa-minus"></i>
                                        </button>

                                        <input min="1" name="quantity" value="2" type="number"
                                            class="text-center form-control form-control-sm" />

                                        <button class="btn btn-link px-2"
                                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <button class="btn  w-100 btn-outline-danger"><i class="fas fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card rounded-3 mb-2">
                        <div class="row d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between p-1">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                    class="img-fluid rounded-3 col-6" alt="Cotton T-shirt">
                                <div class="col-6 text-center p-1 d-flex flex-column justify-content-between">
                                    <p class="lead fw-normal mb-2">Pasta al pesto</p>

                                    <!-- aggiungere funzione productMultiplier -->
                                    <h5 class="mb-0">&euro;<span class="price">499.00</span></h5>

                                    <div class="d-flex">
                                        <button class="btn btn-link px-2"
                                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                            <i class="fas fa-minus"></i>
                                        </button>

                                        <input min="1" name="quantity" value="2" type="number"
                                            class="text-center form-control form-control-sm" />

                                        <button class="btn btn-link px-2"
                                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <button class="btn  w-100 btn-outline-danger"><i class="fas fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card rounded-3 mb-2">
                        <div class="row d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between p-1">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                    class="img-fluid rounded-3 col-6" alt="Cotton T-shirt">
                                <div class="col-6 text-center p-1 d-flex flex-column justify-content-between">
                                    <p class="lead fw-normal mb-2">Pasta al pesto</p>

                                    <!-- aggiungere funzione productMultiplier -->
                                    <h5 class="mb-0">&euro;<span class="price">499.00</span></h5>

                                    <div class="d-flex">
                                        <button class="btn btn-link px-2"
                                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                            <i class="fas fa-minus"></i>
                                        </button>

                                        <input min="1" name="quantity" value="2" type="number"
                                            class="text-center form-control form-control-sm" />

                                        <button class="btn btn-link px-2"
                                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <button class="btn  w-100 btn-outline-danger"><i class="fas fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                   
                    <!-- FINE CARTE DA CANCELLARE -->

                    <div class="card p-1 mt-4">
                        <div class="d-flex justify-content-around align-items-center">
                            <p class="lead fw-normal mb-2">Your Order</p>

                            <!-- aggiungere funzione productMultiplier -->
                            <h5>&euro;<span id="totalCartPrice">499.00</span></h5>
                        </div>
                        <a href="#" class="btn btn-success btn-block btn-lg">Checkout</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;
</style>