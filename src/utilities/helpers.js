
function updateProducts(state, products) {
    state.products = products;

};

function addToCart(state, product){
    let productInCartIndex = state.cart.findIndex(product);
    if (productInCartIndex != -1){
        state.cart[productInCartIndex].quantity++;
    } else {
        product.quantity = 1;
    }
    state.cart.push(product)
};

function removeFromCart(state, index){
        state.cart.splice(index, 1);
};

function updateOrder(state, order) {
    state.ordeer = order;
};

function updateCart(state, cart) {
    state.cart = cart;
}

