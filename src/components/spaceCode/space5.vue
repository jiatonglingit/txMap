<template>
  <div class="map-space">
    <div class="left">
      <div class="li">
        <div class="label">
          选择地区:
        </div>
        <div class="input">
          <el-cascader placeholder="请选择区域"
                       class="TemBot address"
                       size="large"
                       :options="AddressOptions"
                       v-model.trim="options"
                       @change="handleChange"
                       ref="selectedOptions">
          </el-cascader>
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
import { regionData, CodeToText } from "element-china-area-data";
export default {
  data () {
    return {
      AddressOptions: regionData, //区域选择
      options: [],
      key: 'TKTBZ-XPTKJ-FM3F4-FZOCS-7NFPS-XCB2A',
      addressValue: [],
      map: null,
      markerLayer: null,
      dataPoints: [],
      infoWindow: null,
      markerArr: [],
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
    //面板地区选择
    handleChange () {
      this.addressValue = ''
      for (let i = 0; i < this.options.length; i++) {
        this.addressValue += CodeToText[this.options[i]];
      }
      console.log(this.addressValue);
    },
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
      let info = {
        address: this.addressValue,
      }
      ax.getAddress(info).then((res) => {
        // console.log(res);
        for (var key in res) {
          var position = new TMap.LatLng(res.result.location.lat, res.result.location.lng);
          this.markerArr.push({
            position: position,
            properties: {
              title: res.result.title,
              address: res.result.address_components.province + "" + res.result.address_components.city + "" + res.result.address_components.district,
            }
          });
        }
        this.initMarker()
        this.markerLayer.setGeometries(this.markerArr);
        this.map.setCenter(position)
      }).catch((error) => {
        console.log(error);
      })
    },
    //地图初始化
    init () {
      var center = new TMap.LatLng(28.66361, 121.431878);//设置中心点坐标
      //初始化地图
      this.map = new TMap.Map(container, {
        zoom: 10, // 设置地图缩放级别
        center: center    // 设置地图中心
      });
    },
    initMarker () {
      //创建并初始化MultiMarker
      this.markerLayer = new TMap.MultiMarker({
        id: 'marker',
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
          </div>
        `
        this.infoWindow.open();
        this.infoWindow.setPosition(evt.geometry.position);  // 设置信息窗口的坐标
        this.infoWindow.setContent(content);   // 设置信息窗口的内容
      });
    }
  },
  mounted () {
     ax.getList().then((res) => {
      console.log(res)
        
      }).catch((error) => {
        console.log(error);
      })

    if (this.map != null) {
      this.removeMap()
    }
    this.init()
  }
}
</script>

<style scoped lang="less">
@import url("./spaceNo.less");
.TemBot {
  width: 100%;
  /deep/.el-date-editor .el-range__icon {
    line-height: 27px;
  }
}
</style>