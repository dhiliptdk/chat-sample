var config = require('../config/environment');
const redis = require('redis');
const Redisclient = redis.createClient(config.redis.port, config.redis.host, config.redis.options);
const ioemitter = require('socket.io-emitter')(Redisclient);
ioemitter.redis.on('error', onError);
function onError(err) {
  console.log(err);
}
exports.sendMessage = function (message) {
  console.log("emitting to ", message.from, message.to)
  ioemitter.to(message.from).to(message.to).emit('message', message);
}
exports.updateMessage = function (message) {
  console.log("emitting to ", message.from, message.to)
  ioemitter.to(message.from).to(message.to).emit('update-message', message);
}
exports.ioemitter = ioemitter