class CancelError {
  constructor(message) {
    this.errMsg = message || 'request:fail abort';
  }
}

module.exports = CancelError;
