const { app } = require('geum');

require('./cookie');
require('./session');

//... server ...

app.server.on('error', (e, req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setContent(e);
});
