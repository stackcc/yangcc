<template>
  <div class="c_container c_rela">
    <div class="cuboidBox">
      <div class="cuboidFace frontFace">
        <img class="mold2_img"
             src="http://flyclient.heywoodsminiprogram.com/albumImages/matrix/detail/1/moldImg.png"
             mode="widthFix"/>
      </div>
      <div class="cuboidFace backFace"><img class="mold2_img"
                                            src="http://flyclient.heywoodsminiprogram.com/albumImages/matrix/detail/1/moldImg.png"
                                            mode="widthFix"/></div>
      <div class="cuboidFace leftFace"><img class="mold2_img"
                                            src="http://flyclient.heywoodsminiprogram.com/albumImages/matrix/detail/1/moldImg.png"
                                            mode="widthFix"/></div>
      <div class="cuboidFace rightFace"><img class="mold2_img"
                                             src="http://flyclient.heywoodsminiprogram.com/albumImages/matrix/detail/1/moldImg.png"
                                             mode="widthFix"/></div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'stack',
    components: {},
    data () {
      return {
        val: '',
        urlObj: {},

      }
    },
    mounted () {
      this.$util.log()
    },
    computed: {},
    methods: {
      querySearch (queryString, cb) {
        var restaurants = this.loadAll()
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : this.loadAll()
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 2000 * Math.random())
      },
      createStateFilter (queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      loadAll () {
        return [
          // { "value": "css", "url": "./css3" },
          { 'value': '地图', 'url': './mapg' },
          { 'value': '日历', 'url': './calendar' },
        ]
      },
      handleSelect (item) {
        this.urlObj = item
      },
      toUrl () {
        if (this.urlObj && this.urlObj.url) {
          this.$router.push(this.urlObj.url)
        }
      },
    }
  }
</script>
<style type="text/css"  scoped>
  .cuboidBox {
    width: 100%;
    height: 86%;
    position: absolute;
    transform: translate3d(0, -1000px, 0);
    transform-style: preserve-3d;
    animation: cuboidInDown 2s 2s linear forwards, rotateCuboid 12s 4s linear forwards infinite;
  }
  .cuboidFace {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5;
    width: 600px;
    height: 100%;

  }
  .mold2_img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .frontFace {
    transform: translateZ(300px);
  }

  .backFace {
    transform: rotateX(0deg) translateZ(-300px) scale(-1, 1);
  }

  .leftFace {
    transform: rotateY(-90deg) translateZ(300px);
  }

  .rightFace {
    transform: rotateY(90deg) translateZ(300px);
  }

  @keyframes cuboidInDown {
    0% {
      top: 10%;
      transform: translate3d(0, -1000px, 0) rotateY(30deg) scale(.6);
    }
    100% {
      top: 10%;
      transform: translate3d(0, 0, 0) rotateY(0deg) scale(.6);
    }
  }

  @keyframes rotateCuboid {
    0% {
      top: 10%;
      transform: rotateX(6deg) rotateY(0deg) scale(.6);
    }
    50% {
      top: 10%;
      transform: rotateX(6deg) rotateY(180deg) scale(1);
    }
    100% {
      top: 10%;
      transform: rotateX(6deg) rotateY(360deg) scale(.6);
    }
  }
</style>
