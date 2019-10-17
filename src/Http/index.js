import axios from 'axios'
import { Loading, Message } from 'element-ui'
import json_response_codes from './codes'
import config from '../config'
import Vue from 'vue'
import Router from 'vue-router'
import store from '../ivews/store/index'
Vue.use(Router)

// 创建axios实例
//let token = window.localStorage.getItem("token") 
const Axios = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? "http://fc.home.fc9m.com/" : "/api/",
    //baseURL:'http://www.hxfc.com/',
    timeout: 10000,//超时请求
    maxRedirects: 1,
    headers: { "Content-Type": 'application/json' },
})
//拦截所有api请求，重新获取token
Axios.interceptors.request.use(
    config => {
        console.log(store)
        let token = store.getters.getToken
        console.log(token)
        //const token = store.state.token
        const lang = window.localStorage.getItem('lang')
        if (token||lang) {
            config.headers.Token = token
            config.headers.lang = lang
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

var loadinginstace;


// 拦截所有的 api 请求，未来可做权限检查，缓存，代理等
Axios.interceptors.request.use(
    config => {
        // element ui Loading方法
        loadinginstace = Loading.service({ fullscreen: true, text: 'Loading...' })
        return config;
    },
    error => {
        loadinginstace.close()
        return Promise.reject(error);
    },

);

// 拦截所有的 api 响应，可以实现自动弹窗报错
Axios.interceptors.response.use(
    response => {   // when HTTP_STATUS in [ 200 , 299 ]
        // const json_response = response.data;
        loadinginstace.close()
        //判断登录状态，跳转路由
        if (response.data.status === 500) {
            alert(response.data.msg)
           // console.log(window.location.host+"/login")
            //window.localStorage.removeItem('token')
           //window.location.href="/login"
            // window.location.href = window.location.origin + "#/login"
            Router.push('/')
        //    this.$router.push('/login')
        }
        if (response.status == 400) {
            console.log(response.data)
            alert(response.data.msg)
        }

        //返回数据
        if (response.status === json_response_codes.status) {
            return Promise.resolve(response.data);
        }

        Message({
            //请求超时时间
            message: json_response.message || '服务器接口异常', type: 'error', duration: 60 * 1000
        });

        return Promise.reject(response);
    },
    error => {      // when HTTP_STATUS in [ 300 , 599 ]

        loadinginstace.close()

        if (error === 'cancelled locally') {
            return Promise.reject(error);
        }

        if (error.message === 'timeout of 5000ms exceeded') {
            Message({
                message: '接口请求超时!', type: 'error', duration: 3 * 1000
            });
            return Promise.reject(error);
        }

        if (error.response.status === 429) {
            Message({
                message: '您的请求频率太快啦!', type: 'info', duration: 3 * 1000
            });
            return Promise.reject(error);
        }

        Message({
            message: '接口或网络异常，请稍后再试!', type: 'error', duration: 3 * 1000
        });

        return Promise.reject(error);
    }
);

export default Axios;


