import "@/axios"
import catalog_requests from "@/http_requests/catalog_requests"
import router from "@/router"
import isEqual from "lodash";
const getDefaultState = () => {
    return {
        loading: false,
        data: [],
        pageType: '',
        pageId: '',
        page: 1,
        noData: false,
        readyData: false,
        // Limits
        limit: {
            'text': '50 PER PAGE',
            'url': '50'
        },
        limits: [
            {
                'text': '50 PER PAGE',
                'url': '50'
            },
            {
                'text': '100 PER PAGE',
                'url': '100'
            },
            {
                'text': '150 PER PAGE',
                'url': '150'
            }
        ],
        // Sorts
        sort: {
            text: 'Default',
            url: 'p.sort_order'
        },
        sorts: [
            {
                text: 'Default',
                url: 'p.sort_order'
            },
            {
                text: 'Price (Low to High)',
                url: 'p.price&order=ASC'
            },
            {
                text: 'Price (Hight to Low)',
                url: 'p.price&order=DESC'
            },
        ],
        hasFilters: false,
        filters: {
            'category': [],
            'manufacturer': [],
            'seller': [],
            'option': []
        },
        filterString: ''
    }
}
const mutations = {
    SET_PAGE_TYPE(state, value) {
        state.pageType = value
    },
    SET_PAGE_ID(state, value) {
        state.pageId = value
    },
    SET_LOADING(state, value) {
        state.loading = value
    },
    SET_DATA(state, value) {
        state.data = value
    },
    SET_PAGE(state, value) {
        state.page = value
    },
    SET_NO_DATA(state, value) {
        state.noData = value
    },
    SET_READY_DATA(state, value) {
        state.readyData = value
    },
    SET_SORT(state, value) {
        state.sort = value
        router.push(
            {
                name: state.pageType,
                params: { id: state.pageId },
                query: {
                    page: state.page,
                    limit: state.limit.url,
                    sort: state.sort.url
                }
            }
        )
    },
    SET_LIMIT(state, value) {
        state.limit = value
        router.push(
            {
                name: state.pageType,
                params: { id: state.pageId },
                query: {
                    page: state.page,
                    limit: state.limit.url,
                    sort: state.sort.url
                }
            }
        )
    },
    SET_FILTERS(state, value) {
        state.hasFilters = true
        let key = Object.keys(value[1])[0]
        if (key.indexOf('seller') > -1) {
            state.filters['seller'].push(value[1])
        }
        if (key.indexOf('option') > -1) {
            state.filters['option'].push(value[1])
        }
        if (key.indexOf('manufacturer') > -1) {
            state.filters['manufacturer'].push(value[1])
        }
        if (key.indexOf('category') > -1) {
            state.filters['category'].push(value[1])
        }
        // Clear Current FIlters
        state.filterString = ''
        for (const filterType in state.filters) {
            //  Check if filter array contains any value
            if (state.filters[filterType].length > 0) {

                if (filterType != 'option') {
                    state.filterString += '&filter_' + filterType + '_id='
                    for (const subFilter in state.filters[filterType]) {
                        state.filterString += state.filters[filterType][subFilter][filterType + '_id'] + ','
                    }
                    state.filterString = state.filterString.slice(0, -1)

                }
                else {
                    state.filterString += '&filter_options='
                    for (const subFilter in state.filters[filterType]) {
                        state.filterString += state.filters[filterType][subFilter][filterType + '_value_id'] + ','
                    }
                    state.filterString = state.filterString.slice(0, -1)

                }

            }
        }
    },

    REMOVE_FILTER(state, value) {
        let currentType = Object.keys(value)[0]
            .replace("_id", "")
            .replace("_value", "");
        for (const type in state.filters[currentType]) {
            if (isEqual(state.filters[currentType][type], value)) {
                let newState = state
                delete newState.filters[currentType][type]
                state.filters = newState.filters
            }
        }
    },
    CLEAR_STATE(state,) {
        Object.assign(state, getDefaultState())
    }
}




const actions = {
    async getData({ commit, getters }) {
        commit('SET_LOADING', true)
        let payload = {};
        payload['pageType'] = getters.pageType
        payload['pageId'] = getters.pageId
        payload['page'] = getters.page
        payload['sort'] = getters.sort
        payload['limit'] = getters.limit

        if (getters.hasFilters) {
            payload['pageType'] = 'filter'
            payload['defaultType'] = getters.pageType == 'category' ? 'path' : getters.pageType + "_id"
            payload['filter_string'] = getters.filterString
        }


        await catalog_requests.getData(payload).then((response) => {
            typeof (response.data.error) == 'undefined' ? commit('SET_DATA', response.data) : commit('SET_NO_DATA', true)

        })
        commit('SET_LOADING', false)
        commit('SET_READY_DATA', true)
    },
    setSort({ dispatch, commit }, payload) {
        commit("SET_SORT", payload)
        dispatch('getData')
    },
    setLimit({ dispatch, commit }, payload) {
        commit("SET_LIMIT", payload)
        dispatch('getData')
    },
    setFilters({ dispatch, commit }, payload) {

        if ('category_id' in payload) {
            commit('SET_FILTERS', ['category', payload])
        }
        if ('manufacturer_id' in payload) {
            commit('SET_FILTERS', ['manufacturer', payload])
        }
        if ('seller_id' in payload) {
            commit('SET_FILTERS', ['seller', payload])
        }
        if ('option_value_id' in payload) {
            commit('SET_FILTERS', ['option', payload])
        }
        dispatch('getData')
    },
    removeFilter({ commit, dispatch }, payload) {
        commit('REMOVE_FILTER', payload)
        dispatch('getData')
    }
}



const getters = {
    pageType: state => {
        return state.pageType
    },
    pageId: state => {
        return state.pageId
    },
    loading: state => {
        return state.loading
    },
    page: state => {
        return state.page
    },


    data: state => {
        return state.data
    },
    noData: state => {
        return state.noData
    },
    readyData: state => {
        return state.readyData
    },
    sort: state => {
        return state.sort
    },
    sorts: state => {
        return state.sorts
    },
    limit: state => {
        return state.limit
    },
    limits: state => {
        return state.limits
    },
    filters: state => {
        return state.filters
    },
    hasFilters: state => {
        return state.hasFilters
    },
    filterString: state => {
        return state.filterString
    }
}

const state = getDefaultState()
export default {
    namespaced: true,
    getters,
    actions,
    mutations,
    state
}