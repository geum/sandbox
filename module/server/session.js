const { app } = require('geum');

const session = require('express-session')({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
});

//use session
app.server.use((req, res) => {
  //transform to async function
  return new Promise(resolve => {
    session(req, res, resolve)
  });
});

app.server.on('request', (req, res) => {
  //load the session
  const incomingMessage = req.IncomingMessage;
  const session = Object.assign({}, incomingMessage.session);
  delete session.cookie;
  req.setSession(session);
  res.setSession(session);
});

app.server.on('response', (req, res) => {
  //unload the session
  const session = req.getSession();
  const incomingMessage = req.IncomingMessage;
  Object.keys(session).forEach(name => {
    incomingMessage.session[name] = session[name];
  });
});
