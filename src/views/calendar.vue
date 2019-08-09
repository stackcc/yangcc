<template>
  <div class="c_container">
    <el-container>
      <!--<el-header>-->

      <!--</el-header>-->
      <el-main>
        <el-calendar v-model="value">
        </el-calendar>
      </el-main>
      <!--<el-footer>-->
<!---->
      <!--</el-footer>-->
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'calendar',
    data(){
      return {
        value : new Date()
      }
    },

  }
</script>

<style scoped>

</style>
