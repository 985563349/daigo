const utils = require('../utils');

class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected,
    });
    return this.handlers.length - 1;
  }

  eject(id) {
    this.handlers.splice(id, 1);
  }

  clear() {
    this.handlers = [];
  }

  forEach(callback) {
    utils.forEach(this.handlers, callback);
  }
}

module.exports = InterceptorManager;
