/**
 * Created by jazalizil on 26/11/2016.
 */
'use strict';
import User from '../api/user/user.model';
import Token from './token.model';
import conf from '../config/environment';
import jwt from 'jsonwebtoken';

export function login(req, res) {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return User.findOne({ ip }).exec()
    .then(entity => {
      if(!entity) {
        console.log('creation user');
        return User.create({ip}, (err, user) => {
            if(err) {
              return res.status(500).send(err);
            }
            console.log('user created::', user);
            jwt.sign({userId: user._id}, conf.secrets.token, {expiresIn: conf.expires}, (error, value) => {
              if(error) {
                console.log('jwt sign error:::', error);
                return res.status(500).send(error);
              }
              return Token.create({userId: user._id, value}, (err, token) => {
                if(err) {
                  return res.status(500).send(err);
                }
                console.log('token created with value', token.value);
                return res.status(201).json(token.value);
              })
            });
          });
      }
      console.log('user already created');
      return Token.findOne({userId: entity._id}).exec()
        .then(token => {
          return res.status(200).json(token);
        })
        .catch(err => {
          return res.status(500).send(err);
        });
    })
    .catch(err => {
      return res.status(500).send(err);
    });
}

export function logout(req, res) {
  return res.status(200).end();
}
