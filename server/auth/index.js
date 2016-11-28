/**
 * Created by jazalizil on 26/11/2016.
 */

'use strict';

var express = require('express');
var controller = require('./auth.controller');

var router = express.Router();

router.post('/login', controller.auth);

module.exports = router;
