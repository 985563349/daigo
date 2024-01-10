const dispatchRequest = require('./dispatchRequest');
const InterceptorManager = require('./InterceptorManager');
const utils = require('../utils');

class Daigo {
  constructor(defaults) {
    this.defaults = defaults;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    };
  }

  request(config) {
    config = utils.merge(this.defaults, config);
    const chain = [];

    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    chain.push(dispatchRequest, undefined);

    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }
}

utils.forEach(['delete', 'get', 'head', 'options', 'post', 'put', 'patch'], (method) => {
  Daigo.prototype[method] = function (url, config) {
    this.request(
      utils.merge(config, {
        url,
        method: method.toUpperCase(),
      })
    );
  };
});

module.exports = Daigo;
