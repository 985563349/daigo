class CancelError {
  constructor(message) {
    this.message = message || 'request abort.';
  }
}

module.exports = CancelError;
