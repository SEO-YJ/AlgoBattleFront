import axios from "axios"

const BASE_URL = '/api'
const instance = axios.create({
  baseURL: BASE_URL,
})

instance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
  function(response){
    return response.data;
  },
  function(err){
    return Promise.reject(err);
  }
)

export default instance;