<template>
  <div class="c_container">
    <el-main>
      <div style="width: 100%;box-sizing:border-box;text-align: center;font-size: 23px;font-weight:bold;padding: 15px;">
        物料审核
      </div>
      <div style="width: 65vw;margin: auto;">
      <el-table
        stripe
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        max-height="500"
        :header-cell-style="{background:'#d7d9dd',color:'#606266'}"
        :cell-style="{background:'#eef1f6',color:'#606266'}"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange">
        <template slot="empty">
          <div class="c_gray">暂无数据</div>
        </template>
        <el-table-column
          fixed
          disabled
          align="center"
          type="selection"
          :selectable="selectable">
        </el-table-column>

        <el-table-column type="expand">
          <template slot-scope="props">
            <!--<el-form label-position="left" class="demo-table-expand">-->
              <!--<el-form-item label="当日累计分货">-->
                <!--<span>{{ props.row.distributionnumber_t }}</span>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="欠需求">-->
                <!--<span>{{ props.row.littleneed }}</span>-->
              <!--</el-form-item>-->
            <!--</el-form>-->
                <el-table size="mini" class="bg_red" :data="props.row.detail" border>
                  <el-table-column align="center" label="省份" prop="province"></el-table-column>
                  <el-table-column align="center" label="数量" prop="distributionnumber"></el-table-column>
                  <el-table-column align="center" label="欠需求" prop="littleneed"></el-table-column>
                  <el-table-column align="center" label="当日累计分货" prop="distributionnumber_t"></el-table-column>
                </el-table>
          </template>
        </el-table-column>

        <el-table-column
          v-for="(item,i) in arr"
          :key="i"
          align="center"
          sortable
          :label="item.name"
          :prop="item.value">
          <template slot-scope="scope">{{ scope.row[item.value] }}</template>
        </el-table-column>

      </el-table>
      </div>
      <div style="width: 65vw;margin: auto;padding-top: 20px;text-align: center;">
        <div class="c_p_10 c_left c_black c_size_16"> 审批建议: </div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入审批建议"
          v-model="msg">
        </el-input>
      </div>
      <div style="margin-top: 20px;text-align: center;">
        <el-button type="primary" @click="confirmClick">审批通过</el-button>
        <el-button type="default" @click="cancelClick">驳回</el-button>
        <el-button type="default" @click="checkClick">全选/取消</el-button>
        <!--<el-button type="default" @click="uncheckClick">取消全选</el-button>-->
      </div>
    </el-main>
  </div>
</template>

<script>
var jsondata = require('../../static/json/test.json')
export default {
  name: 'table',
  data () {
    return {
      url: 'http://127.0.0.1/service/OnlineApproveServlet?approve=Y',
      arr: [
        // { 'name': '物料主键', 'value': 'pk_material' },
        { 'name': '机型', 'value': 'invName' },
        { 'name': '分货数量', 'value': 'distributionnumber' },
        { 'name': '欠需求', 'value': 'littleneed' },
        { 'name': '当日累计分货', 'value': 'distributionnumber_t' },
        { 'name': '分销数量', 'value': 'retailnumber' },
        { 'name': '核心厅店数量', 'value': 'heartnumber' },
        { 'name': '直供数量', 'value': 'bigchainnumber' }
        // { 'name': '室主任','value': 'director '},
        // { 'name': '批次号', 'value': 'bitch' },
        // { 'name': '锁定', 'value': 'islock' },
        // { 'name': '省份', 'value': 'province'},
        // { 'name': '数量', 'value': 'number' }
      ],
      tableData: [],
      multipleSelection: [],
      role: '',
      userid: '',
      msg: ''
    }
  },
  mounted () {
    // this.tableData = jsondata
    this.role = this.$route.query.role || ''
    this.userid = this.$route.query.userid || ''
    console.log(this.$route)
    this.getjson()
    let arr = []
    for (var key in this.obj) {
      let obj = {}
      obj.name = ''
      obj.value = key
      arr.push(obj)
    }
    console.log(JSON.stringify(arr))

    this.test()
  },
  methods: {
    test () {
      // this.$ajax.get('',{},function (res) {
      //
      // }).then((res)=>{
      // })
      // that.tableData = jsondata;
    },
    getjson () {
      let that = this
      var role = this.role
      var userid = this.userid
      this.$ajax.get(that.$api.getData + '?role=' + role + '&userid=' + userid).then((res) => {
        console.log(res)
        that.tableData = res.data
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    selectable (row, index) {
      if (row.islock == 'Y') {
        return false
      } else {
        return true
      }
    },
    confirmClick () {
      let that = this
      let arr_checked = this.multipleSelection || []
      if (arr_checked.length < 1) {
        this.$message({
          type: 'warning',
          message: '请选择至少一个!'
        })
        return
      }
      var enddate = this.multipleSelection[0].enddate || ''
      console.log(enddate)
      for (let i = 0, j = arr_checked.length; i < j; i++) {
        arr_checked[i].islock = 'Y'
      }
      let msg = this.msg || ''
      this.$ajax.post(that.$api.commit + '?approve=Y&role=' + this.role + '&userid=' + this.userid + '&approvenote=' + msg, {
        data: JSON.stringify(arr_checked)
      }).then((res) => {
        console.log(res)
        that.$message({
          type: 'warning',
          message: '审批成功!'
        })
        if (enddate && that.role == 2) {
          var enddate_h = Number(enddate.split(':')[0])
          var enddate_m = Number(enddate.split(':')[1])
          var now_h = Number((new Date()).getHours())
          var now_m = Number((new Date()).getMinutes())
          var bool = false
          if (enddate_h < now_h) {
            bool = true
          } else if (enddate_h == now_h) {
            if (enddate_m < now_m) {
              bool = true
            }
          }
          if (bool) {
            that.$message({
              type: 'success',
              message: '您的审批数据将于第二天发货!'
            })
          }
        }
        that.getjson()
      })
    },
    cancelClick () {
      let that = this
      if ((!this.multipleSelection) || this.multipleSelection.length < 1) {
        that.$message({
          type: 'warning',
          message: '请选择至少一个!'
        })
        return
      }
      let arr_checked = this.multipleSelection || []
      for (let i = 0, j = arr_checked.length; i < j; i++) {
        arr_checked[i].islock = 'Y'
      }
      let msg = this.msg || ''
      this.$ajax.post(that.$api.commit + '?approve=N&role=' + this.role + '&userid=' + this.userid + '&approvenote=' + msg, {
        data: JSON.stringify(arr_checked)
      }).then((res) => {
        console.log(res)
        that.$message({
          type: 'warning',
          message: '审批成功!'
        })
        that.getjson()
      })
    },
    checkClick () {
      this.$refs.multipleTable.toggleAllSelection()
    },
    uncheckClick () {
      // this.$refs.multipleTable.clearSelection();
    },
    tableRowClassName ({ row, rowIndex }) {
      // return 'warning-row';
      // return 'success-row';
      return ''
    }

  }

}
</script>

<style scoped>
  >>> .demo-table-expand {
    font-size: 0;
  }
  >>> .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  >>> .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }

  >>> .warning-row {
    background: oldlace ;
  }

  >>> .el-table .success-row {
    background: #f0f9eb;
  }

  >>> .demo-table-expand label{
    width: 150px;
  }
  >>> .el-form--label-left .el-form-item__label{
    text-align: right;
  }
</style>
