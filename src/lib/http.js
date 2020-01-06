import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://47.106.172.72:8001/api', // 设置请求域名
  timeout: 12000,
  headers: {
    'content-type': 'application/json; charset=UTF-8'
  }
});

// 请求前拦截
axios.interceptors.request.use(
  config => {
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
