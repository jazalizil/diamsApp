/**
 * Created by jazalizil on 26/11/2016.
 */
'use strict';
import Utils from '../../components/utils';
import User from './user.model';

export function getOrCreate(req, res) {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  User.find({ ip }).exec()
    .then(user => {
      if(!user) {
        User.create({ ip })
          .then(Utils.respondWithResult(res, 201))
          .catch(Utils.handleError(res));
      }
      return user;
    })
    .then(Utils.respondWithResult(res))
    .catch(Utils.handleError(res));
}
