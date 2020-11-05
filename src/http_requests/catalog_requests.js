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
        return await axios.get(
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
    }
}

export default {

    getData
}