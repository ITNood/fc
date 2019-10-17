import {post,get} from '../Http'

class api  {
    async choices(url, params) {
        //请求。页面中.then执行成功时的操作。
        return await post(url, params)
    }

    async get(url, params) {
        //console.log(data)
        return await get(url, params)

    }
}
export default new api()