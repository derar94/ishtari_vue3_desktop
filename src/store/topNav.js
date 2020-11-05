import "@/axios"
import top_nav_requests from "@/http_requests/top_nav_requests"
const topNav = {
    namespaced: true,
    state: {
        // Search
        searchResults: [],
        showResults: false,
        noResults: false,
        // Menu
        menuData: []
    },
    mutations: {
        // Search
        SET_SHOW_RESULTS(state, value) {
            state.showResults = value
        },
        SET_NO_RESULTS(state, value) {
            state.noResults = value
        },
        SET_SEARCH_RESULTS(state, value) {
            state.searchResults = value
        },
        // Menu
        SET_MENU_DATA(state, value) {
            state.menuData = value
        }
    },
    actions: {
        // Search
        async search({ commit }, keyword) {
            if (keyword.length > 2) {
                top_nav_requests.search(keyword).then((response) => {
                    if (typeof(response.data) != 'undefined' && response.data.length > 0) {
                        commit('SET_SHOW_RESULTS', true)
                        commit('SET_NO_RESULTS', false)
                        commit('SET_SEARCH_RESULTS', response.data)
                    } else {
                        commit('SET_NO_RESULTS', true)
                    }
                })
            } else {
                commit('SET_SHOW_RESULTS', false)
                commit('SET_NO_RESULTS', false)
                commit('SET_SEARCH_RESULTS', [])
            }

        },
        // Menu
        async getMenu({ commit }) {
            top_nav_requests.getMenu().then((response) => {
                (response)
                commit("SET_MENU_DATA", response)
            })
        }
    },
    getters: {
        // Search
        showResults: state => {
            return state.showResults
        },
        searchResults: state => {
            return state.searchResults
        },
        noResults: state => {
            return state.noResults
        },
        // Menu
        menuData: state => {
            return state.menuData
        },
    }
}

export default topNav