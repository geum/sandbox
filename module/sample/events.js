const { EventEmitter } = require('geum');

const event = EventEmitter.load();

event.on('message-create', function(req, res) {
  res.set('route', 'channel', 'all');
  res.setError(false);
  res.setResults(req.getStage('message'));
});

module.exports = event;
