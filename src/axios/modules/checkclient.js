import axios from "../axios.js"
import rt from '../utils/returnjsonify.js'

export default async () => {
    try {
        const result = await axios.post('/checkclient')
        if(result.status!==200) return rt.err('服务器连接失败，请稍后再试')
        return rt.suc(result.data.msg)
    } catch (error) {
        return rt.err(error)
    }
}