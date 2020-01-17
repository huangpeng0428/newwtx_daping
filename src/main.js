// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookies from 'vue-cookies';
import store from './store'
import App from './App'
import router from './router'
import echarts from 'echarts'
import http from './lib/http.js'

Vue.config.productionTip = false

Vue.use(VueCookies)
Vue.prototype.$http = http
Vue.prototype.$echarts = echarts

router.beforeEach((from, to, next) => {

  // if (to.meta.requireAuth) { // 判断跳转的路由是否需要登录
  //     if (store.state.token) { // vuex.state判断token是否存在
  //         next() // 已登录
  //     } else {
  //         next({
  //             path: '/login',
  //             query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
  //         })
  //     }
  // } else {
  //    next()
  // }
  // console.log(to.meta)
  if (to.meta.requireAuth) {
    next({
      path: '/login'

      // ,
      // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  }

  // console.log(from, '1111', to)
  next()
})

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
