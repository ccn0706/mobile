import Vue from 'vue'
import router from './index'
import store from '../store'
import {
  getQueryString,
} from 'utils/index.js'
import {
  wxLogin
} from 'utils/wxLogin.js'

const whiteList = ['/downUPLoad', '/login'] // 白名单

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if (whiteList.indexOf(to.path) === -1) { //白名单外
    //   判断有没有微信授权登录即判断有没有token
    if (!localStorage.getItem('token')) {
        // debugger
      // 没有token,但是有code的情况下，只需要执行获取token的方法
      if (getQueryString('code') && window.location.search.indexOf('?') != -1) {
        console.log('没有token，但有code');

        store.dispatch('loginAll', {
          code: getQueryString('code')
        }).then(()=>{
          next()
        })
      } else {
        //没有token，也没有code的情况下，就要执行微信授权的方法获取code即wxLogin方法
        //   console.log('没有token，也没有code');
        wxLogin();
      }

    }else{
        //  页面需要登录才能访问,这里因为部分页面是可以进入的，所以加了个requireAuth
        if (to.meta.requireAuth) {
            const login = localStorage.getItem("login")
            if (!login) {
                // 没有登录的情况下，跳转到登录页，并携带本来的地址
                next({
                    path: '/login',
                    query: {
                        redirect: from.fullPath
                    }
                })
            } else {
                // 有登录就放行
                next()
            }
        } else {
            // 页面不需要登录就可以访问
            next();
        }
    }

  } else {
    next()
  }

});


