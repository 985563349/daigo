const wxAdapter = require('./wx');

const adapters = {
  wx: wxAdapter,
};

function getAdapter(nameOrAdapter) {
  if (typeof nameOrAdapter === 'string') {
    const adapter = adapters[nameOrAdapter];

    if (!nameOrAdapter) {
      throw Error(`Can not resolve adapter '${nameOrAdapter}'`);
    }

    return adapter;
  }

  if (typeof nameOrAdapter !== 'function') {
    throw new TypeError('adapter is not a function');
  }

  return nameOrAdapter;
}

module.exports = {
  getAdapter,
};
