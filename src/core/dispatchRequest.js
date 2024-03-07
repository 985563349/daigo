const utils = require('../utils');
const settle = require('./settle');

function dispatchRequest(config) {
  const url = /https?:/.test(config.url) ? config.url : config.baseURL + config.url;

  return new Promise((resolve, reject) => {
    const { cancelToken } = config;

    const requestTask = wx.request(
      utils.merge(config, {
        url,
        success: (response) => {
          settle(resolve, reject, { ...response, config });
        },
        fail: reject,
      })
    );

    if (cancelToken) {
      cancelToken.subscribe((reason) => {
        reject(reason);
        requestTask.abort();
      });
    }
  });
}

module.exports = dispatchRequest;
