import Axios from 'axios';

// import Vue from 'vue';
import Qs from 'qs'
import config from './config';

import util from './util'

const axios = Axios.create({
  baseURL: config.HTTPURL, // 设置请求域名
  timeout: 200000,
  headers: {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});

// 请求前拦截
axios.interceptors.request.use(
  config => {

    if (config.data) {
      config.data['timestamp'] = new Date().getTime()

    // console.log(`${util.ObjectToString(util.objKeySort(config.data))}&key=3ux94uu9y5SoihjK1BLxZbTOn5dpTAEc`)
    // console.log(Vue.prototype.$cookies.get('loginId_cookie'));
    config.data['sign'] = util.MD5(`${util.ObjectToString(util.objKeySort(config.data))}&key=3ux94uu9y5SoihjK1BLxZbTOn5dpTAEc`)
    config.data = Qs.stringify(config.data);

    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 请求返回拦截
axios.interceptors.response.use(
  result => {
    if (result.status === 200) {

      // if (result.data.state == 0) {
      //   return Promise.resolve(result.data);
      // }
      //   return Promise.resolve(result.data);

      return Promise.resolve(result.data);
    } else if (/^50[0-9]/.test(result.status)) {
      return Promise.reject(new Error('返回500错误'));
    } else if (/^4[0-9][0-9]/.test(result.status)) {
      return Promise.reject(new Error('返回400错误'));
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
