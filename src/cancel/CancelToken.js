const CancelError = require('./CancelError');

class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    this.reason = null;
    this.listeners = [];

    executor((message) => {
      if (this.reason) {
        // Cancellation has already been requested
        return;
      }

      this.reason = new CancelError(message);
      this.listeners.forEach((listener) => {
        listener(this.reason);
      });
    });
  }

  static source() {
    let cancel = null;
    const token = new CancelToken((c) => {
      cancel = c;
    });

    return {
      token,
      cancel,
    };
  }

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
    } else {
      this.listeners.push(listener);
    }
  }
}

module.exports = CancelToken;
