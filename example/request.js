const daigo = require('daigo');

const request = daigo.create({
  baseURL: 'https://mock.presstime.cn/mock/63870e6021f99a00633ffec1/example',
  timeout: 60000,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = request;
