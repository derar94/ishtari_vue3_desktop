import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import store from "@/store"
const Catalog = () => import('@/views/catalog/Catalog.vue')
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    // Catalog
    {
        path: '/category/:id',
        name: 'category',
        component: Catalog
    },
    {
        path: '/manufacturer/:id',
        name: 'manufacturer',
        component: Catalog
    },
    {
        path: '/seller/:id',
        name: 'seller',
        component: Catalog
    },

]

const router = createRouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to) => {
    //  Catlog Query Parameters Check
    if (to.name == 'category' || to.name == 'manufacturer' || to.name == 'seller') {
        if (typeof (to.query.page) == 'undefined' || typeof (to.query.limit) == 'undefined' || typeof (to.query.sort) == 'undefined') {
            router.push(
                {
                    path: to.path,
                    query: {
                        page: store.getters["catalog/page"],
                        limit: store.getters["catalog/limit"].url,
                        sort: store.getters["catalog/sort"].url
                    }
                }
            )
        }

    }
})
export default router
