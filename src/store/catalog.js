import "@/axios"
import catalog_requests from "@/http_requests/catalog_requests"
import router from "@/router"
const catalog = {
    namespaced: true,
    state: {
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
        }
    },
    mutations: {
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
            var toAdd = value[0]
            state.filters[toAdd].push(value)
            state.hasFilters = true
        },

    },
    actions: {
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
                payload['filter_string'] = ''
                for (const filter in getters.filters) {
                    if (getters.filters[filter].length > 0 && filter != 'option') {
                        payload['filter_string'] += '&filter_' + filter + '_id='
                        for (const subFilter in getters.filters[filter]) {
                            console.log(Object.values(getters.filters[filter][subFilter])[1])
                        }
                    }
                }
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
        }
    },
    getters: {
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
        }
    }
}
export default catalog