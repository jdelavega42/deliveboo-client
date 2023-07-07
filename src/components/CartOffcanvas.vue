<script>
import { store } from '../store';
export default {
    name: "CartOffcanvas",
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Carrello</h5>
        </div>
        <div class="offcanvas-body">
            <div class="container py-1">
                <div class="row d-flex justify-content-center align-items-center">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
                    </div>

                    <div class="card rounded-3">

                            <div class="row d-flex justify-content-between align-items-center">
                                <div class="d-flex justify-content-between p-1 ">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                        class="img-fluid rounded-3 col-6" alt="Cotton T-shirt">
                                    <div class="col-6 text-end">
                                        <p class="lead fw-normal mb-2">Pasta al pesto</p>
                                        <h5 class="mb-0">$499.00</h5>

                                        <div class="d-flex">
                                            <button class="btn btn-link px-2"
                                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        
                                        <input id="form1" min="1" name="quantity" value="2" type="number"
                                        class="text-center form-control form-control-sm" />
                                        
                                        <button class="btn btn-link px-2"
                                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                    <button class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                                </div>
                            </div>
                    </div>
                </div>
                    </div>

                    <a href="#" class="btn btn-outline-success btn-block btn-lg mt-4">Checkout</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;
</style>