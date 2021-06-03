<template>
  <div class="map-space">
    <div class="left">
      <div class="li">
        <div class="btnClick">
          <el-button type="primary" @click="btnClick">运行</el-button>
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
  import ax from '../../api/api'
  import points_Json from '../../assets/location.json'
  export default {
    data() {
      return {
        map: null,
        markerLayer: null,
        dataPoints: [],
        infoWindow: null,
        markerArr: [],
        locatOptions: ''
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
      removeMarker() {
        this.markerArr = []
        this.markerLayer.remove()
      },
      //移除地图
      removeMap() {
        this.map.destroy()
      },
      getLoactions() {
        var arr = []
        this.locatOptions = ""
        let pData = points_Json.RECORDS.splice(0, 29)
        for (let j = 0; j < pData.length; j++) {
          let str = pData[j].lat + "," + pData[j].lng
          arr.push(str)
        }
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          // console.log(i)
          //  console.log(arr.length)
          if (i === arr.length - 1) {
            console.log("相等")
            this.locatOptions += arr[i]
          } else {
            this.locatOptions += arr[i] + ";"
          }

        }
        console.log(this.locatOptions)
      },
      btnClick() {
        this.getLoactions()
        let info = {
          locations: this.locatOptions,
          from_type: 5,
          to_type: 1
        }
        ax.getLocation(info).then((res) => {
          console.log(res)
          for (let i = 0; i < res.locations.length; i++) {
            var position = new TMap.LatLng(res.locations[i].lat, res.locations[i].lng);
            let str = res.locations[i].lat + "," + res.locations[i].lng
            let info1 = {
              location: str,
              get_poi: 0
            }
            ax.getLatlng(info1).then((res) => {
              console.log(res);
              for (var key in res) {
                var position = new TMap.LatLng(res.result.location.lat, res.result.location.lng);
                this.markerArr.push({
                  position: position,
                  properties: {
                    title: res.result.formatted_addresses.recommend,
                    address: res.result.address
                  }
                });
              }
              this.initMarker()
              this.markerLayer.setGeometries(this.markerArr);
            })
            // this.markerArr.push({
            //   position: position,
            // });
            // this.initMarker()
            // this.markerLayer.setGeometries(this.markerArr);
          }
        }).catch((error) => {
          console.log(error);
        })
      },
      //地图初始化
      init() {
        var center = new TMap.LatLng(28.66361, 121.431878); //设置中心点坐标
        //初始化地图
        this.map = new TMap.Map(container, {
          zoom: 15, // 设置地图缩放级别
          center: center // 设置地图中心
        });

      },
      initMarker() {
        //创建并初始化MultiMarker
        this.markerLayer = new TMap.MultiMarker({
          id: 'marker' + Math.random(),
          map: this.map, //指定地图容器
          //点标记数据数组
          geometries: [],
        });
        this.infoWindow = new TMap.InfoWindow({
          map: this.map,
          position: this.map.getCenter(),
          offset: { // 设置信息弹窗的偏移量，否则会和marker重合
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
          this.infoWindow.setPosition(evt.geometry.position); // 设置信息窗口的坐标
          this.infoWindow.setContent(content); // 设置信息窗口的内容
        });
      }
    },
    mounted() {
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