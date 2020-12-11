/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
const redis = require('redis');

// adapter for redis to connect with socket
const redisAdapter = require('socket.io-redis');

// client for redis publisher and subscriber
const pubRedisclient = redis.createClient(config.redis.port, config.redis.host, config.redis.options);
const subRedisclient = redis.createClient(config.redis.port, config.redis.host, config.redis.options);


// When the user connects.. perform this
function onConnect(socket) {

  socket.on("join", function (user) {
    socket.join(user)
  })

}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));
  console.log("socket initiating")

  socketio.adapter(redisAdapter({ pubClient: pubRedisclient, subClient: subRedisclient }));
  socketio.on('authenticated', function (socket) {
    console.log("autheticated")
  });

  socketio.on('connection', function (socket) {
    onConnect(socket);
  });

};