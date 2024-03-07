const utils = require('../utils');
const defaults = require('../defaults');
const settle = require('./settle');
const adapters = require('../adapters');

function dispatchRequest(config) {
  const url = /https?:/.test(config.url) ? config.url : config.baseURL + config.url;

  return new Promise((resolve, reject) => {
    const { cancelToken } = config;

    const adapter = adapters.getAdapter(config.adapter || defaults.adapter);

    const task = adapter(
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
        task.abort();
      });
    }
  });
}

module.exports = dispatchRequest;
