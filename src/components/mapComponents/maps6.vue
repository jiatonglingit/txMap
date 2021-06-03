<template>
  <div class="map-pic"
       ref="map">
    <div id="container"></div>
    <div class="map-lists">
      <div class="map-img"
           v-for="(item, index) in listes"
           :key="index"
           @click="choicePic(index, item)">
        <img :src="index === mapNum ? (item.isShow ? item.img1 : item.img) : item.img"
             :alt="item.name"
             :title="item.name">
      </div>
    </div>
    <div class="tree-listes"
         :style="{left: left + 'px'}"
         v-show="treeShow">
      <span class="tishi"
            v-show="treeData.length == 0">暂无数据</span>
      <leaf-tree checkStrictly
                 checkable
                 v-model="checkedKeys"
                 :expandedKeys="expandedKeys"
                 :autoExpandParent="autoExpandParent"
                 @expand="onExpand"
                 @select="onSelect"
                 @check="onCheck"
                 :treeData="treeData"></leaf-tree>
    </div>
    <div class="btn-lists">
      <div class="zindex">
        <span class="first"
              v-if="btnList.length != 0">所选图层：</span>
        <span v-for="(item, index) in btnList"
              :key="index"
              class="tag">{{ item }}</span>
        <!-- <el-tag v-for="(item, index) in btnList" :key="index" type="success">{{ item }}</el-tag> -->
      </div>
      <div class="gridsize">
        <span class="first">网格大小：</span>
        <span>500米</span>
      </div>
      <div class="time-list">
        <div class="start">
          <span class="first">开始时间：</span>
          <span>{{ tttt }}</span>
        </div>
        <div class="end">
          <span class="first">结束时间：</span>
          <span>{{ ends }}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import ax from "../../api/api";
import LeafTree from '../tree/LeafTree'
import dataFromater from '../../utils/dateFormate.js'

import {
  checkTreeNode,
  getLeafCheckedKeys,
  getDataByCheckedKeys,
} from "../tree/LeafTreeUtil";
export default {
  components: {
    LeafTree,
  },
  props: ['styleID', "name", 'colus', 'gridSize'],
  data () {
    return {
      //传递给map中的绘制点数据
      dataPoints: [],
      map: null,
      heat: null,
      listes: [
        {
          img: require("../../assets/images/map/alarm.png"),
          img1: require("../../assets/images/map/alarm_select.png"),
          name: "警情",
          isShow: false,
          value: 'alarm'
        },
        {
          img: require("../../assets/images/map/POI.png"),
          img1: require("../../assets/images/map/POI_select.png"),
          name: "POI",
          isShow: false,
          value: 'poi'
        },
        {
          img: require("../../assets/images/map/people.png"),
          img1: require("../../assets/images/map/people_select.png"),
          name: "前科人员",
          isShow: false,
          value: 'previous_conviction'
        },
        {
          img: require("../../assets/images/map/sense.png"),
          img1: require("../../assets/images/map/sense_select.png"),
          name: "智感设备",
          isShow: false,
          value: 'sensor'
        },
      ],
      mapNum: null,
      left: 10,
      treeShow: false,
      treeData: [],
      checkedKeys: {
        checked: [],
        halfChecked: [],
      },
      expandedKeys: [],
      autoExpandParent: true,
      item: {
        coverage: '',
        gridSize: 'grid_100'
      },
      btnList: ["刑事案件"],
      timer: null,
      timeValue: [],
      startTime: '',
      endTime: '',
      styleNo: 1,
    }
  },

  watch: {
    styleID: {
      handler: function (val) {
        this.styleNo = val
        // console.log(this.styleId);
        this.deleteMap()
        this.getPoints()
      },
      deep: true
    }
  },
  mounted () {
    this.styleNo = this.styleID
    this.timer = window.setInterval(() => {
      this.timeValue = dataFromater.getDates([])
      this.startTime = this.timeValue[0]
      this.endTime = this.timeValue[1]
    }, 1000)
    this.checkedKeys = {
      checked: ["0-0"],
      halfChecked: []
    }
    this.getPoints()
  },
  computed: {
    tttt () {
      return this.startTime
    },
    ends () {
      return this.endTime
    }
  },
  methods: {
    init () {
      // 创建地图
      // console.log(typeof ());
      var center = new TMap.LatLng(28.66361, 121.431878);
      let info = {
        zoom: 9,//设置地图缩放级别
        pitch: 45, // 设置地图俯仰角
        center: center,//设置地图中心点坐标
        viewMode: '3D',//地图视图模式，支持2D和3D，默认为3D。2D模式下不可对地图进行拖拽旋转，pitch和rotation始终保持为0
        showControl: false,//是否显示地图上控件
        mapStyleId: 'style' + this.styleNo.toString()//个性化地图样式设置
      }
      this.map = new TMap.Map('container', info);
    },
    //默认获取points事件
    getPoints () {
      let info = {
        dataName: "alarm",
        gridSize: "grid_500",
        categories: [
          {
            title: "刑事案件"
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
        this.setPoints(this.dataPoints)
      })
    },
    // 删除覆盖物
    deletePoints () {
      this.dataPoints = []
      this.heat.remove()
    },
    //	销毁图层对象。
    deleteMap () {
      this.map.destroy()
    },
    // 创建散点图
    setPoints (data) {
      this.heat = new TMap.visualization.Heat({
        max: 10, // 热力最强阈值
        min: 0, // 热力最弱阈值
        height: 40, // 峰值高度
        radius: 30 // 最大辐射半径
      }).addTo(this.map);

      this.heat.setData(data);//设置数据
    },
    // 选择列表
    choicePic (num, value) {
      this.mapNum = num;
      switch (num) {
        case 0:
          // this.checkedKeys = {
          //   checked: ["0-0"],
          //   halfChecked: []
          // }
          break;
        default:
          this.checkedKeys = {
            checked: [],
            halfChecked: []
          }
          break;
      }
      if (!value.isShow) {
        for (let i = 0; i < this.listes.length; i++) {
          if (i === num) {
            this.listes[i].isShow = true
          } else {
            this.listes[i].isShow = false
          }
        }
        this.treeData = []
        ax.getTypes(undefined, { pathVariables: { dataName: value.value } }).then((res) => {
          this.treeData = res
          this.item.coverage = value.value
        })
      } else {
        value.isShow = false
        this.treeData = []
      }
      if (value.isShow) {
        this.treeShow = true
      } else {
        this.treeShow = false
      }
      if (num === 0) {
        this.left = 10
      } else {
        this.left = 60 * num + 10
      }
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onSelect (selectedKeys, info) {
      // this.checkedKeys = {
      //   checked: [],
      //   halfChecked: [],
      // }
      const selectedKey = info.node.eventKey;
      const isChecked = this.checkedKeys.checked.includes(selectedKey);
      const isHalfChecked = this.checkedKeys.halfChecked.includes(selectedKey);
      let _checkedKeys = [];
      if (isChecked) {

        console.log('111')
        _checkedKeys = this.checkedKeys.checked.filter(
          it => it !== selectedKey
        );
      } else {

        console.log('222')
        _checkedKeys = [...this.checkedKeys.checked, selectedKey];
      }
      const { checkedKeys, halfCheckedKeys } = checkTreeNode({
        eventKey: selectedKey,
        checked: !isChecked,
        halfChecked: isHalfChecked,
        checkedKeys: _checkedKeys,
        halfCheckedKeys: this.checkedKeys.halfChecked
      });
      this.checkedKeys = {
        checked: checkedKeys,
        halfChecked: halfCheckedKeys
      };
      /*构造值，然后调用*/
      this.onCheck(this.checkedKeys, info);
    },
    onCheck (checkedKeys, e) {
      // console.log("我选择了");
      this.checkedKeys = {
        checked: [],
        halfChecked: [],
      }
      let leafCheckedKeys = getLeafCheckedKeys(checkedKeys.checked);
      // 根据 key 取所有原始数据
      const data = getDataByCheckedKeys(leafCheckedKeys, this.treeData);
      this.btnList = []
      for (let kk of data) {
        if (kk.children) {
          // this.btnList.push()
          for (let kd of kk.children) {
            this.btnList.push(kk.title + '-' + kd.title)
          }
        } else {
          this.btnList.push(kk.title)
        }
      }
      // console.log(this.btnList, 'this.btnlist')
      this.checkedKeys = checkedKeys;
      this.gridNode = data
      let info = {
        dataName: this.item.coverage,
        // gridSize: this.item.gridSize,
        gridSize: 'grid_500',
        beginDate: this.item.beginDate,
        endDate: this.item.endDate,
        categories: data,
        overlayMethod: 'UNION'
      }
      if (e.checked) {
        this.isMap ? this.deletePoints() : this.deletePoints()
        ax.getAnalys(info).then((res) => {
          console.log(res);
          let gridOptions = res.grids.splice(1, 500)
          for (let j = 0; j < gridOptions.length; j++) {
            let lists = { lat: gridOptions[j].centrePointLat, lng: gridOptions[j].centrePointLng, styleId: 'redCircle' }
            this.dataPoints.push(lists)
          }
          this.setPoints(this.dataPoints)
        })
      } else {
        if (this.isMap) {
          this.deletePoints()
        } else {
          this.deletePoints()
        }
      }

    },

  }
}
</script>

<style scoped lang="less">
@import url("../tree/tree.less");
@import url("./mapsNo.less");
</style>