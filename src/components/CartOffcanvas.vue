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
  computed: {
    totalCost() {
      let cost = this.store.state.cart.reduce(
        (total, item) =>
          total + parseFloat(item.price) * parseInt(item.quantity),
        0
      );
      this.store.state.total = cost.toFixed(2);
      return this.store.state.total;
    },
  },

};

</script>

<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      <h3 class="offcanvas-title fw-normal mb-0 text-black">Carrello</h3>
    </div>
    <!-- lorem -->
    <div class="offcanvas-body">
      <div class="container py-1">
        <div class="row d-flex justify-content-center align-items-center">
          <!-- INIZIO SINGOLA CARTA -->
          <div class="card single-product rounded-3 mb-2 d-block" v-for="product in  store.state.cart ">
            <div class="row d-flex single-product justify-content-between align-items-center">
              <div class="d-flex justify-content-between h-100 p-1">
                <div class="img-container" v-if="product.image_path">
                  <img :src="`${store.apiBaseUrl}/${product.image_path[0]}`" class="d-block  rounded-3 "
                    :alt="product.name" />

                </div>
                <div class="img-container" v-else>
                  <img src="../assets/img/images.png" alt="default-img" class="d-block  rounded-3 ">
                </div>
                <div class="col-6 text-center h-100 p-1 d-flex flex-column justify-content-between">
                  <p class="lead fw-normal mb-2">{{ product.name }}</p>

                  <!-- aggiungere funzione productMultiplier -->
                  <h5 class="mt-0 mb-3">
                    &euro;<span class="price">{{ product.price }}</span>
                  </h5>
                  <div class="d-flex position-relative">
                    <div class="p-2" @click="store.decrement(product)">
                      <i class="fa-solid fa-minus"></i>
                    </div>

                    <!-- Modificare value -->
                    <input id="form1" min="1" name="quantity" type="number"
                      class="text-center form-control form-control-sm" :value="product.quantity"
                      @input="store.updateQuantity(product, $event)" />

                    <div class="p-2" @click="store.increment(product)">
                      <i class="fa-solid fa-plus"></i>
                    </div>
                  </div>
                  <div class="bottom-0 error-quantity" v-if="product.quantity == 0">La quantita non può essere 0 o
                    negativa</div>
                  <div class="btn w-100 btn-outline-danger" @click="store.deleteCartProduct(product)">
                    <i class="fas fa-trash"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- FINE SINGOLA CARTA -->

          <div class="card p-1 mt-4">
            <div class="d-flex justify-content-around align-items-center">
              <p class="lead fw-normal mb-2">Il tuo ordine</p>

              <!-- aggiungere funzione productMultiplier -->
              <h5>
                &euro;<span id="totalCartPrice">{{ totalCost }}</span>
              </h5>
            </div>
            <router-link :to="store.state.ordable ? { name: 'order' } : '#'" class="btn btn-success btn-block btn-lg"
              :class="store.state.ordable ? 'btn-success' : 'btn-danger'">
              <div :data-bs-dismiss="store.state.ordable ? 'offcanvas' : ''">
                Checkout
              </div>
            </router-link>
            <div class="btn btn-success btn-block btn-lg" data-bs-dismiss="offcanvas">
              Continua con gli
              acquisti
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;

.single-product {

  .img-container {
    width: 170px;
    height: 170px;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

}


.error-quantity {
  color: red;
  top: 40px;
  font-size: 0.8rem;
}
</style>
