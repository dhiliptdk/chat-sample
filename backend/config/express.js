'use strict';

var compression = require('compression');
var bodyParser = require('body-parser');
var config = require('./environment');
var methodOverride = require('method-override');
var cors = require('cors');

module.exports = function (app) {
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cors({
        origin: [
            config.whitelistURLs
        ]
    }));
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', config.whitelistURLs);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });
};