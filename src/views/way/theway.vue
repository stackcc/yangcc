<template>
  <div class="c_container c_rela">
    <div class="c_flex c_box c_flex_col c_p_n c_hidden c_h_100">
      <div class="c_flex c_m_b_n c_flex_between">
        <div class="c_flex">
          <div class="group c_flex c_item_center c_m_r_n c_white" v-for="(item,i) in arr" :key="i" v-show="item.isshow">
            <div class="group-title">
              {{item.name}}：
            </div>
            <div class="group-content c_m_r_n">
              <el-tooltip class="item" effect="dark" :content="item.tips" placement="bottom">
                <el-input
                  size="small"
                  :placeholder="item.placeholder"
                  :suffix-icon="item.icon||''"
                  v-model="obj[item.key]">
                </el-input>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="c_flex c_item_center">
          <el-button type="primary" class="" @click="commit">保存</el-button>
          <el-button type="info">取消</el-button>
        </div>
      </div>
      <!--<mavon-editor class="c_flex_1 c_auto" :toolbars="toolbars" :defaultOpen="defaultOpen" v-model="content" :ishljs="true"/>-->
      <mavon-editor class="c_flex_1 c_auto" :defaultOpen="defaultOpen" v-model="content" @change="getContent"
                    :ishljs="true"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'theway',
  components: {},
  data () {
    return {
      id: '',
      obj: {
        title: '',
        description: ''
      },
      content: '',

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
        }
      ],
      menu: [],
      template: [],

      defaultOpen: 'preview', // edit
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: true, // 标记
        superscript: true, // 上角标
        quote: true, // 引用
        ol: true, // 有序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        help: true, // 帮助
        code: true, // code
        subfield: true, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        /* 1.3.5 */
        undo: true, // 上一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true // 导航目录
      }
    }
  },
  mounted (e) {
    this.menu = this.$util.deepCopy(this.$setup.theway.menu)
    this.template = this.$util.deepCopy(this.$setup.theway.template)
    var id = this.$route.query.id
    if (id) {
      this.id = id
      this.getWay(id)
    }
  },
  computed: {},
  methods: {
    getContent (value, html) {
      // markdown
      console.log(value)
      // html
      console.log(html)
    },
    commit () {
      let that = this
      let id = this.id
      let url = id ? this.$api.thewayEdit : this.$api.thewayAdd
      var params = {
        title: this.obj.title,
        description: this.obj.description,
        content: this.content

      }
      id ? params.id = id : (
        params.userid = 1,
        params.username = 'cc',
        params.createtime = (new Date()).toLocaleString('chinese', { hour12: false })
      )
      this.$ajax.post(url, params, function (res) {
        that.$util.log(res)
      })
    },
    getWay (id) {
      let that = this
      this.$ajax.get(this.$api.thewayList, {
        id: id
      }, function (res) {
        that.obj = res[0]
        that.content = res[0].content
      })
    }
  }
}
</script>
<style lang="sass" rel="stylesheet/sass" scoped>

</style>
