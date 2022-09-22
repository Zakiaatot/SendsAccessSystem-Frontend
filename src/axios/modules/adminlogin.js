import axios from "../axios.js"
import md5 from 'js-md5'
import rt from '../utils/returnjsonify.js'
//data:{name:'xxx,password:'xxx'}
export default async (data) => {
    try {
        const result = await axios.post('/adminlogin',{
            name:data.name,
            password:md5(data.password),
            isRemeber:data.isRemeber
        })
        if(result.status!==200) return rt.err('服务器连接失败，请稍后再试')
        if(result.data.code===0) return rt.err(result.data.msg)
        return rt.suc(result.data.msg)

    } catch (error) {
        return rt.err(error)
    }
}