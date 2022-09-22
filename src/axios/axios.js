import axios from "axios"
const API = '/api'

axios.defaults.timeout=5000
axios.defaults.baseURL=API
axios.defaults.withCredentials = true // 允许携带cookie
axios.defaults.crossDomain = true//允许跨域
export default axios