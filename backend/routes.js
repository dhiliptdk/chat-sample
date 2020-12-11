/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function (app) {

  // Insert routes below 

  app.use('/api/chat', require('./api/chat'));
  app.use('/', (req, res) => {
    res.send("server running")
  })

};
