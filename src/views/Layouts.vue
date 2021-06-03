<template>
  <div class="layout">
    <div class="nav-top">
      <v-NavArr></v-NavArr>
    </div>
    <div class="content">
      <div id="left">
        <div class="card"
             v-for="item in leftcardList"
             :key="item.id"
             @click="cardListSelect_left(item.id)"
             :class="active_left == item.id ? 'addclassTemp' : ''">
          {{item.name}}
        </div>
      </div>
      <div>
        <router-view></router-view>
      </div>
      <div id="right">

        <div class="card"
             v-for="item in rightcardList"
             :key="item.id"
             @click="cardListSelect_right(item.id)"
             :class="active_right == item.id ? 'addclassTemp_right' : ''">
          {{item.name}}
        </div>
        <div class="card_down"
             v-for="(item,index) in card_downList"
             :key="index"
             @click="card_downClick(item.id)"
             :class="card_down == item.id ? 'addclassTemp_right' : ''">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavArr from "../components/NavArr";
export default {
  name: "layout",
  components: {
    "v-NavArr": NavArr
  },
  data () {
    return {
      active_left: 1,
      leftcardList: [
        { id: 1, name: '单色散点图' },
        { id: 2, name: '分类散点图' },
        { id: 3, name: '2D网格图' },
        { id: 4, name: '3D网格图' },
        { id: 5, name: '2D热力图' },
        { id: 6, name: '3D热力图' },
        { id: 7, name: '2D蜂窝热力图' },
        { id: 8, name: '3D蜂窝热力图' },
        { id: 9, name: '天气散点图' },
        { id: 10, name: '覆盖物矩形图' },
      ],
      active_right: 1,
      rightcardList: [
        { id: 1, name: '黑色背景' },
        { id: 2, name: '亮白背景' },
        { id: 3, name: '烟黄背景' },
      ],
      card_down: 0,
      card_downList: [
        { id: 1, name: '地理编码' }
      ]
    };
  },
  methods: {
    cardListSelect_left (index) {
      this.active_left = index
      this.$store.dispatch('set_Muttion', index)
    },
    cardListSelect_right (index) {
      this.active_right = index
      this.$store.dispatch('set_MuttionId', index)
    },
    //地理编码btn
    card_downClick (index) {
      this.card_down = index
      this.$router.push('/spaceCode')
    }
  },
  mounted () {
    this.$store.dispatch('set_Muttion', this.active_left)
    this.$store.dispatch('set_MuttionId', this.active_right)

  }
};
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;
  .nav-top {
    width: 100%;
    height: 10%;
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    #left {
      width: 500px;
      height: 70%;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 10px 20px;
      .card {
        width: 40%;
        height: 10%;
        margin-left: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        font-family: "Courier New", Courier, monospace;
        font-weight: 400;
        color: whitesmoke;
        background: url("../assets/images/title-box.png");
        background-size: 100% 100%;
        opacity: 1;
        transition: 1s;
        cursor: pointer;
      }
      .addclassTemp {
        opacity: 1;
        color: #07e6ed;
        border: 1px solid #07e6ed;
        border-radius: 30px;
        box-shadow: 0px 0px 40px 0px rgba(0, 229, 255, 0.3);
        // background: linear-gradient(to left, #ace, #f96);
        // transition: 2s;
      }
    }
    #right {
      width: 500px;
      height: 28%;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 10px 20px;
      .card,
      .card_down {
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
        background: url("../assets/images/title-box.png");
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
  }
}
</style>
