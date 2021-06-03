import Vue from 'vue'
import axios from 'axios'
import { VueAxios } from './axios'

// 创建 axios 实例
const service = axios.create({
  // baseURL: 'auth', // api base_url
  timeout: 100000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    switch (error.response.status) {
      // case 403:
      //   notification.error({ message: '系统提示', description: '拒绝访问',duration: 4})
      //   break
      // case 500:
      //   notification.err({ message: '系统提示', description: error.response.data.message, duration: 4 })
      //   break
      // default:
      //   notification.error({
      //     message: '系统提示',
      //     description: data.message,
      //     duration: 4
      //   })
      //   break
    }
  }
  return Promise.reject(error)
};

// request interceptor
service.interceptors.request.use(config => {
  // 判断登录
  // const token = localStorage.getItem('token')
  // if (token) {
  //   config.headers[ 'X-Access-Token' ] = token
  // } else {
  //   router.push('/login')
  // }
  // if(config.method=='get'){
  //   if(config.url.indexOf("sys/dict/getDictItems")<0){
  //     config.params = {
  //       _t: Date.parse(new Date())/1000,
  //       ...config.params
  //     }
  //   }
  // }
  // if (config.method === "put") {
  //   config.data = qs.stringify(config.data)
  // }
  return config
},(error) => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
  return response
}, err)


const installer = {
  vm: {},
  install (Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}