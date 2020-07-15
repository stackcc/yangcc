import util from './util.js'
import setup from './setup.js'
let baseUrl = window.location.protocol + '//' + window.location.host
if (process.env.NODE_ENV === 'production') {
  baseUrl = setup.api.baseUrlPro
} else {
  baseUrl = setup.api.baseUrlDev
}
util.log(baseUrl)
var api = {
  // test1 -- 获取json
  getData: baseUrl + '/service/OnlineApproveServlet',
  // test1 -- 表格数据提交审核
  commit: baseUrl + '/service/OnlineApproveServlet',
  // test2 -- 获取json
  getData2: baseUrl + '/service/DirectivecancelledServlet',
  // test2 -- 表格数据提交审核
  commit2: baseUrl + '/service/DirectivecancelledServlet',

  // 用户id
  userList: baseUrl + '/user/list',
  // cc -- theway add
  thewayAdd: baseUrl + '/theway/add',
  thewayEdit: baseUrl + '/theway/edit',
  thewayList: baseUrl + '/theway/list',
  deltheway: baseUrl + '/theway/del'
}
export default { ...api }
