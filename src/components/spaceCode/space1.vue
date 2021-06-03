<template>
  <div class="map-space">
    <div class="left">
      <div class="li">
        <div class="label">
          搜索地理范围:
        </div>
        <div class="input">
          <el-input v-model="formData.boundary"
                    placeholder="指定地区名称，不扩大范围：boundary=region(北京,0)"> </el-input>
        </div>
      </div>
      <div class="li">
        <div class="label">
          每页条目数:
        </div>
        <div class="input">
          <el-input v-model="formData.page_size"
                    placeholder="每页条目数，最大限制为20条"> </el-input>
        </div>
      </div>
      <div class="li">
        <div class="label">
          页码:
        </div>
        <div class="input">
          <el-input v-model="formData.page_index"
                    placeholder="	第x页，默认第1页"> </el-input>
        </div>
      </div>
      <div class="li">
        <div class="label">
          搜索关键字:
        </div>
        <div class="input">
          <el-input v-model="formData.keyword"
                    placeholder="POI搜索关键字，keyword=酒店"> </el-input>
        </div>
      </div>
      <div class="li">
        <div class="label">
          周边搜索:
        </div>
        <div class="input">
          <el-input v-model="formData.orderby"
                    placeholder="支持按距离由近到远排序，取值：_distance"> </el-input>
        </div>
      </div>
      <div class="li">
        <div class="btnClick">
          <el-button type="primary"
                     @click="btnClick">运行</el-button>
          <el-button @click="removeMarker">清除</el-button>
        </div>
      </div>

    </div>
    <div class="right">
      <div id="container"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ax from '../../api/api'
export default {
  data () {
    return {
      url: 'https://apis.map.qq.com/ws/place/v1/search',
      formData: {
        boundary: 'region(台州,0)',
        page_size: '20',
        page_index: '1',
        keyword: '美食',
        orderby: '_distance',
      },
      map: null,
      markerLayer: null,
      dataPoints: [],
      infoWindow: null,
      markerArr: []
    }
  },
  watch: {
    'markerArr': {
      handler: function (val) {
        if (val.length == 0) {
          this.removeMap()
          this.init()
        }

      },
      deep: true
    }
  },
  methods: {
    //移除点位信息
    removeMarker () {
      this.markerArr = []
      this.markerLayer.remove()
    },
    //移除地图
    removeMap () {
      this.map.destroy()
    },
    btnClick () {
      
      ax.getSerchGround(this.formData).then((res) => {
        console.log(res);
        if (res && res.status === 0 && res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            var position = new TMap.LatLng(res.data[i].location.lat, res.data[i].location.lng);
            this.markerArr.push({
              position: position,
              properties: {
                title: res.data[i].title,
                address: res.data[i].address,
                tel: res.data[i].tel !== ' ' ? res.data[i].tel : '暂无'
              }
            });
          }
          this.initMarker()
          this.markerLayer.setGeometries(this.markerArr);
          this.map.setCenter(position)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    //地图初始化
    init () {
      var center = new TMap.LatLng(28.66361, 121.431878);//设置中心点坐标
      //初始化地图
      this.map = new TMap.Map(container, {
        zoom: 15, // 设置地图缩放级别
        center: center    // 设置地图中心
      });

    },
    initMarker () {
      //创建并初始化MultiMarker
      this.markerLayer = new TMap.MultiMarker({
        id: 'marker' + Math.random(),
        map: this.map,  //指定地图容器
        //点标记数据数组
        geometries: [],
      });
      this.infoWindow = new TMap.InfoWindow({
        map: this.map,
        position: this.map.getCenter(),
        offset: {   // 设置信息弹窗的偏移量，否则会和marker重合
          x: 0,
          y: -48
        }
      }).close();
      this.markerLayer.on('click', evt => {
        let content = `
          <div>
            <p>名称: ${evt.geometry.properties.title}</p>
            <p>地址: ${evt.geometry.properties.address}</p>
            <p>电话: ${evt.geometry.properties.tel}</p>
          </div>
        `
        this.infoWindow.open();
        this.infoWindow.setPosition(evt.geometry.position);  // 设置信息窗口的坐标
        this.infoWindow.setContent(content);   // 设置信息窗口的内容
      });
    }
  },
  mounted () {
    if (this.map != null) {
      this.removeMap()
    }
    this.init()
  }
}
</script>

<style scoped lang="less">
@import url("./spaceNo.less");
</style>