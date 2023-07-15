<script>
import axios from "axios";
import { store } from "../store";
export default {
  name: "HomePage",
  data() {
    return {
      cookings: [],
      restaurants: [],
      loading: null,
      message: null,
      params: [],
      paramsting: null,
      store,
    };
  },
  mounted() {
    this.getCookings();
  },
  methods: {
    // Prende la lista dei cookings
    getCookings() {
      axios.get(`${store.apiBaseUrl}/api/cookingType`).then((resp) => {
        this.cookings = resp.data.results;
      });
    },
    //Aggiunge/rimuove il cooking nell'array params in base al click
    getParams(param) {
      if (this.params.includes(param)) {
        const index = this.params.indexOf(param);
        this.params.splice(index, 1);
      } else {
        this.params.push(param);
      }
    },

    // Prende i ristoranti tramite una ricerca axios
    getRestaurants() {
      this.message = null;
      this.loading = true;
      this.restaurants = [];
      this.paramsting = this.params.join("&"); //Crea una stringa da passare come unico parametro alla chiamata

      if (this.paramsting) {
        axios
          .get(`${store.apiBaseUrl}/api/restaurants/` + this.paramsting)
          .then((resp) => {
            this.restaurants = resp.data.results;
          })
          .finally(() => {
            this.loading = false;
            if (this.restaurants.length) {
              this.message = "Ecco i ristoranti per: " + this.params.join(", ");
            } else {
              this.message = "Nessun ristorante per: " + this.params.join(", ");
            }
          });
      } else {
        this.loading = false;
        this.message = "Nessuna categoria selezionata";
      }
    },
  },
};
</script>

<template>
  <div class="container">
    
    <!-- COOKINGS TYPE -->
    <div class="">
      <h2 class="fs-1 fw-bolder border-bottom text-success text-center m-5 text-uppercase">Cosa ti va oggi?</h2>
      <div class="row">
        <div class="col-sm-4 col-md-3 col-lg-2 text-center p-3" v-for="cooking in cookings">
          <span class="btn btn-outline-danger border-3 rounded text-capitalize fw-bold w-100 py-3 shadow" :class="{ 'btn-danger text-white': params.includes(cooking.name) }" role="button"
          @click="getParams(cooking.name), getRestaurants()">
          {{ cooking.name }}
        </span>
      </div>
    </div>
  </div>
    
    <!-- RESTAURANTS LIST -->
    <div v-if="loading != null">
      <h2 class="fs-1 fw-bolder border-bottom text-success text-center m-5">I nostri ristoranti</h2>
      <div v-if="loading" class="text-center">CARICAMENTO</div>

      <h2 class="text-center">{{ message }}</h2>
      <div class="row justify-content-center">

        <template v-for="restaurant in restaurants">
          <div  class="col-lg-4 col-md-6 col-sm-12 p-3">
            <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }"
            role="button"  class="ms-hover card text-center p-0 text-decoration-none shadow-lg border border-success border-2">
            
            <p class="card-header fs-3 bg-success text-white">{{ restaurant.name }}</p>
            <ul class="list-group border border-0">
              <li class="list-group-item fs-5">
                <span v-for="cooking in restaurant.cookings" class="badge rounded-pils text-bg-danger m-1">{{ cooking.name }}</span>
              </li>
              <li class="list-group-item">
                {{ restaurant.address }}
              </li>
              <li class="list-group-item">
                {{ restaurant.number }}
              </li>
              <li class="list-group-item">
                {{ restaurant.email }}
              </li>
            </ul>
          </router-link>
        </div>
      </template>
    </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;

.ms-hover {
  transition: 200ms;
}
.ms-hover:hover {
  transform: scale(1.05);
}
</style>
