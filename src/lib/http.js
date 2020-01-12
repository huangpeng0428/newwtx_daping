import Axios from 'axios';
import config from './config';

import util from './util'

const axios = Axios.create({
  baseURL: config.HTTPURL, // 设置请求域名
  timeout: 12000,
  headers: {
    'content-type': 'application/json; charset=UTF-8'
  }
});

// 请求前拦截
axios.interceptors.request.use(
  config => {

    // config.data['timestamp'] = new Date().getTime()
    config.data['timestamp'] = '1578842117394'

    // console.log(`${util.ObjectToString(util.objKeySort(config.data))}&key=3ux94uu9y5SoihjK1BLxZbTOn5dpTAEc`)
    config.data['sign'] = util.MD5(`${util.ObjectToString(util.objKeySort(config.data))}&key=3ux94uu9y5SoihjK1BLxZbTOn5dpTAEc`)
    console.log(config.data['sign'])
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
      if (result.data.code === 0) {
        return result.data.data;
      }
      return Promise.reject(new Error(result.data.message));
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
