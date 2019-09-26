<template>
  <div class="c_container c_rela">
    <div class="c_flex c_box c_flex_col c_p_n">
      <div class="c_flex c_m_b_n c_flex_between ">
        <div class="c_white" v-highlight v-html="obj.content"></div>
        <div id="codeView" v-highlight>
          <pre><code v-html="obj.content"></code></pre>
        </div>
      </div>
      <!--<mavon-editor class="c_flex_1 c_auto"  :value="obj.content" :subfield="true" :toolbarsFlag="false" :editable="false" :ishljs="true"/>-->
    </div>
  </div>
</template>
<script>
  import marked from 'marked'
  export default {
    name: 'theway',
    components: {},
    data () {
      return {
        obj: {
          title: '',
          description: '',
          content: '',
        },

        arr: [
          { name: '标题', isshow: true, key: 'title', placeholder: '请输入标题', icon: 'el-icon-collection', tips: '' },
          { name: '地址', isshow: false, key: 'url', placeholder: '请输入地址', icon: 'el-icon-paperclip', tips: '' },
          {
            name: '描述',
            isshow: true,
            key: 'description',
            placeholder: '请输入描述',
            icon: 'el-icon-collection-tag',
            tips: '用 ，号分割，可做为关键字'
          },
        ],
        menu: [],
        template: [],

      }
    }
    ,
    mounted (e) {
      var id = this.$route.query.id;
      if(id){
        this.getWay(id);
      }
    },
    computed: {},
    methods: {
      getContent (value, html) {
        //markdown
        console.log(value)
        //html
        console.log(html)
      },
      commit () {
        let that = this
        // this.$ajax.post(this.$api.thewayAdd, {
        //   title: this.obj.title,
        //   description: this.obj.description,
        //   content: this.content,
        //   userid:1,
        //   username:'cc',
        // }, function (res) {
        //   that.$util.log(res)
        // })
      },
      getWay (id) {
        let that = this
        this.$ajax.get(this.$api.thewayList, {
          auth:'cc',
          id:id
        }, function (res) {
          that.obj = res[0];
          that.obj.content = marked(res[0].content);
        })
      },
    }
  }
</script>
<style lang="sass" rel="stylesheet/sass" scoped>

</style>
