import utils from '../utils';
import defaults from '../defaults';
import settle from './settle';
import adapters from '../adapters';

function dispatchRequest(config) {
  const url = /https?:/.test(config.url) ? config.url : config.baseURL + config.url;

  return new Promise((resolve, reject) => {
    const { cancelToken } = config;

    const adapter = adapters.getAdapter(config.adapter || defaults.adapter);

    const task = adapter(
      utils.merge(config, {
        url,
        success: (response) => {
          settle(resolve, reject, { ...response, config });
        },
        fail: reject,
      })
    );

    if (cancelToken) {
      cancelToken.subscribe((reason) => {
        reject(reason);
        task.abort();
      });
    }
  });
}

export default dispatchRequest;
