import axios from "axios";
import  {urlHttp_axios} from"./config";

const httpAxios = axios.create({
    baseURL: urlHttp_axios,
    timeout: 70000,
    headers: { 'X-Custom-Header': 'foobar', },
});
export default httpAxios;
