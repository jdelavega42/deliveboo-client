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
    ordable() {
        if (this.state.cart.length > 0 && this.state.cart.every(obj => obj.quantity > 0)) {
            this.state.ordable = true
        } else {
            this.state.ordable = false

        }
    },

    increment(product) {
        product.quantity++;
        this.ordable();
        this.updateLocalStorage();
    },

    decrement(product) {
        let currentValue = product.quantity;
        if (currentValue > 1) {
            product.quantity--;
            this.ordable();

            this.updateLocalStorage();
        }
    },

    deleteCartProduct(product) {
        const index = this.state.cart.indexOf(product);
        this.state.cart.splice(index, 1);
        this.updateLocalStorage();
        this.ordable();
    },

    updateQuantity(product, quantity) {
        const newQuantity = parseInt(quantity.target.value);

        // Verifica se il nuovo valore dell'input è valido
        if (newQuantity && newQuantity >= 0) {
            product.quantity = newQuantity;
            this.ordable();
            this.updateLocalStorage();
        } else {
            this.state.ordable = false
            product.quantity = 0;
        }
        this.updateLocalStorage();
    }
    
});

