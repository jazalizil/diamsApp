/**
 * Created by jazalizil on 26/11/2016.
 */

'use strict';

var express = require('express');
var controller = require('./auth.controller');

var router = express.Router();

router.get('/login', controller.login);

router.get('/logout', controller.logout);

export default router;
