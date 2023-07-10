<script>
import { store } from "../store";
import {
  updateProducts,
  addToCart,
  removeFromCart,
  updateOrder,
  updateCart,
  productMultiplier,
  totalCart,
} from "../utilities/helpers";
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
      totalCart,
    };
  },
  mounted() {
    this.productMultiplier(), this.totalCart();
    // this.store.state.total = this.store.state.cart.reduce((total, item) => total + parseFloat(item.price) * parseInt(item.quantity), 0);
  },
  methods: {
    increment(product) {
      product.quantity++;
      this.store.updateLocalStorage();
    },

    decrement(product) {
      let currentValue = product.quantity;
      if (currentValue > 1) {
        product.quantity--;
        this.store.updateLocalStorage();
      }
    },
    updateQuantity(product, quantity) {
      const newQuantity = parseInt(quantity.target.value);

      // Verifica se il nuovo valore dell'input è valido
      if (newQuantity && newQuantity >= 0) {
        product.quantity = newQuantity;
      } else {
        product.quantity = 0;
      }
      this.store.updateLocalStorage();
    },
    deleteCartProduct(product) {
      const index = this.store.state.cart.indexOf(product);
      this.store.state.cart.splice(index, 1);
      this.store.updateLocalStorage();
    },
  },
  computed: {
    totalCost() {
      let cost = this.store.state.cart.reduce(
        (total, item) =>
          total + parseFloat(item.price) * parseInt(item.quantity),
        0
      );
      this.store.state.total = cost;
      return cost;
    },
  },
};
</script>

<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
      <h3 class="offcanvas-title fw-normal mb-0 text-black">Shopping Cart</h3>
    </div>
    <!-- lorem -->
    <div class="offcanvas-body">
      <div class="container py-1">
        <div class="row d-flex justify-content-center align-items-center">
          <!-- INIZIO SINGOLA CARTA -->
          <div class="card rounded-3 mb-2" v-for="product in store.state.cart">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="d-flex justify-content-between p-1">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                  class="img-fluid rounded-3 col-6"
                  alt="Cotton T-shirt"
                />
                <div
                  class="col-6 text-center p-1 d-flex flex-column justify-content-between"
                >
                  <p class="lead fw-normal mb-2">{{ product.name }}</p>

                  <!-- aggiungere funzione productMultiplier -->
                  <h5 class="mb-0">
                    &euro;<span class="price">{{ product.price }}</span>
                  </h5>

                  <div class="d-flex">
                    <div class="p-2" @click="decrement(product)">
                      <i class="fa-solid fa-minus"></i>
                    </div>

                    <!-- Modificare value -->
                    <input
                      id="form1"
                      min="1"
                      name="quantity"
                      type="number"
                      class="text-center form-control form-control-sm"
                      :value="product.quantity"
                      @input="updateQuantity(product, $event)"
                    />

                    <div class="p-2" @click="increment(product)">
                      <i class="fa-solid fa-plus"></i>
                    </div>
                  </div>
                  <div
                    class="btn w-100 btn-outline-danger"
                    @click="deleteCartProduct(product)"
                  >
                    <i class="fas fa-trash"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- FINE SINGOLA CARTA -->

          <div class="card p-1 mt-4">
            <div class="d-flex justify-content-around align-items-center">
              <p class="lead fw-normal mb-2">Your Order</p>

              <!-- aggiungere funzione productMultiplier -->
              <h5>
                &euro;<span id="totalCartPrice">{{ totalCost }}</span>
              </h5>
            </div>
            <router-link
              :to="{ name: 'order' }"
              class="btn btn-success btn-block btn-lg"
              >Checkout</router-link
            >
            <router-link
              :to="{ name: 'home' }"
              class="btn btn-success btn-block btn-lg"
              >Continua con gli acquisti</router-link
            >
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
