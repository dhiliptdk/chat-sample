'use strict';

var Chat = require('./chat.model');
var ioemitter = require('./../../_helper/socket.emitter');
const { ObjectId } = require('mongodb');
exports.get = function (req, res) {
    let user = req.params.user
    console.log(user)
    Chat.find({
        $or: [
            { from: user },
            { to: user }
        ]
    }, function (err, messages) {
        if (err && err.code == 11000) {
            return res.status(500).json(err)
        }
        if (err) { return handleError(res, err); }

        return res.status(201).json(messages);
    });
}
exports.create = function (req, res) {
    Chat.create(req.body, function (err, message) {
        console.log(err)
        if (err && err.code == 11000) {
            return res.status(500).json(err)
        }
        if (err) { return handleError(res, err); }
        ioemitter.sendMessage(message)
        return res.status(201).json(message);
    });
}
exports.edit = function (req, res) {
    let id = req.params.id
    Chat.findOneAndUpdate({ _id: ObjectId(id), from: req.body.from }, { text: req.body.text }, { new: true }, function (err, message) {
        if (err) { return handleError(res, err); }
        console.log(message)
        ioemitter.updateMessage(message)
        return res.status(201).json({ status: true });
    })
}
function handleError(res, err) {
    res.status(500).send({ status: false, ...err })
}