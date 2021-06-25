const state = {
  token: localStorage['token'] ? localStorage['token'] : '', //token
  account_id: localStorage['account_id'] ? localStorage['account_id'] : 0, //当前account_id
  app_id: localStorage['app_id'] ? localStorage['app_id'] : '', //当前 app_id
  retry_count: 0, //登录重试次数,防止同一页面中多个ajax同时触发登录操作

  num:0,
  students:[
    {id:1,name:'zhangsan',age:10},
    {id:2,name:'lisi',age:11},
    {id:3,name:'wangwu',age:12},
    {id:4,name:'zhaoliu',age:14}
  ],
  info:{
    name:'张三',
    age:'14'
  }

}
export default state
