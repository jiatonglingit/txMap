import axios from 'axios'
import AxiosClient from './AxiosClient'
// import { axios } from '../utils/request.js'

const ax = new AxiosClient(axios, {
    beforeRequest() {
        console.log('请求')
        return true
    },
    afterRequest() {
        console.log('失败')
    }
})

export default {
    // 地图有关
    getAnalys: ax.post('/idata3d/analysis'), // 网格描点
    getTypes: ax.get('/idata3d/analysis/{dataName}/_categories'), // 查询数据分类
    // 用户信息
    getUserInfo: ax.get('/idata3d/police_users/me'), // 获取用户信息
    postLogin: ax.postForm('/idata3d/login'), // 登录
    //qqmap
    getSerchGround: ax.get('http://41.246.116.161:10602/ws/place/v1/search'), //地点搜索
    getLatlng: ax.get('http://41.246.116.161:10602/ws/geocoder/v1'), //输入经纬度查询
    getAddress: ax.get('http://41.246.116.161:10602/ws/geocoder/v1'), //输入地址解析
    getIpConfig: ax.get('http://41.246.116.161:10602/ws/location/v1/ip'), //输入ip地址获取地址
    getList:ax.get('http://41.246.116.161:10602/ws/district/v1/list'),
    getLocation:ax.get('http://41.246.116.161:10602/ws/coord/v1/translate')//坐标转换


}