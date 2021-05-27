const state = {
  token: localStorage['token'] ? localStorage['token'] : '', //token
  account_id: localStorage['account_id'] ? localStorage['account_id'] : 0, //当前account_id
  app_id: localStorage['app_id'] ? localStorage['app_id'] : '', //当前 app_id
  retry_count: 0, //登录重试次数,防止同一页面中多个ajax同时触发登录操作
}
export default state
