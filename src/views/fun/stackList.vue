<template>
  <div class="">
      <div class="list c_flex c_flex_center">
        <template v-for="(item,i) in list">
          <div class="item c_flex c_flex_center" :key="i" @click="toDetail(item)">
            <div>
            {{item.name||'案例'+(i+1)}}
              <div class="c_gray c_m_t_n c_center">{{item.tips}}</div>
            </div>
          </div>
        </template>
      </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        list:[],
      }
    },
    mounted(){
      this.data = this.loadAll();
    },
    methods:{
      toDetail(item){
        let {url} = item;
        if(!url){
          this.$message("正在研发");
          return;
        }
        this.$router.push(url)
      },
      loadAll () {
        return [
          { "value": "功能搜索", "url": "./stack" },
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
    },
  }
</script>
<style scoped>
  .list{
    padding:100px;
    flex-wrap: wrap;
  }
  .item{
    width: 200px;
    height: 150px;
    border: 1px solid #C2C2C2;
    margin:0 20px 20px 0;
    background: #fff;
    border-radius: 15px;
  }
</style>
