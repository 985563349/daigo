# daigo

[![npm version](https://img.shields.io/npm/v/daigo.svg?style=flat-square)](https://www.npmjs.com/package/daigo)
[![npm downloads](https://img.shields.io/npm/dm/daigo.svg?style=flat-square)](http://npm-stat.com/charts.html?package=daigo)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

一个微信小程序请求库。

## 安装

通过 npm:

```bash
npm install daigo
```

## 用例

发起一个 GET 请求：

```javascript
const daigo = require('daigo');

// 向给定 id 的用户发起请求
daigo.get('/user?id=12345')
  .then(function (response) {
    // 处理成功情况
    console.log(response);
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .finally(function () {
    // 总是会执行
  });

// 上述请求也可以按以下方式完成（可选）
daigo.get('/user', {
    data: {
      id: 12345,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

// 支持 async/await 用法
async function getUser() {
  try {
    const response = await daigo.get('/user?id=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

发起一个 POST 请求：

```javascript
daigo.post('/user', {
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone',
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## API

可以向 daigo 传递相关配置来创建请求：

```javascript
// 发起一个 POST 请求
daigo({
  method: 'POST',
  url: '/user',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone',
  },
});
```

### 请求方式别名

为了方便起见，已经为所有支持的请求方法提供了别名：

- daigo.request(config)
- daigo.get(url, [,config])
- daigo.post(url, [,config])
- daigo.delete(url, [,config])
- daigo.put(url, [,config])
- daigo.patch(url, [,config])
- daigo.options(url, [,config])
- daigo.head(url, [,config])

### 创建一个实例

您可以使用自定义配置创建一个实例：

```javascript
const instance = daigo.create({
  baseURL: 'https://api.example.com',
  timeout: 6000,
  header: { 'X-Custom-Header': 'foobar' },
});
```

### 请求配置

这些是创建请求时可用的配置项，并且完全兼容小程序请求配置：

```javascript
{
  // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL
  baseURL: 'https://api.example.com',

  // HTTP 请求方法，默认值为 GET
  method: 'GET',

  // 开发者服务器接口地址
  url: '/user',

  // 超时时间，单位为毫秒，默认值为 60000
  timeout: 6000,

  // 自定义请求头
  header: { 'X-Custom-Header': 'foobar' },

  // 请求的参数
  data: {
    firstName: 'Fred'
  }
}
```

### 默认配置

您可以指定默认配置，它将作用于每个请求：

```javascript
daigo.defaults.baseURL = 'https://api.example.com';
daigo.defaults.timeout = 10000;
```

自定义实例默认值：

```javascript
// 创建实例时配置默认值
const instance = daigo.create({
  baseURL: 'https://api.example.com',
});

// 创建实例后修改默认值
instance.defaults.timeout = 10000;
```

配置会按照优先级进行合并，请求的配置参数优先级是最高的：

```javascript
// 使用库提供的默认配置创建实例
const instance = daigo.create();

// 重写库的超时默认值
instance.defaults.timeout = 10000;

// 重写此请求的超时时间
instance.get('/query', {
  timeout: 5000,
});
```

### 拦截器

在请求或响应被 then 或 catch 处理前拦截它们：

```javascript
// 添加请求拦截器
daigo.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
daigo.interceptors.response.use(
  (response) => {
    // 在响应数据做些什么
    return response;
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);
```

### 取消请求

您可以使用 CancelToken 取消一个请求：

```javascript
const CancelToken = daigo.CancelToken;
const source = CancelToken.source();

daigo.get('/query', {
  cancelToken: source.token,
});

// 取消请求 (message 参数是可选的)
source.cancel('Operation canceled by the user.');
```
