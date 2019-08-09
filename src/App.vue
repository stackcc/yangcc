<template>
  <div id="app">
    <div class="c_container">
      <div class="c_container_bg" :style="bg_attribute">
      <!--<img :src="img" class="img_bg " alt="" />-->
      </div>
      <div class="c_container_body">
        <!--<div id="nav">-->
          <!--<transition name="fade">-->
            <!--<router-view></router-view>-->
          <!--</transition>-->
        <!--</div>-->
        <transition :name="transitionName">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'app',
    data () {
      return {
        bg_attribute:"background-image: url('/image/9.jpg');",
        transitionName:'slide-bottom'
      }
    },
    methods:{
      ontouchmove(e){
        console.log(e);
      }
    },
    watch:{
      $route(a,b){
        console.log(a,b)
      }
    },
    beforeRouteUpdate (to, from, next) {
      console.log(to,from)
    }
  }
</script>
<style>
  @import "./assets/comm/comm.css";

  body,html{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  /*页面过渡 -- left */
  .slide-left {
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #fff
  }
  .slide-left-enter,.slide-left-leave-to {
    left: 0;
    top: 0;
    right: 0;
    position: absolute;
    transform: translateX(-500px) translateY(-500px) rotate(-150deg) scale(.5);
    opacity: 0
  }
  .slide-left-enter-active {
    background-color: #fff;
    transition: all .6s ease
  }
  .slide-left-leave-active {
    transition: all .7s ease;
    background-color: #fff;
    transform: translateX(500px) translateY(500px) rotate(150deg) scale(1);
    z-index: 100
  }
  /*过渡 -- top */
  .slide-top {
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #fff
  }
  .slide-top-enter,.slide-top-leave-to {
    left: 0;
    top: 0;
    right: 0;
    position: absolute;
    transform: translateY(-500px) scale(.5);
    opacity: 1
  }
  .slide-top-enter-active {
    background-color: #fff;
    transition: all .6s ease
  }
  .slide-top-leave-active {
    transition: all .7s ease;
    background-color: #fff;
    transform: translateY(500px) scale(1);
    z-index: 100
  }
  /*过渡 -- bottom */
  .slide-bottom {
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #fff
  }
  .slide-bottom-enter,.slide-bottom-leave-to {
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    transform: translateY(500px) scale(.5);
    opacity: 0
  }
  .slide-bottom-enter-active {
    background-color: #fff;
    transition: all .6s ease
  }
  .slide-bottom-leave-active {
    transition: all .7s ease;
    background-color: #fff;
    transform: translateY(-500px) scale(1);
    z-index: 100
  }

</style>
