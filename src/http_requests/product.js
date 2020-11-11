import main_urls from '@/ishtari.config'
import axios from "@/axios"

const getData = async (id) => {
    return await axios.get(
        main_urls['product'] + id
    )
}


export default {
    getData
}