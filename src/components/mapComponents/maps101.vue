<template>
  <div class="map-pic" ref="map">
    <div id="container"></div>
  </div>

</template>

<script>
  import ax from "../../api/api";
  import Styles1 from '../../assets/styleJson/style1.json'
  import Styles2 from '../../assets/styleJson/style2.json'
  import Styles3 from '../../assets/styleJson/style3.json'
  export default {
    props: ['styleID', "name", 'colus', 'gridSize'],
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
        styleNo: -1
      }
    },
    watch: {
      styleID: {
        handler: function (val) {
          this.styleNo = val
          console.log(val);
           this.setMapStyle(val)

        },
        deep: true
      }
    },
    mounted() {
      this.initMap();
      this.setPoints()
    },

    methods: {
      //设置背景颜色
      setMapStyle(index) {
        switch (index) {
          case 1:
            this.map.setMapStyleConfig({
              style: Styles1.data
            });
            break;
          case 2:
            this.map.setMapStyleConfig({
              style: Styles2.data
            });
            break;
          case 3:
            this.map.setMapStyleConfig({
              style: Styles3.data
            });
            break;
          default:
            break;
        }
      },
      initMap() {
        console.log(this.styleID)
        // 创建地图初始化
        let info = {
          center: new TMap.LatLng(28.66361, 121.431878),
          // center: new TMap.LatLng(40.038515, 116.272185),//地图显示中心点
          showControl: false, //是否显示地图上控件
          zoom: 12, //设置地图缩放级别
        }
        this.map = new TMap.Map('container', info);
        this.setMapStyle(this.styleID)

      },
      initPolygon() {
        //初始化polygon
        // this.polygon = new TMap.MultiPolyline({
        this.polygon = new TMap.MultiPolygon({
          id: 'polygon-layer' + Date.now() + Math.random(), //图层id
          map: this.map, //显示多边形图层的底图
          styles: { //多边形的相关样式
            'polygon': new TMap.PolygonStyle({
              'color': '#FF0000', //面填充色  
              // 'borderDashArray': [100, 100],
              'showBorder': true, //是否显示拔起面的边线
              // 'borderWidth': 10,
              'borderColor': '#FF0000' //边线颜色
            })
          },
          geometries: [{
            // id: 'polygon-layer' + Date.now() + Math.random(),//多边形图形数据的标志信息
            'styleId': 'polygon', //样式id
            'paths': this.dataPoints, //多边形的位置信息
          }]
        });
      },
      // 创建矩形点位
      setPoints() {
        let info = {
          dataName: "alarm",
          gridSize: "grid_500",
          categories: [{
            title: "刑事案件"
          }],
          overlayMethod: 'UNION'
        }
        ax.getAnalys(info).then((res) => {
          console.log(res);
          var resultArray = []
          let gridOptions = res.grids.splice(1, 100)
          for (let j = 0; j < gridOptions.length; j++) {
            let tempAObj = gridOptions[j]['geoJson'].coordinates[0]
            var tempArray = []
            // console.log(tempAObj);
            for (let a = 0; a < tempAObj.length - 1; a++) {
              let nodeV = tempAObj[a]
              tempArray.push(new TMap.LatLng(nodeV[1], nodeV[0]))
            }
            // this.dataPoints.push(tempArray)
            this.initPolygon(this.dataPoints.push(tempArray));
          }
          console.log(resultArray);
        })

      },
    }
  }
</script>

<style scoped lang="less">
  @import url("../tree/tree.less");
  @import url("./mapsNo.less");
</style>