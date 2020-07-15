<template>
  <div class="c_container c_rela">
    <vue-particles
      :color="particles.color"
      :particleOpacity="particles.particleOpacity"
      :particlesNumber="particles.particlesNumber"
      :shapeType="particles.shapeType"
      :particleSize="particles.particleSize"
      :linesColor="particles.linesColor"
      :linesWidth="particles.linesWidth"
      :lineLinked="particles.lineLinked"
      :lineOpacity="particles.lineOpacity"
      :linesDistance="particles.linesDistance"
      :moveSpeed="particles.moveSpeed"
      :hoverEffect="particles.hoverEffect"
      :hoverMode="particles.hoverMode"
      :clickEffect="particles.clickEffect"
      :clickMode="particles.clickMode"
      class="lizi">
    </vue-particles>

    <div class="c_flex c_flex_center route c_no_pointer">
      <el-autocomplete
        class="inline-input c_all_pointer"
        v-model="val"
        size="large"
        clearable
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect">
        <el-button slot="append" @click.prevent="toUrl" icon="el-icon-right"></el-button>
      </el-autocomplete>
      <el-button v-show="!drawer.visible" class="particlesSet c_all_pointer" type="info" icon="el-icon-set-up" circle
                 @click="drawer.visible=!drawer.visible"></el-button>
    </div>

    <el-drawer
      class="c_auto"
      :title="drawer.title"
      :visible.sync="drawer.visible"
      :modal="drawer.modal"
      :size="drawer.size"
      :direction="drawer.direction">
      <el-form ref="form" class="c_auto" label-width="150px">
        <el-form-item label="粒子颜色">
          <el-color-picker v-model="particles.color" color-format="hex" size="mini"></el-color-picker>
        </el-form-item>
        <el-form-item label="粒子透明度">
          <el-input-number v-model="particles.particleOpacity" controls-position="right" :min="0" :max="1"
                           :precision="1" :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item label="粒子数量">
          <el-input-number v-model="particles.particlesNumber" controls-position="right" :min="0"
                           :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="粒子外观">
          <el-select v-model="particles.shapeType" placeholder="请选择">
            <el-option
              v-for="item in shapeTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单个粒子大小">
          <el-input-number v-model="particles.particleSize" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="线条颜色">
          <el-color-picker v-model="particles.linesColor" color-format="hex" size="mini"></el-color-picker>
        </el-form-item>
        <el-form-item label="线条宽度">
          <el-input-number v-model="particles.linesWidth" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="连接线是否可用">
          <el-switch
            v-model="particles.lineLinked">
          </el-switch>
        </el-form-item>
        <el-form-item label="线条透明度" v-show="particles.lineLinked">
          <el-input-number v-model="particles.lineOpacity" controls-position="right" :min="0" :max="1" :precision="1"
                           :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item label="线条距离" v-show="particles.lineLinked">
          <el-input-number v-model="particles.linesDistance" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="粒子运动速度">
          <el-input-number v-model="particles.moveSpeed" controls-position="right" :min="0" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="是否有hover特效">
          <el-switch
            v-model="particles.hoverEffect">
          </el-switch>
        </el-form-item>
        <el-form-item label="hover模式" v-show="particles.hoverEffect">
          <el-select v-model="particles.hoverMode" placeholder="请选择">
            <el-option
              v-for="item in hoverModeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有click特效">
          <el-switch
            v-model="particles.clickEffect">
          </el-switch>
        </el-form-item>
        <el-form-item label="click模式" v-show="particles.clickEffect">
          <el-select v-model="particles.clickMode" placeholder="请选择">
            <el-option
              v-for="item in clickModeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="cc">
          <button @click="opencc">cc模式</button>
        </el-form-item>

      </el-form>
    </el-drawer>

    <!--<model isShow="true">-->
    <!--<template slot="title">选择施工部位</template>-->
    <!--<template slot="main">-->
    <!--123-->
    <!--</template>-->
    <!--</model>-->
    <div id="abc">
    </div>

  </div>
</template>
<script>
export default {
  name: 'stack',
  components: {
    model: require('../components/c-model').default
  },
  // render: function (createElements) { // createElements 是一个 方法，调用它，能够把 指定的 组件模板，渲染为 html 结构
  // return createElements({template:'<model isShow="true"><template slot="title">选择施工部位</template><template slot="main">123</template></model>'})
  // },
  data () {
    return {
      val: '',
      urlObj: {},
      particles: {
        color: '#0C82A6', // String类型。默认'#dedede'。粒子颜色。
        particleOpacity: 0.7, // Number类型。默认。粒子透明度。
        particlesNumber: 80, // Number类型。默认80。粒子数量。
        shapeType: 'circle', // String类型。默认'circle'。可用的粒子外观类型有：'circle', 'edge', 'triangle', 'polygon', 'star'。
        particleSize: 8, // Number类型。默认80。单个粒子大小。
        linesColor: '#dedede', // String类型。默认'#dedede'。线条颜色。
        linesWidth: 1, // Number类型。默认1。线条宽度。
        lineLinked: true, // 布尔类型。默认true。连接线是否可用。
        lineOpacity: 0.4, // Number类型。默认0.4。线条透明度。
        linesDistance: 150, // Number类型。默认150。线条距离。
        moveSpeed: 3, // Number类型。默认3。粒子运动速度。
        hoverEffect: true, // 布尔类型。默认true。是否有hover特效。
        hoverMode: 'true', // String类型。默认true。可用的hover模式有:  // 'grab', 'repulse', 'bubble'。
        clickEffect: true, // 布尔类型。默认true。是否有click特效。
        clickMode: 'push'/// / String类型。默认true。 'push', 'remove', 'repulse', 'bubble'。
      },
      drawer: {
        visible: false,
        title: '设置',
        direction: 'rtl',
        modal: false,
        size: '30%'
      },
      shapeTypeOptions: [
        { value: 'circle', label: 'circle' },
        { value: 'edge', label: 'edge' },
        { value: 'triangle', label: 'triangle' },
        { value: 'polygon', label: 'polygon' },
        { value: 'star', label: 'star' }
      ],
      hoverModeOptions: [
        { value: 'grab', label: 'grab' },
        { value: 'repulse', label: 'repulse' },
        { value: 'bubble', label: 'bubble' }
      ],
      clickModeOptions: [
        { value: 'push', label: 'push' },
        { value: 'remove', label: 'remove' },
        { value: 'repulse', label: 'repulse' },
        { value: 'bubble', label: 'bubble' }
      ]
    }
  },
  mounted () {
    this.$util.log({ 'a': 1 })
  },
  computed: {},
  methods: {
    querySearch (queryString, cb) {
      var restaurants = this.loadAll()
      let time = 200 || 1000 * Math.random();
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : this.loadAll()
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, time)
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        { "value": "列表视图", "url": "./stackList" },
        { 'value': '地图', 'url': './mapg' },
        { 'value': '日历', 'url': './calendar' },
        { 'value': 'css', 'url': './css3' },
        { 'value': '二维码', 'url': './qrcode' },
        { 'value': '日记', 'url': './way' },
        { 'value': '写日记', 'url': './theway' },
        { 'value': 'threejs', 'url': './threeList' },
        { 'value': '技术文档', 'url': '' },
        { 'value': 'test', 'url': './testList' },
      ]
    },
    handleSelect (item) {
      this.urlObj = item;
      if (item.url) {
        this.$router.push(item.url)
      }else{
        this.$message("正在开发..")
      }
    },
    toUrl () {
      let obj = this.urlObj||{};
      if(obj.url){
        this.$router.push(obj.url);
        return;
      }
      let msg;
      obj.value ?  msg = "正在开发.." : this.val ? msg = '没有此功能' : msg = '请选择';
      this.$message(msg);

    },
    opencc(){
      this.$store.state.auth.cc = true
    }
  }
}
</script>
<style>
  .lizi {
    /*background: #dd765c;*/
    width: 100vw;
    height: 98vh;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
  }

  .route {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 70vh;
    z-index: 15;
  }

  .inline-input {
    width: 30vw;
  }

  .particlesSet {
    position: fixed;
    top: 30px;
    right: 30px;
  }

  .el-drawer__body {
    overflow: auto;
  }
</style>
