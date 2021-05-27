import {
  wxLogin
} from 'utils/wxLogin'
import {
  post, get
} from 'network/http'

const actions = {
  loginAll(context, payload) {
    return new Promise((resolve, reject) => {

      if (isMobile()) {  //微信授权登录
        post('/api/v1/wxLogin?code=' + payload.code).then(res => {
          if (res.code == 200) {
            context.commit('set_token', res.data.token)
          }
          if (res.code == 500) {
            context.commit('set_token')
            wxLogin()
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      } else {  //pc扫码登录
        get('/api/v1/qrCodeLogin?code=' + payload.code).then(res => {
          if (res.code == 200) {
            context.commit('set_token', res.data.token)
            resolve(res)
          }
          if (res.code == 500) {
            context.commit('set_token')
            wxLogin()
            resolve(res)
          }

        }).catch(err => {
          reject(err)
        })
      }
    })
  },
}
export default actions

function isMobile() {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  return flag
}
