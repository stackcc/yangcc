<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--<router-link to="/home">Home</router-link> |-->
    <!--<router-link to="/about">About</router-link>|-->
    <!--<router-link to="/">index</router-link>-->
    <transition name="el-fade-in-linear">
      <div class="menu">
        <el-button @click="onMenuToggle" class="menu-toogle" :type="homeViewShow?'info':'primary'" :icon="homeViewShow?'el-icon-arrow-up':'el-icon-arrow-down'" circle></el-button>
        <div v-show="homeViewShow" style="width: 100%;height: 60px;"></div>
        <el-menu v-show="homeViewShow" :default-active="activeIndex" class="menu-group" mode="horizontal" @select="onMenuSelect"
                 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <template v-for="(item,i) in menu">
            <template v-if="item.child">
              <el-submenu :index="''+(i+1)">
                <template slot="title">{{item.name}}</template>
                <template v-for="(subitem,si) in item.child">
                  <el-menu-item :index="(i+1)+'-'+(si+1)">{{subitem.name}}</el-menu-item>
                </template>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="''+(i+1)">{{item.name}}</el-menu-item>
            </template>
          </template>
        </el-menu>
      </div>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      viewShow: true,
      activeIndex: '',
      menu: null
    }
  },
  mounted () {
    this.menu = this.$setup.home.menu
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    onMenuSelect (i) {
      if (!i) { return }
      var in_1, in_2, path
      if (i.indexOf('-') > -1) {
        in_1 = Number(i.split('-')[0]) - 1
        in_2 = Number(i.split('-')[1]) - 1
        path = this.menu[in_1].child[in_2].path
      } else {
        in_1 = Number(i) - 1
        path = this.menu[in_1].path
      }
      this.$router.push(path)
    },
    handleScroll () {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 变量windowHeight是可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight // 变量scrollHeight是滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // if(scrollHeight>100){
      //   this.$store.state.auth.home.viewShow = false;
      // }else if(scrollHeight<80){
      //   this.$store.state.auth.home.viewShow = true;
      // }
    },
    onMenuToggle () {
      // this.homeViewShow=!this.homeViewShow;
      this.$store.state.auth.home.viewShow = !this.homeViewShow
    }
  },
  computed: {
    homeViewShow () {
      return this.$store.state.auth.home.viewShow
    }
  },
  watch: {}
}
</script>
<style scope>
  .menu .menu-group{
    border: 0 !important;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
  }
  .menu-toogle {
    position: fixed;
    top: 10px;
    right: 15px;
    font-size: 32px;
    z-index: 60;
  }
</style>
