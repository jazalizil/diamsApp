/**
 * Created by jazalizil on 26/11/2016.
 */
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/:id          ->  upsert
 * PATCH   /api/users/:id          ->  patch
 * DELETE  /api/users/:id          ->  destroy
 */

'use strict';

import Utils from '../../components/utils';
import User from './user.model';

// Gets a list of Users
export function index(req, res) {
  return User.find().exec()
    .then(Utils.respondWithResult(res))
    .catch(Utils.handleError(res));
}

export function me(req, res) {
  res.json(req.user);
}

// Gets a single User from the DB
export function show(req, res) {
  return User.findById(req.params.id).exec()
    .then(Utils.handleEntityNotFound(res))
    .then(Utils.respondWithResult(res))
    .catch(Utils.handleError(res));
}

// Creates a new User in the DB
export function create(req, res) {
  return User.create(req.body)
    .then(Utils.respondWithResult(res, 201))
    .catch(Utils.handleError(res));
}

// Upserts the given User in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  if(req.user.id != req.params.id) {
    return res.status(401).end();
  }
  return User.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(Utils.respondWithResult(res))
    .catch(Utils.handleError(res));
}

// Updates an existing User in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  if(req.user.id != req.params.id) {
    return res.status(401).end();
  }
  return User.findById(req.params.id).exec()
    .then(Utils.handleEntityNotFound(res))
    .then(Utils.patchUpdates(req.body))
    .then(Utils.respondWithResult(res))
    .catch(Utils.handleError(res));
}

// Deletes a User from the DB
export function destroy(req, res) {
  return User.findById(req.params.id).exec()
    .then(Utils.handleEntityNotFound(res))
    .then(Utils.removeEntity(res))
    .catch(Utils.handleError(res));
}
