<template>
  <div class="c_container">
    <el-main>
      <div style="width: 100%;box-sizing:border-box;text-align: center;font-size: 23px;font-weight:bold;padding: 15px;">
        lotto
      </div>

    </el-main>
  </div>
</template>

<script>
export default {
  name: 'table',
  data () {
    return {
      urlindex: 1897,
      // url: 'https://api/',
      url: 'https://apigw.mylotto.co.nz/api/results/v1/results/lotto/',
      arr: [
        { 'name': '日期', 'value': 'date' },
        { 'name': '数据', 'value': 'num' }
      ],
      tableData: [],
      multipleSelection: [],
      numObj: {}
    }
  },
  mounted () {
    this.test()
  },
  methods: {
    test () {
      for (let i = 1897, j = 1895; i > j; i--) {
        this.getNumber(i)
      }
    },

    // 请求
    getNumber (index) {
      let that = this
      let obj = this.numObj
      this.$ajax.get(this.url + index, {}, function (res) {
        let e = []
        let date = res.lotto.drawDate
        let a = res.lotto.lottoWinningNumbers.numbers
        let b = res.lotto.lottoWinningNumbers.bonusBalls
        let c = res.powerBall.powerballWinningNumber
        e.push(date, ...a, b, c)
        obj[date] = e
        that.numObj = obj
        console.log(e)
      })
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
