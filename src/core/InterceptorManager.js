const utils = require('../utils');

class InterceptorManager {
  constructor() {
    this.handles = [];
  }

  use(fulfilled, rejected) {
    this.handles.push({
      fulfilled,
      rejected,
    });
    return this.handles.length - 1;
  }

  forEach(callback) {
    utils.forEach(this.handles, callback);
  }
}

module.exports = InterceptorManager;
