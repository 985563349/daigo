function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;

  if (!response.statusCode || !validateStatus || validateStatus(response.statusCode)) {
    resolve(response);
  } else {
    reject({ ...response, errMsg: 'Request failed with status code ' + response.statusCode });
  }
}

module.exports = settle;
