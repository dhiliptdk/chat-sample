'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ChatSchema = new Schema({
    text: String,
    // type: { type: String, enum: ["incoming", 'outgoing'] },
    from: String,
    to: String
}, { timestamps: true });
module.exports = mongoose.model('chat', ChatSchema);