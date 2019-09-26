<template>
  <div class="part-imgshow" v-show="ispart_imgshow" @click="imgshow_close">
    <div class="part-imgshow-bg"></div>
    <div class="part-imgshow-content">
      <img :src="imgshow_url" alt="">
    </div>
  </div>
</template>

<script>
  // <c-imgshow @part_close="part_close" :ispart_imgshow="ispart_imgshow" :imgshow_url="imgshow_url">
  //   </c-imgshow>

  export default {
    name: "c-imgshow",
    data: function(){
      return {
        imgshow_url: '' ,
        ispart_imgshow: false,
      }
    },
    props: {
      imgshow_url: String ,
      ispart_imgshow: Boolean,
    },
    mounted:function(){
      this.imgshow_url = this.imgshow_url;
      this.ispart_imgshow = this.ispart_imgshow;
    },
    methods: {
      imgshow_close: function () {
        this.$emit('part_close',false);
      },
    }
  };
</script>

<style scoped>

</style>
