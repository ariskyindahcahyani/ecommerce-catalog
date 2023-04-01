export default {
    state() {
        return {
            cart: [],
        }
    },

    mutations: {
        addProductToCart(state, product) {
            state.cart.push(product);
        },

        removeProduct(state, product) {
            state.cart.splice(product, 1);
        },
    },
    getters: {
        getProducts(state) {
            return state.cart;
        },

        getItemCount(state) {
            return state.cart.length;
        }
    }
}