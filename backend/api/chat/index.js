'use strict';

var express = require('express');
var controller = require('./chat.controller');

var router = express.Router();

router.get('/:user', controller.get);

router.post('/', controller.create);
router.patch('/:id', controller.edit);

router.use("/", (req, res) => {
    res.send("timeslots running")
})
module.exports = router;
