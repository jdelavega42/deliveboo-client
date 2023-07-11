import { reactive } from "vue";

export const store = reactive({
    apiBaseUrl: "http://localhost:8000",
    state: {
        cart: [],
        selectRestaurant: null,
        ordable: null,
        order: {},
        total: 0
    },
    updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    },
});

