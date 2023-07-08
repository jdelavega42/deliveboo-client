<script>
import axios from "axios";
import { store } from "../store";
export default {
  name: "HomePage",
  data() {
    return {
      cookings: [],
      restaurants: [],
      // cookingType: null,
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
    <h1 class="text-center m-2">COSA TI VA OGGI?</h1>
    <div class="cookings-list d-flex row row-cols-4">
      <div class="col text-center" v-for="cooking in cookings">
        <div
          class="cooking-type p-3 m-3 rounded"
          :class="{ 'bg-red': params.includes(cooking.name) }"
          role="button"
          @click="getParams(cooking.name), getRestaurants()"
        >
          {{ cooking.name }}
        </div>
      </div>
    </div>

    <!-- RESTAURANTS LIST -->
    <div class="restaurants-list" v-if="loading != null">
      <h1 class="text-center mt-4">I nostri ristoranti</h1>

      <div v-if="loading" class="text-center">CARICAMENTO</div>

      <h2 class="text-center">{{ message }}</h2>

      <div class="restaurants-list d-flex row row-cols-4">
        <router-link
          :to="{ name: 'restaurant', params: { slug: restaurant.slug } }"
          class="col m-3 text-center restaurant rounded"
          role="button"
          v-for="restaurant in restaurants"
        >
          <div>{{ restaurant.name }}</div>

          <div class="cookings" v-for="cooking in restaurant.cookings">
            {{ cooking.name }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss" as *;
@use "../style/partials/variables" as *;

h1 {
  color: $primary-green;
  font-weight: bold;
}

h2 {
  color: $primary-green;
}

.cookings-list {
  color: $primary-red;

  .cooking-type {
    border: 2px solid $primary-red;
    text-transform: capitalize;
    font-size: 1.5rem;
  }

  .bg-red {
    color: white;
    background-color: $primary-red;
  }
}

.cooking-type:hover {
  color: white;
  background-color: $primary-red;
}

.restaurant {
  color: $primary-red;
  border: 2px solid $primary-red;
  text-transform: capitalize;
  font-size: 1.5rem;
  text-decoration: none;

  .cookings {
    font-size: 1rem;
    color: black;
  }
}

.restaurant:hover {
  background-color: $primary-red;
  color: white;

  .cookings {
    color: white;
  }
}
</style>
