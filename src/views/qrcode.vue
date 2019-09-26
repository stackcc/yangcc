<template>
  <div class="c_container c_rela">
    <div class="route c_flex c_flex_center ">
      <div class="">
        <div class="c_flex c_flex_center ">
          <el-input
            class="inline-input "
            v-model="message"
            size="large"
            placeholder="请输入内容">
            <el-button slot="append" @click.prevent="toGenerate" icon="el-icon-aim"></el-button>
          </el-input>
        </div>
        <div class="c_flex c_flex_center c_m_n">
          <canvas id="msg"></canvas>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import QRCode from 'qrcode'
export default {
  name: 'qrcode',
  components: {},
  data () {
    return {
      message: ''

    }
  },
  mounted () {
    var message = this.$route.query.url
    if (message) {
      this.message = message
    }
    this.$util.log(message)
  },
  computed: {},
  methods: {
    toGenerate () {
      var val = this.message
      var msg = document.getElementById('msg')
      // 将获取到的数据（val）画到msg（canvas）上
      QRCode.toCanvas(msg, val, function (error) {
        console.log(error)
      })
    }
  },
  watch: {
    // 通过监听获取数据
    message (val) {
      this.toGenerate()
    }
  }
}
</script>
<style type="text/css"  scoped>
  #msg{
    width:300px;
    height:300px;
  }
  .route {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 80vh;
    z-index: 15;
  }

  .inline-input {
    width: 30vw;
  }
  .particlesSet{
    position: fixed;
    top: 30px;
    right: 30px;
  }
  .el-drawer__body{
    overflow: auto;
  }
</style>
