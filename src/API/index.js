import http from '../Http'

class api extends http {
    async choices(url, params) {
        //请求。页面中.then执行成功时的操作。
        return await http.post(url, params)
    }

    async get(url, params) {
        //console.log(data)
        return await http.get(url, params)

    }
}
export default new api()