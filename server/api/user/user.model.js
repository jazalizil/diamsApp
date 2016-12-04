/**
 * Created by jazalizil on 26/11/2016.
 */
'use strict';
import conf from '../../config/environment';
import mongoose from 'mongoose';
import Token from '../../auth/token.model';
let jwt = require('jsonwebtoken');


var UserSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.pre('save', (user, next) => {
  var token = new Token({
    userId: user._id
  });
  return jwt.sign({userId: user._id}, conf.secrets.token, {expiresIn: conf.expires}, (err, value) => {
    if(err) {
      return next(err);
    }
    token.value = value;
    token.userId = user._id;
    token.save();
    return next();
  });
});

export default mongoose.model('User', UserSchema);
