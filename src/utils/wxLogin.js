import {
  WX_APPID
} from './global'

import {
  getQueryString,
  delParams
} from './url'

// 微信授权方法
export const wxLogin = () => {
  let oldCode = getQueryString('code');
  let URL = '';
  if (oldCode) {
    URL = delParams(['code', 'state']); //删除地址中的指定参数
  } else {
    URL = window.location.href;
  }
  
  let redirectUri = encodeURIComponent(URL)
  //   判断是pc还是手机
  if (isMobile()) {
    //   微信授权登录
    location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + WX_APPID + "&redirect_uri=" + redirectUri + "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
  } else {
    //   微信扫码登录
    window.location.href = "https://open.weixin.qq.com/connect/qrconnect?appid=" + 'wx784dd0969a25cd28' + "&redirect_uri=" + redirectUri + "&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect"
  }

}

function isMobile() {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  return flag
}
