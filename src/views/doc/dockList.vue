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
        list:[
          {name:'档案一',tips:'',url:'',img:'',},
          {name:'档案二',tips:'',url:'',img:'',},
          {name:'档案三',tips:'',url:'',img:'',},
        ],
      }
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
