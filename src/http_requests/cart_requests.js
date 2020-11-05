import '@/ishtari.config.js'
import main_urls from '@/ishtari.config'
import axios from "@/axios"
const getCartProducts = async () => {
    return await axios.get(main_urls['cart'])
}
export default {
    getCartProducts
}