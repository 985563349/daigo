const daigo = require('daigo');
const request = require('../../request');

const CancelToken = daigo.CancelToken;
const source = CancelToken.source();

Component({
  methods: {
    async start() {
      try {
        const response = await request({
          url: '/query',
          method: 'GET',
          cancelToken: source.token,
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },

    cancel() {
      source.cancel();
    },
  },
});
