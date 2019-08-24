
let baseUrl = window.location.protocol+"//"+window.location.host;
// let baseUrl = 'http://127.0.0.1';
// let baseUrl = '';
console.log(baseUrl);
var api = {
  // test1 -- 获取json
  getData: baseUrl + '/service/OnlineApproveServlet',
  // test1 -- 表格数据提交审核
  commit: baseUrl +  '/service/OnlineApproveServlet',
  // test2 -- 获取json
  getData2: baseUrl + '/service/DirectivecancelledServlet',
  // test2 -- 表格数据提交审核
  commit2: baseUrl +  '/service/DirectivecancelledServlet',
}
export default { api }
