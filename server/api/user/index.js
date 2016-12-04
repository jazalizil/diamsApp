/**
 * Created by jazalizil on 01/12/2016.
 */
'use strict';

var express = require('express');
var controller = require('./user.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();


router.get('/', auth.isAuthenticated(), controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:id', auth.isAuthenticated(), controller.upsert);
router.patch('/:id', auth.isAuthenticated(), controller.patch);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
