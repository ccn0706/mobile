const mutations = {
  // 保存token方法
  set_token(state, token = '') {
    if (token && typeof token == "string") {
      // 设置token
      state.token = token;
      localStorage.setItem('token', token)
    } else {
      //清除token
      state.token = "";
      localStorage.removeItem('token')
    }
  },


  // 加1
  add(state){
    state.num++
  },
  // 加10
  add10(state,counter){
    state.num+=counter
  },
  // 异步修改信息
  updataInfos(state,payload){
    console.log('111'+payload)
    state.info.name=payload
  }
}

export default mutations
