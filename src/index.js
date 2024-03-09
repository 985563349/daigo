import Daigo from './core/Daigo';
import CancelToken from './cancel/CancelToken';
import utils from './utils';
import defaults from './defaults';

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

export default daigo;
