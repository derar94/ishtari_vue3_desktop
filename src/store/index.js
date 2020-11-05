import { createStore } from 'vuex'
import topNav from "./topNav"
import cart from "./cart"
import catalog from "./catalog"


export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        topNav,
        cart,
        catalog
    },

})