/**
 * Created by jazalizil on 01/12/2016.
 */
'use strict';
import jwt from 'jsonwebtoken';
import compose from 'composable-middleware';
import conf from '../config/environment';
import Token from './token.model';
import User from '../api/user/user.model';

function verifyTokenError(err, decoded, cb) {
  if(!err) {
    console.log('token ok::', decoded);
    return cb();
  }
  if(err.name === 'TokenExpiredError') {
    return Token.findOne({userId: decoded.userId}).exec()
      .then((err, token) => {
        if(err) {
          return cb(err);
        }
        jwt.sign({userId: decoded.userId}, conf.secrets.token, {expiresIn: conf.expires}, (err, value) => {
          if(err) {
            return cb(err);
          }
          token.value = value;
          token.save();
          return cb();
        });
      });
  } else {
    return cb(err);
  }
}

export function isAuthenticated() {
  return compose()
    // Validate JWT
    .use((req, res, next) => {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = req.query.access_token;
      }
      let token = req.headers.authorization;
      console.log('verify token::', token);
      return jwt.verify(token, conf.secrets.token, {}, (jwtErr, decoded) => {
        verifyTokenError(jwtErr, decoded, err => {
          if(err) {
            return res.status(401).end();
          }
          req.userId = decoded.userId;
          return next();
        });
      });
    })
    // Attach user to request
    .use(function(req, res, next) {
      return User.findById({_id: req.userId}).exec()
        .then((error, user) => {
          if(error) {
            return res.status(401).end();
          }
          console.log('user found::', user);
          req.user = user;
          return next();
        })
        .catch(err => {
          return next(err);
        });
    });
}
