const { app } = require('geum');
const cookie = require('cookie-parser')();

app.server.use((req, res) => {
  //transform to async function
  return new Promise(resolve => {
    cookie(req, res, resolve)
  });
});
