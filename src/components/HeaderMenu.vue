<script>
import { store } from '../store';

export default {
    name: "HeaderMenu",
    data(){
        return{
            store
        }
    }
}
</script>

<template>
<nav class="navbar sticky-top navbar-expand-md navbar-light bg-light">
    <div class="container">                    
        <router-link
            :to="{ name: 'home'}"
            role="button">
             <a class="navbar-brand" href="#">
                <img src="../assets/img/db_logo.png" alt="" class="img-fluid smaller-image" width="220">
            </a>
        </router-link>
        <button class="navbar-toggler position-relative" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            <span v-if="store.state.cart.length > 0" class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto align-items-end">
                <li class="nav-item">
                    <router-link
                      :to="{ name: 'home'}"
                      role="button"
                      class="text-decoration-none">
                      <a class="nav-link position-relative py-0 text-success fw-bold" href="#">Home</a>
                    </router-link>
                </li>
                <li class="nav-item ">
                    <a class="nav-link position-relative py-0 text-success fw-bold" href="http://localhost:8000">Sei un ristoratore?</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link position-relative py-0 text-success fw-bold" href="#">Contatti</a>
                </li>
                <li class="nav-item">
                    <button class="btn border-0 position-relative" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        <i class="text-success fa-solid fa-cart-shopping fa-2x" id="cart"></i>
                        <span v-if="store.state.cart.length > 0" class="position-absolute badge rounded-pill bg-danger"> {{ store.state.cart.length }} </span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</nav>

</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;

a::after{
    content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: $primary-red;
  transform: scaleX(0);
  transition: transform 200ms ease;
}
.nav-item:hover a.nav-link::after {
    transform: scale(1);
}
#cart:hover {
    animation-name: floating;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
}
@keyframes floating {
    0% { transform: translate(0,  0px); }
    50%  { transform: translate(0, 5px); }
    100%   { transform: translate(0, 0px); }   
}
</style>