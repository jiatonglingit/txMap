<template>
  <div class="content">
    <div class="top">
      <div class="card"
           v-for="item in cardList"
           :key="item.id"
           @click="cardListSelect(item.id)"
           :class="active == item.id ? 'addclassTemp_right' : ''">
        {{item.name}}
      </div>

    </div>
    <div class="down">
      <spaceCode :codeID="active" />
    </div>
  </div>
</template>

<script>
import spaceCode from '../../components/txMapSpace'
export default {
  components: {
    spaceCode
  },
  data () {
    return {
      active: 1,
      cardList: [
        { id: 1, name: '地点搜索' },
        { id: 2, name: '逆地理解析' },
        { id: 3, name: '地址解析' },
        { id: 4, name: 'ip定位' },
        { id: 5, name: '行政区划' },
        { id: 6, name: '坐标转换' },
        { id: 7, name: '地图类型测试' },
      ]
    }
  },
  methods: {
    cardListSelect (index) {
      this.active = index
    },
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    height: 10%;
    border: 1px solid whitesmoke;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .card {
      width: 200px;
      height: 75px;
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-family: "Courier New", Courier, monospace;
      font-weight: 400;
      color: whitesmoke;
      background: url("../../assets/images/title-box.png");
      background-size: 100% 100%;
      opacity: 1;
      transition: 1s;
      cursor: pointer;
    }
    .addclassTemp_right {
      opacity: 1;
      color: #07e6ed;
      border: 1px solid #07e6ed;
      border-radius: 30px;
      box-shadow: 0px 0px 40px 0px rgba(0, 229, 255, 0.3);
    }
  }
  .down {
    width: 100%;
    height: 90%;
    // border: 1px solid red;
  }
}
</style>
