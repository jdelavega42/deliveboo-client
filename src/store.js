import { reactive } from "vue";

export const store = reactive({
    apiBaseUrl: "http://localhost:8000",
    state: {
        products: [],
        cart: [],
        order: {},
        total: 0
    },
    updateLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.state.cart));

    }
});
