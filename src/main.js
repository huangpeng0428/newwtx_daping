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

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (!Vue.prototype.$cookies.get('loginCookie') || Vue.prototype.$cookies.get('loginCookie') == null) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
