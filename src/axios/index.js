import axios from "axios";
import VueCookies from 'vue-cookies'
import main_urls from '@/ishtari.config'

let config = {

    withCredentials: true,
    baseURL: 'https://www.ishtari.com',
};
const _axios = axios.create(config);
_axios.interceptors.request.use(
    async config => {
        const token = await getValidToken(false)
        config.headers = {
            'Authorization': `Bearer ${token}`,
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });
_axios.interceptors.response.use((response) => {
    return response
}, async function(error) {
    const originalRequest = error.config;
    if (error.response.status === 401 || error.response.status === 403) {
        originalRequest._retry = true;
        const token = await getValidToken(true);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        return _axios(originalRequest);
    }
    return Promise.reject(error);
});

function getValidToken(refresh) {
    if (!refresh) {
        return new Promise(resolve => {
            if (VueCookies.get('auth_cookie') === null) {
                let requestBody = {
                    client_id: "shopping_oauth_client",
                    client_secret: "shopping_oauth_secret"
                };
                let requestHeader = {
                    Authorization: "Basic dGVzdGNsaWVudDp0ZXN0cGFzcw==",

                };
                axios
                    .post(main_urls["get-token"], requestBody, {
                        headers: requestHeader
                    })
                    .then(response => {

                        VueCookies.set("auth_cookie", response.data.access_token, '7D');
                        return resolve(VueCookies.get('auth_cookie'));

                    });
            } else {
                return resolve(VueCookies.get("auth_cookie"));
            }
        });
    } else {

        return new Promise(resolve => {

            let requestBody = {
                client_id: "shopping_oauth_client",
                client_secret: "shopping_oauth_secret"
            };
            let requestHeader = {
                Authorization: "Basic dGVzdGNsaWVudDp0ZXN0cGFzcw==",

            };
            axios
                .post(main_urls["get-token"], requestBody, {
                    headers: requestHeader
                })
                .then(response => {

                    VueCookies.set("auth_cookie", response.data.access_token, '7D');
                    return resolve(VueCookies.get('auth_cookie'));

                });

        });

    }
}

export default _axios