import axios from "axios";

const httpAxios = axios.create({
    baseURL: 'http://172.16.8.26/app_mobile/AnhTuShop_api/public/api/',
    timeout: 70000,
    headers: { 'X-Custom-Header': 'foobar', },
});
export default httpAxios;
