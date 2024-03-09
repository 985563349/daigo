import adapters from './adapters';

function getDefaultAdapter() {
  let adapter;

  if (typeof wx !== 'undefined') {
    // For WeChat MiniProgram use WeChart adapter
    adapter = adapters.getAdapter('wx');
  }

  return adapter;
}

const defaults = {
  timeout: 60000,

  adapter: getDefaultAdapter(),

  header: {},

  validateStatus(status) {
    return status >= 200 && status < 300;
  },
};

export default defaults;
