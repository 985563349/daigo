const defaults = {
  timeout: 60000,

  validateStatus(status) {
    return status >= 200 && status < 300;
  },
};

module.exports = defaults;
