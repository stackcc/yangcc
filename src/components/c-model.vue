<template>
  <div>
    <div class="model_addr" v-show="isShow">
      <div class="model-bg" @click="saveClick"></div>
      <div class="model-body">
        <div class="model-header c_flex c_flex_between c_item_center">
          <div class="model-title"><slot name="title">城市地区选择</slot></div>
          <div class="model-cancel" @click="saveClick()">×</div>
        </div>
        <div class="model-choose">
          <slot name="main"></slot>
        </div>
        <div class="model-footer bg_blue c_white">
          <div class="model-title" @click="saveClick()">
            <slot name="foot">保  存</slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// <c-model @saveClick="saveTypeClick" :isShow="type_params.isShow">
//   <template slot="title">选择施工部位</template>
//   <template slot="main">
//   <mt-checklist
// v-model="type_arr"
// :options="typeList">
//   </mt-checklist>
//   </template>
//   </c-model>
// typeList:[{label: "厨房",value:"厨房"},]

export default {
  name: 'c-model',
  data () {
    return {
      // isShow: false,
    }
  },
  props: {
    'isShow': Boolean
  },
  mounted () {
  },
  methods: {
    modelClick: function () {
      // this.isShow = true;
    },

    saveClick: function (bool) {
      // this.$emit('saveClick', this);
    }
  },
  watch: {
    'isShow': function (val) {
      if (val) {
      }
    }
  }
}
</script>

<style scoped>
  /*.model_addr*/
  .model_addr {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 22;
    width: 100vw;
    height: 100vh;
  }

  .model-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 25;
  }

  .model_addr .model-body {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 30;
    width: 100%;
    height: 65vh;
    background: #fff;
  }

  .model_addr .model-header {
    height: 6vh;
    padding: 0 5vw;
    border-bottom: .5px solid #ccc;
    font-size: 15px;
  }

  .model_addr .model-hot-title {
    font-size: 12px;
    color: #878787;
    padding: 3vw;
  }

  .model_addr .model-hot-list {
    padding: 0 5vw;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 14px;
    flex-wrap: wrap;
  }

  .model_addr .model-hot-group.bg_red {
    color: #fff;
    background: #dc1f31;
  }

  .model_addr .model-hot-group {
    padding: 2vw 5vw;
    background: #f2f2f2;
    border-radius: 5vw;
    margin-bottom: 2vw;
    margin-right: 3vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-wrap: wrap;
  }

  .model_addr .model-choose-title {
    border-bottom: .5px solid #f2f2f2;
    box-sizing: border-box;
    width: 100%;
    padding: 0 5vw;
    font-size: 14px;
  }

  .model_addr .model-choose-title div.c_red {
    border-bottom: 1px solid #dc1f31;
    margin-bottom: 1px;
  }

  .model_addr .model-choose-title div {
    height: 8vw;
    max-width: 30vw;
    margin-right: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .model_addr .model-body,
  .model_addr .model-choose {
    display: flex;
    flex-direction: column;
  }

  .model_addr .model-choose {
    flex: 1;
    overflow: auto;
  }

  .model_addr .model-choose-list {
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    /*height: calc( 100% - 30vh);*/
    /*height: 38vh;*/
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .model_addr .model-choose-group {
    padding: 3vw 5vw;
    text-align: left;
  }
  .model_addr .model-footer {
        font-size: 15px;
        text-align: center;
        padding: 10px;
  }

  .bg-fcfcfc {
    background: #fcfcfc;
  }
</style>
