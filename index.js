var server = require('pushstate-server');

server.start({
  port: 3000,
  directories: ['./dist']
});
