import axios from 'axios'
import {
    Loading,
    Message
} from 'element-ui'
export const http = axios.create({
    baseURL: 'http://39.98.244.125:8001/',
    timeout: 15000
})

export const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        http.get(url, {
            params: params
        }).then(res => {
            // console.log(res)
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const post = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        http.post(url, params).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
let loading;

function startLoading() { //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() { //使用Element loading-close 方法
    loading.close()
}
http.interceptors.request.use(config => {
    startLoading()
    return config
}, err => {
    return Promise.reject(err)
})

http.interceptors.response.use(
    res => {
        endLoading()
        return Promise.resolve(res)
    },
    () => {
        endLoading()
        Message.error('服务器错误，请稍后重试');
    }
)

export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$http', { value: http })
    }
}