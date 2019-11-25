import http from '../Http'
class api{
    async choices(url, params) {
        //请求。页面中.then执行成功时的操作。
        return await http.post(url, params)
        //return await http.post('/minicart/template/choices')
    }
    async https(url, params) {
        //请求。页面中.then执行成功时的操作。
        return await http.get(url, params)
        //return await http.post('/minicart/template/choices')
    }

}
export default new api()