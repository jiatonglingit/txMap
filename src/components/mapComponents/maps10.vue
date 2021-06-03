<template>
  <div class="map-pic" ref="map">
    <div id="container"></div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        //传递给map中的绘制点数据
        pointList: [{
            gridPoints: [
              [121.5155486, 28.50613413],
              [121.5200452, 28.50613413],
              [121.5200452, 28.51063074],
              [121.5155486, 28.51063074]
            ]
          },
          {
            gridPoints: [
              [121.2592418, 28.46116802],
              [121.2637384, 28.46116802],
              [121.2637384, 28.46566463],
              [121.2592418, 28.46566463]
            ]
          },
          {
            gridPoints: [
              [121.2502486, 28.54660362],
              [121.2547452, 28.54660362],
              [121.2547452, 28.55110023],
              [121.2502486, 28.55110023]
            ]
          },
          {
            gridPoints: [
              [121.4840723, 28.55110023],
              [121.4885689, 28.55110023],
              [121.4885689, 28.55559684],
              [121.4840723, 28.55559684]
            ]
          },
          {
            gridPoints: [
              [121.326691, 28.59156972],
              [121.3311876, 28.59156972],
              [121.3311876, 28.59606633],
              [121.326691, 28.59606633]
            ]
          },
          {
            gridPoints: [
              [121.4570927, 28.45667141],
              [121.4615893, 28.45667141],
              [121.4615893, 28.46116802],
              [121.4570927, 28.46116802]
            ]
          },
          {
            gridPoints: [
              [121.5200452, 28.38472565],
              [121.5245418, 28.38472565],
              [121.5245418, 28.38922226],
              [121.5200452, 28.38922226]
            ]
          },
          {
            gridPoints: [
              [120.9040096, 28.89284261],
              [120.9085062, 28.89284261],
              [120.9085062, 28.89733922],
              [120.9040096, 28.89733922]
            ]
          },
          {
            gridPoints: [
              [121.1783028, 28.78942057],
              [121.1827994, 28.78942057],
              [121.1827994, 28.79391718],
              [121.1783028, 28.79391718]
            ]
          }
        ],
        dataPoints: [],
        map: null,
        polygon: null,

      }
    },
    watch: {

    },
    mounted() {
      this.initMap();
      this.setPoints()
    },

    methods: {
      initMap() {
        // 创建地图初始化
        let info = {
          center: new TMap.LatLng(28.66361, 121.431878),
          // center: new TMap.LatLng(40.038515, 116.272185),//地图显示中心点
          showControl: false, //是否显示地图上控件
          zoom: 12, //设置地图缩放级别
          mapStyleId: 'style1'
        }
        this.map = new TMap.Map('container', info);
        // console.log(this.dataPoints);
      },
      testObj(one, two) {
        this.one = one
        this.two = two
      },
      initPolygon() {
        //初始化polygon
        // this.polygon = new TMap.MultiPolyline({
        this.polygon = new TMap.MultiPolygon({
          id: 'polygon-layer' + Date.now() + Math.random(), //图层id
          map: this.map, //显示多边形图层的底图
          // styles: { //多边形的相关样式
          //   'polygon': new TMap.PolygonStyle({
          //     'color': '#FF0000', //面填充色  
          //     // 'borderDashArray': [100, 100],
          //     // 'showBorder': true, //是否显示拔起面的边线
          //     'borderWidth': 10,
          //     'borderColor': '#FF0000' //边线颜色
          //   })
          // },
          // geometries: [
          //   {
          //     // id: 'polygon-layer' + Date.now() + Math.random(),//多边形图形数据的标志信息
          //     'styleId': 'polygon', //样式id
          //     'paths': this.dataPoints, //多边形的位置信息
          //   }
          // ]
        });

        this.polygon.setStyles({
          'polygon': new TMap.PolygonStyle({
            'color': '#FF0000', //面填充色  
            'showBorder': true, //是否显示拔起面的边线
            // 'borderWidth': 1,
            'borderColor': '#FF0000' //边线颜色 
          })
        });
        // console.log(this.dataPoints[0]);
        var _this = this
        this.polygon.setGeometries([{
          styleId: 'polygon', //样式id
          paths: this.dataPoints,
          // 'rainbowPaths': [{
          //   path: this.dataPoints[0],
          //   color: '#FF0000',
          //   borderColor: '#FF0000',
          // }]
        }])
      },
      // 创建矩形点位
      setPoints() {
        var testJson = {
          pointList: [{
            gridPoints: [
              [121.341431, 28.573797],
              [121.342328, 28.573795],
              [121.342328, 28.574694],
              [121.34143, 28.574696],
              [121.341431, 28.573797]
            ]
          }]
        }
        var array = []
        var obj = testJson["pointList"]
        var length = obj.length
        for (var i = 0; i < length; i++) {
          var item = obj[i]
          for (var key in item) {
            var tempA = item[key]
            var tempB = []
            for (var j = 0; j < tempA.length; j++) {
              var point = tempA[j]
              // tempB.push(this.testObj(point[0], point[1]))
              tempB.push(new TMap.LatLng(point[1], point[0]))
              // console.log(tempB);
            }
            this.dataPoints.push(tempB)
            console.log(tempB);
            this.initPolygon();
          }
        }
        // console.log(this.pointList);
        // var array = []
        // var obj = this.pointList
        // for (var i = 0; i < obj.length; i++) {
        //   var item = obj[i]
        //   for (var key in item) {
        //     var tempA = item[key]
        //     console.log(tempA);
        //     for (var j = 0; j < tempA.length; j++) {
        //       var point = tempA[j]
        //       // var tempB = []
        //       // tempB.push(new TMap.LatLng(point[1], point[0]))
        //     }
        //     console.log(tempB);
        //     this.dataPoints.push(tempB)
        //     this.initPolygon();
        //   }
        // }
      },
    }
  }
</script>

<style scoped lang="less">
  @import url("../tree/tree.less");
  @import url("./mapsNo.less");
</style>