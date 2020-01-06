import Axios from 'axios'

const axios = Axios.create({
  timeout: 12000,
  headers: {
    'content-type': 'application/json;charset=utf-8'
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
axios.interceptors.response.use(result => {
    if (result.data.code === 0) {
      return result.data.data;
    }
}, error => {
    return Promise.reject(error)
})

export default axios
