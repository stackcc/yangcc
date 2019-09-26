<template>
  <div class="c_container">
      <div v-show="lock" class="start c_w c_h c_flex c_flex_center">
        <transition>
          <el-button :icon="icon" class="bg_black" size="medium" circle @click="onIconClick"></el-button>
        </transition>
      </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  components: {

  },
  data () {
    return {
      bg_attribute: "background-image: url('/static/9.jpg');",
      icon: 'el-icon-lock',
      lock: false
    }
  },
  mounted () {
    this.lock = this.$store.state.auth.index.lock
  },
  methods: {
    ontouchstart: function (e) {
      console.log(e)
    },
    ontouchmove: function (e) {
      console.log(e)
    },
    onIconClick () {
      this.icon = 'el-icon-unlock'
      this.lock = false
      this.$store.state.auth.index.lock = false
      this.$store.state.auth.home.viewShow = true
    }
  },
  computed: {
    imgUrl () {
    }
  },
  watch: {

  }
}
</script>
<style scope>
  .start{
    width: 100%;
    height: 100vh;
    z-index: 100;
  }
  .start button{
    width: 200px;
    height: 200px;
    background: rgba(0,0,0,.6);
    font-size: 90px;
    border: 0;
  }
  .start button:focus,
  .start button:hover{
    background: rgba(0,0,0,.6);
  }
</style>
