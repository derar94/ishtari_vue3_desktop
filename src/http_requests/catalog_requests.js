import main_urls from '@/ishtari.config'
import axios from "@/axios"
const getData = async (payload) => {
    if (payload['pageType'] != 'filter') {
        return await axios.get(
            main_urls[payload.pageType]
            + payload.pageId
            + '&page='
            + payload.page
            + "&limit="
            + payload.limit.url
            + "&sort="
            + payload.sort.url
        )
    }
    else {
        let res = await axios.get(
            main_urls[payload.pageType]
            + '&page='
            + payload.page
            + "&limit="
            + payload.limit.url
            + "&sort="
            + payload.sort.url
            + "&"
            + payload.defaultType
            + "="
            + payload.pageId
            + payload.filter_string
        )
        res.data['data'] = res.data['product_filters']
        delete res.data['product_filters']
        return res.data
    }
}

export default {

    getData
}