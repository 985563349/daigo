class CancelError {
  constructor(message) {
    this.errMsg = message || 'request:fail abort';
  }
}

export default CancelError;
