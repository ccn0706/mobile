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
}

export default mutations
