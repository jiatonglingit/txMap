<template>
  <div>
    <component :is="mapViews"
               :styleID="styleId" />
  </div>
</template>

<script>
import maps1 from './mapComponents/maps1'
import maps2 from './mapComponents/maps2'
import maps3 from './mapComponents/maps3'
import maps4 from './mapComponents/maps4'
import maps5 from './mapComponents/maps5'
import maps6 from './mapComponents/maps6'
import maps7 from './mapComponents/maps7'
import maps8 from './mapComponents/maps8'
import maps9 from './mapComponents/maps9'
import maps101 from './mapComponents/maps101'
export default {
  components: {
    maps1,
    maps2,
    maps3,
    maps4,
    maps5,
    maps6,
    maps7,
    maps8,
    maps9,
    maps101,
  },
  data () {
    return {
      mapViews: 'maps1',
      timer: null,
      styleId: 1
    }
  },
  watch: {
    '$store.state.styleId': {
      handler: function (val) {
        this.styleId = val
        console.log(this.styleId);
      },
      deep: true
    }
  },
  mounted () {
    this.timer = window.setInterval(() => {
      this.toMapComp(this.$store.state.indexViews)
      this.styleId = this.$store.state.styleId
    }, 1000)
  },
  methods: {
    toMapComp (key) {
      switch (key) {
        case 1:
          this.mapViews = 'maps1'
          break;
        case 2:
          this.mapViews = 'maps2'
          break;
        case 3:
          this.mapViews = 'maps3'
          break;
        case 4:
          this.mapViews = 'maps4'
          break;
        case 5:
          this.mapViews = 'maps5'
          break;
        case 6:
          this.mapViews = 'maps6'
          break;
        case 7:
          this.mapViews = 'maps7'
          break;
        case 8:
          this.mapViews = 'maps8'
          break;
        case 9:
          this.mapViews = 'maps9'
          break;
        case 10:
          this.mapViews = 'maps101'
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
