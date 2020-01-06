<template>
  <div class="c_container c_rela">
    <div class="c_box c_p_n">
      <div class="c_p_n c_flex  c_item_center">
        <div class="c_m_r_n">
          <el-avatar :size="60" src="https://empty">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
        </div>
        <div class="">
          <div class="c_size_30 c_bold c_white">
            {{info.name}}
            <text class="c_gray_drak">({{list.length||0}})</text>
          </div>
        </div>
      </div>
      <div class="c_p_n list">
        <div class="group c_rela" v-for="(item,i) in list" :key="i" :data-id="item.id"  @click="wayDetail">
          <div class="c_size_26 c_m_b_n">{{item.title}}</div>
          <div class="c_size_16 c_m_b_n c_blue">{{item.description}}</div>
          <div class="c_size_18 c_m_b_n c_eee c_box_3">{{item.content}}</div>
          <div class="c_size_14 c_eee">{{item.createtime}}</div>
          <div class="opera c_animate c_flex c_item_center">
            <div class="edit c_blue c_size_18 c_m_l_10 c_pointer" @click.prevent.stop="editWay" :data-id="item.id" v-show="info.id==item.userid">
              <i class="el-icon-edit"></i>
            </div>
            <div class="del c_red c_size_18 c_m_l_10 c_pointer" @click.prevent.stop="delWay" :data-id="item.id" :data-i="i">
              <i class="el-icon-delete"></i>
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
          id: 1,
        },
        list: [
          {
            title:'萨尔王',
            description:'成熟度好人as服务卡乐芙螺蛳粉',
            content:'师大会把我比武我航次大雾Hi好wish的接口减为空你借口'
          }
        ],
      }
    },
    mounted () {
      // this.getWay();
    },
    computed: {},
    methods: {
      getWay () {
        let that = this
        this.$ajax.get(this.$api.thewayList, {

        }, function (res) {
          that.list = res;
        })
      },
      delWay (e) {
        let that = this;
        var id = e.currentTarget.dataset.id;
        var i = Number(e.currentTarget.dataset.i);
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.del(id,i);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      },
      del(id,i){
        let that = this;
        this.$ajax.post(this.$api.deltheway, {
          id:id
        }, function (res) {
          var arr = that.list;
          arr.splice(i,1);
          that.list = arr;
        });
      },
      editWay (e) {
        let that = this;
        var id = e.currentTarget.dataset.id;
        this.$router.push('./theway?id='+id);
      },
      wayDetail (e) {
        let that = this;
        var id = e.currentTarget.dataset.id;
        this.$router.push('./waydetail?id='+id);
      },
    }
  }
</script>
<style lang="css"  scoped>
  .c_container{
    width: 960px;
    margin: auto;
  }
  .list{

  }
  .group{
    background: rgba(245, 245, 245, 0.3);
    margin-top: 15px;
    border-radius: 5px;
    padding: 30px;
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
</style>
