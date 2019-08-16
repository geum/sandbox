//rewrite require
require('module-alias/register');

const http = require('http');
const socketio = require('socket.io');

const { app } = require('geum');

//set the current path
app.pwd = process.env.PWD;

//on error
app.on('error', e => {
  console.log(e);
});

//load up all the modules and packages
app.initialize();

//run it
const server = http.createServer(app.server);
socketio(server).use(app.socket);
server.listen(3000);
