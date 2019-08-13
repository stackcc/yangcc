<template>
  <div class="c_container">
    <div class="c_container_body">
      <el-main class="c_flex">
        <!--<el-input v-model="val"></el-input>-->
        <el-button class="c_c" circle type="success" size="medium">日历</el-button>
        <el-button circle type="success">日历</el-button>
      </el-main>
    </div>
  </div>
</template>
<script>
  export default {
    name:'stack',
    components:{

    },
    data(){
      return {
        val:''
      }
    },
    mounted(){
      this.$util.log();
    },
    computed:{
    },
    methods:{

    }
  }
</script>
<style>

</style>
