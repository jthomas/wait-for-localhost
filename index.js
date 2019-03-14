'use strict';
const http = require('http');

const waitForLocalhost = options => {
  options = Object.assign({}, options);

  return new Promise(resolve => {
    const retry = () => setTimeout(main, options.delay);

    const method = options.useGet ? 'GET' : 'HEAD';

    const main = () => {
      const request = http.request({method, path: options.path, port: options.port}, response => {
        if (response.statusCode === 200) {
          return resolve();
        }

        retry();
      });

      request.on('error', retry);
      request.end();
    };

    main();
  });
};

module.exports = waitForLocalhost;
module.exports.default = waitForLocalhost;
