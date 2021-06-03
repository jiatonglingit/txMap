<template>
  <div class="controler">
    <component :is="mapViews" />
  </div>
</template>

<script>
  import space1 from './spaceCode/space1'
  import space2 from './spaceCode/space2'
  import space3 from './spaceCode/space3'
  import space4 from './spaceCode/space4'
  import space5 from './spaceCode/space5'
  import space6 from './spaceCode/space6'
  export default {
    components: {
      space1,
      space2,
      space3,
      space4,
      space5,
      space6
    },
    props: ['codeID'],
    data() {
      return {
        mapViews: 'space1',
        timer: null,
      }
    },
    watch: {
      'codeID': {
        handler: function (val) {
          this.toMapComp(val)
        },
        deep: true
      }
    },
    mounted() {},
    methods: {
      toMapComp(key) {
        switch (key) {
          case 1:
            this.mapViews = 'space1'
            break;
          case 2:
            this.mapViews = 'space2'
            break;
          case 3:
            this.mapViews = 'space3'
            break;
          case 4:
            this.mapViews = 'space4'
            break;
          case 5:
            this.mapViews = 'space5'
            break;
          case 6:
            this.mapViews = 'space6'
            break;
          case 7:
            this.$router.push({
              path: '/index'
            })
            break;
          default:
            break;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .controler {
    width: 100%;
    height: 100%;
    // background: rosybrown;
  }
</style>