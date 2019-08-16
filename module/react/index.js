const { app } = require('geum');

const controller = require('./controller.js');

app.server.public(__dirname + '/components', '/components');
app.server.public(__dirname + '/redux', '/redux');
app.server.public(__dirname + '/screens', '/screens');
app.server.public(__dirname + '/public');

app.server.use(controller);
