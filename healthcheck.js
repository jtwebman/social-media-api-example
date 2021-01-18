'use strict';

const http = require('http');

const options = {
  host: '127.0.0.1',
  port: '2368',
  path: '/status',
  timeout: 2000,
};

const request = http.request(options, res => {
  if (res.statusCode == 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', function(err) {
  process.exit(1);
});

request.end();
