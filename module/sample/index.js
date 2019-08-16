const { app } = require('geum');

const fs = require('fs');
const events = require('./events');

app.socket.use(events);
app.cli.use(events);

app.server.get('/', (req, res) => {
  res.setContent('Hello World');
});

app.server.route('/cookie').get((req, res) => {
  const views = (req.getCookie('views') || 0) + 1;
  res.setContent(`Viewed ${views} times`);
  res.setCookie('views', views);
});

app.server.route('/session').get((req, res) => {
  const views = (req.getSession('views') || 0) + 1;
  res.setContent(`Viewed ${views} times`);
  res.setSession('views', views);
});

app.server.get('/message/create', async(req, res) => {
  await events.emit('message-create', req, res);
});

app.server.route('/socketio').get(async(req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setContent(fs.createReadStream(__dirname + '/assets/socketio.html'));
});

app.server.route('/jquery.min.js').get(async(req, res) => {
  res.setHeader('Content-Type', 'text/javascript');
  res.setContent(fs.createReadStream(__dirname + '/assets/jquery.min.js'));
});
