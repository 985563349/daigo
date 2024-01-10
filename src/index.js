const Daigo = require('./core/Daigo');
const CancelToken = require('./cancel/CancelToken');
const utils = require('./utils');
const defaults = require('./defaults');

function createInstance(config) {
  const context = new Daigo(config);
  const instance = Daigo.prototype.request.bind(context);

  utils.extend(instance, Daigo.prototype, context);
  utils.extend(instance, context, null);

  instance.create = function create(instanceConfig) {
    return createInstance(utils.merge(config, instanceConfig));
  };

  return instance;
}

const daigo = createInstance(defaults);
daigo.CancelToken = CancelToken;

module.exports = daigo;
