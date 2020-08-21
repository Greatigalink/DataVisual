import axios from 'axios';

axios.timeout = 10000;

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    if(response.status === 200) {
      return response;
    } else {
      return Promise.reject('出现未知错误');
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default function api(method, url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  })
};