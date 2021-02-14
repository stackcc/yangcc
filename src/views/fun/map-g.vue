<template>
  <el-container>
    <!--<el-header>-->

    <!--</el-header>-->
    <!--<el-main>-->
      <div class="map c_w c_h" :class="homeViewShow?'map-auto':'map-100'">
        <el-amap :vid="'amap-vue'" :amap-manager="amapManager" :zoom="zoom" :events="events">

        </el-amap>
      </div>
    <!--</el-main>-->
    <!--<el-footer>-->

    <!--</el-footer>-->
  </el-container>
</template>

<script>
import { AMapManager } from 'vue-amap'
export default {
  name: 'mapg',
  data () {
    return {
      homeViewShow: true,
      amapManager: AMapManager,
      zoom: 12,
      center: [121.59996, 31.197646],
      events: {

      },
      plugin: [
        'ToolBar',
        {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init (o) {
              console.log(o)
            }
          }
        }
      ],
      defaultCursor: "cursors",
      rotateEnable: true, // 地图是否可旋转，默认false
      resizeEnable: true // 是否监控地图容器尺寸变化，默认false
    }
  },
  methods: {
    getMap () {
      // amap vue component
      console.log(amapManager._componentMap)
      // gaode map instance
      console.log(amapManager._map)
    }
  },
  watch: {
    '$store.state.auth.home.viewShow': function () {
      this.homeViewShow = this.$store.state.auth.home.viewShow
    }
  }
}
</script>

<style scoped>
.map-100{
  width: 100vw;
  height: 100vh;
}
.map-auto{
  width: 100vw;
  /*height: calc( 100vh - 60px );*/
}
</style>
