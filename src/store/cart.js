import "@/axios"
import cart_requests from "@/http_requests/cart_requests"
const cart = {
    namespaced: true,
    state: {
        cartProducts: [],
        loading: false
    },
    mutations: {
        SET_LOADING(state, value) {
            state.loading = value
        },
        SET_CART_PRODUCTS(state, value) {
            state.cartProducts = value
        },

    },
    actions: {
        async getCartProducts({ commit }) {
            commit('SET_LOADING', true)
            await cart_requests.getCartProducts().then((response) => {
                let data = response.data
                response.data['productsCount'] = !data.success ? "0" : data.data.products.length

                commit('SET_CART_PRODUCTS', response.data)
                commit('SET_LOADING', false)
            })

        },
        async addToCart({ dispatch, commit }, payload) {
            commit('SET_LOADING', true)
            await cart_requests.addToCart(payload).then(() => {
                dispatch('getCartProducts')
            })
        }
    },
    getters: {

        cartProducts: state => {
            return state.cartProducts
        },
        loading: state => {
            return state.loading
        },
    }
}

export default cart