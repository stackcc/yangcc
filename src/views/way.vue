<template>
  <div class="c_container c_rela c_h  ">
    <!--<div class="c_box c_p_n">-->
      <!--<div class="c_p_n c_flex  c_item_center">-->
        <!--<div class="c_m_r_n">-->
          <!--<el-avatar :size="60" src="https://empty">-->
            <!--<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png"/>-->
          <!--</el-avatar>-->
        <!--</div>-->
        <!--<div class="">-->
          <!--<div class="c_size_30 c_bold c_white">-->
            <!--{{info.name}}-->
            <!--<text class="c_gray_drak">({{list.length||0}})</text>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="c_p_n list">-->
        <!--<div class="group c_rela" v-for="(item,i) in list" :key="i">-->
          <!--<div class="c_size_26 c_m_b_n" :data-id="item.id"  @click.stop="wayDetail">{{item.title}}</div>-->
          <!--<div class="c_size_16 c_m_b_n c_blue">{{item.description}}</div>-->
          <!--<div class="c_size_18 c_m_b_n c_eee c_box_3">{{item.content}}</div>-->
          <!--<div class="c_size_14 c_eee">{{item.createtime}}</div>-->
          <!--<div class="opera c_animate c_flex c_item_center">-->
            <!--<div class="edit c_blue c_size_18 c_m_l_10 c_pointer" @click.prevent.stop="editWay" :data-id="item.id" v-show="info.id==item.userid">-->
              <!--<i class="el-icon-edit"></i>-->
            <!--</div>-->
            <!--<div class="del c_red c_size_18 c_m_l_10 c_pointer" @click.prevent.stop="delWay" :data-id="item.id" :data-i="i">-->
              <!--<i class="el-icon-delete"></i>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

    <!--</div>-->

    <div class="page c_flex c_flex_col c_w c_h">
      <div class="header c_center" :class="auth.header.fix?'fix':''">
        <div class="avatar">
          <img src="image/91.jpg" />
        </div>
        <div class="name c_size_20" :class="auth.header.fix?'c_flex_1 c_left c_m_l_n':'c_m_b_n'">
          {{info.name||'五哥'}} <span class="c_blue c_size_13">({{list.length||'0'}})</span>
        </div>
      </div>
      <div class="body  c_auto_y c_flex_1">
        <div class="c_p_n list">
          <div class="group c_rela" v-for="(item,i) in list" :key="i">
            <div class="tag-date c_rela c_size_13">{{item.createtime}}</div>
            <div class="title c_size_16 c_m_t_n c_pointer" :data-id="item.id"  @click.stop="wayDetail">{{item.title}}</div>
            <div class="img c_size_13 c_m_t_20 " v-if="item.img">
              <img :src="item.img" alt="">
            </div>
            <div class="c_size_13 c_m_t_20 ">{{item.memo}}</div>
            <!--<div class="c_size_14 c_eee">{{item.createtime}}</div>-->
            <div class="opera c_animate c_flex c_item_center">
              <div class="edit c_blue c_size_18 c_m_l_10 c_pointer" @click.prevent.stop="editWay" :data-id="item.id" v-show="info.id==item.userid">
                <i class="el-icon-edit"></i>
              </div>
              <div class="del c_red c_size_18 c_m_l_10 c_pointer" @click.prevent.stop="delWay" :data-id="item.id" v-show="info.id==item.userid" :data-i="i">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
export default {
  name: 'theway',
  components: {},
  data () {
    return {
      info: {
        name: 'cc',
        num: '99+',
        id: 1
      },
      list: [
        {
          title: '萨尔王',
          createtime: (new Date()).toLocaleDateString(),
          description: '成熟度好人as服务卡乐芙螺蛳粉',
          memo: '师大会把我比武我航次大雾Hi好wish的接口减为空你借口',
        },
      ],
      auth:{
        header:{
          fix:true
        }
      },
    }
  },
  mounted () {
    // this.getWay();
    let arr = this.list;
    this.list.push(...arr);
    this.list.push(...arr);
    this.list.push(...arr);
    this.list.push(...arr);
    // window.addEventListener('scroll', this.handleScroll, true);
  },
  computed: {},
  methods: {
    getWay () {
      let that = this
      this.$ajax.get(this.$api.thewayList, {

      }, function (res) {
        that.list = res
      })
    },
    delWay (e) {
      let that = this
      var id = e.currentTarget.dataset.id;
      if(!id){
        this.$message({
          type: 'error',
          message: '删除失败，请重试！'
        })
        return;
      }
      var i = Number(e.currentTarget.dataset.i)
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(id, i)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    del (id, i) {
      let that = this
      this.$ajax.post(this.$api.deltheway, {
        id: id
      }, function (res) {
        var arr = that.list
        arr.splice(i, 1)
        that.list = arr
      })
    },
    editWay (e) {
      let that = this
      var id = e.currentTarget.dataset.id;
      if(!id){
        this.$message({
          type: 'warn',
          message: '尝试编辑失败，请重试！'
        })
        return;
      }
      this.$router.push('./theway?id=' + id)
    },
    wayDetail (e) {
      let that = this
      var id = e.currentTarget.dataset.id;
      if(!id){
        this.$message({
          type: 'warn',
          message: '信息不完整,请重试！'
        })
        return;
      }
      this.$router.push('./waydetail?id=' + id)
    },

    handleScroll(){
      // var scrollT = window.pageYOffset ||
      //   document.documentElement.scrollTop ||
      //   document.body.scrollTop; //兼容不同的浏览器
      // if(scrollT>175){
      //   this.auth.header.fix = true;
      // }else if(scrollT < 50){
      //   this.auth.header.fix = false;
      // }
    },
  }
}
</script>
<style lang="css"  scoped>
  .c_container{
    /*width: 700px;*/
    width: 100%;
    height: 100%;
    margin: auto;
    /*background: rgba(245, 245, 245, 0.3);*/
  }
  .list{

  }
  .group{
    /*background: rgba(245, 245, 245, 0.3);*/
    margin-top: 15px;
    border-radius: 5px;
    padding:0 30px 30px;
  }
  .opera{
    position: absolute;
    right: 15px;
    top: 15px;
    opacity: 0;
  }
  .group:hover .opera{
    opacity: 1;
  }

  /*//==========2*/
  ::-webkit-scrollbar{
    width: 0;
    height: 0;
    color: transparent;
  }
  .page{
    width: 700px;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    margin: auto;
  }
  .header{
    /*height: 200px;*/
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: rgba(245, 245, 245, 0.3);
    border-radius: 5px;
  }
  .header .avatar{
    width: 100px;
    height: 100px;
    overflow: hidden;
    margin: auto;
  }
  .header .avatar img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
  }
  .header .name{
    font-size: 20px;
    font-weight: 400;
    padding: 0 10px;
    letter-spacing: 3px;
    display: inline-block;
    color: #dfd1ab;
    margin-top: 15px;
  }
  .header.fix{
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .header.fix .name{
    margin-top:0px;
  }
  .header.fix .avatar{
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin: auto;
  }
  .header.fix .avatar img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
  }

  .body{
    background: rgba(245, 245, 245, 0.3);
    border-radius: 5px;
    margin-top: 15px;
  }
  .group:not(:last-child):before{
    content:'';
    display:block;
    position: absolute;
    top: 20px;
    left: 1px;
    height: 101%;
    width: 2px;
    background: #ccc;
  }
  .group:after{
    content: '';
    display: block;
    position: absolute;
    top: 6px;
    left: -5px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 3px solid #ccc;
    background: #eee;
  }
  .tag-date{
    display: inline-block;
    padding: 5px 13px 5px 10px;
    background: #f7f3ee;
    height: 16px;
  }
  .tag-date:after{
    content:'';
    position: absolute;
    left: -26px;
    top: 0px;
    border-right: 13px solid #f7f3ee;
    border-top: 13px dashed rgba(0,0,0,0);
    border-bottom: 13px dashed rgba(0,0,0,0);
    border-left: 13px dashed rgba(0,0,0,0);
    width: 0;
    height: 0;
    line-height: 0;
  }
  .tag-date:hover{
    background: #41c7ff;
    color: #fff;
    /*transform: translateX(-10px);*/
  }
  .tag-date:hover:after{
    border-right-color: #41c7ff;
  }

  .group .title:hover{
    text-decoration: underline;
  }
  .group .img{
    width: 200px;
    height: 100px;
  }

</style>
