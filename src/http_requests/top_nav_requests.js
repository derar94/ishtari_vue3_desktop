import '@/ishtari.config.js'
import main_urls from '@/ishtari.config'
import axios from "@/axios"
const search = async(keyword) => {
    return await axios.get(main_urls['search'] + keyword)
}
const getMenu = async() => {
    let menu = await axios.get(main_urls['menu'])
    let topCategories = await axios.get(main_urls['top-categories'])
    return {
        menu: menu,
        topCategories: topCategories
    }
}
export default {
    search,
    getMenu
}