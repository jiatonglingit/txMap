<template>
  <div class="warp">
    <div id="container"></div>
    <div id="info">
    </div>
  </div>
</template>

<script>
import ax from "../../api/api";
export default {
  props: ['styleID', "name", 'colus', 'gridSize'],
  data () {
    return {
      //传递给map中的绘制点数据
      pointList: [
        {
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
      styleNo: 1,
    }
  },
  watch: {
    styleID: {
      handler: function (val) {
        this.styleNo = val
        // console.log(this.styleId);
        this.deleteMap()
        this.init()
      },
      deep: true
    }
  },
  mounted () {
    this.styleNo = this.styleID
    let info = {
      dataName: "poi",
      gridSize: "grid_500",
      categories: [
        {
          title: "商务住宅"
        }
      ],
      overlayMethod: 'UNION'
    }
    ax.getAnalys(info).then((res) => {
      let gridOptions = res.grids.splice(1, 500)
      for (let j = 0; j < gridOptions.length; j++) {
        let lists = { lat: gridOptions[j].centrePointLat, lng: gridOptions[j].centrePointLng, styleId: 'redCircle' }
        this.dataPoints.push(lists)
      }
      this.init();
    })
  },
  methods: {
    setStyles (name) {
      return {
        type: "image", //设置图片
        width: 24, //宽度
        height: 24, //高度
        anchor: { x: 14, y: 38 },//图片锚点位置
        src: `https://mapapi.qq.com/web/lbs/visualizationApi/demo/img/${name}.png` //图片样式属性
      }
    },
    init () {
      var center = new TMap.LatLng(34.27083595165, 106.4794921875)
      //初始化地图
      this.map = new TMap.Map("container", {
        zoom: 4,//设置地图缩放级别
        center: center,//设置地图中心点坐标
        mapStyleId: 'style' + this.styleNo.toString()//个性化地图样式设置
      });
      //初始化散点图并添加至map图层
      var dot = new TMap.visualization.Dot({
        styles: {
          baoxue: this.setStyles('baoxue'),
          qin: this.setStyles('qin'),
          mai: this.setStyles('mai'),
          xiaoyu: this.setStyles('xiaoyu'),
          yin: this.setStyles('yin'),
          leizhenyu: this.setStyles('leizhenyu'),
          yujiaxue: this.setStyles('yujiaxue'),
          wu: this.setStyles('wu'),
          xue: this.setStyles('xue'),
          duoyun: this.setStyles('duoyun'),
        }

      }).addTo(this.map);

      dot.setData(weatherDotData);//设置数据
    },
    //	销毁图层对象。
    deleteMap () {
      this.map.destroy()
    },
  }
}
</script>

<style scoped lang="less">
.warp {
  // position: relative;
  #container {
    // position: absolute;
    width: 880px;
    height: 780px;
  }
  // #info {
  //   display: none;
  //   position: absolute;
  //   left: 30px;
  //   top: 30px;
  //   background: #fff;
  //   border-radius: 5px;
  //   padding: 10px;
  // }
}
</style>