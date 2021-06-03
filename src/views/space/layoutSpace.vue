<template>
  <div class="layout">
    <div class="nav-top">
      <v-NavArr></v-NavArr>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavArr from "../../components/NavArr";
export default {
  components: {
    'v-NavArr': NavArr
  }
};
</script>

<style scoped lang="less">
.layout {
  width: 1920px;
  height: 1080px;
  .nav-top {
    width: 1920px;
    height: 10%;
    // border: 1px solid red;
  }
  .content {
    width: 100%;
    height: 100%;
    // border: 1px solid red;
  }
}
</style>
