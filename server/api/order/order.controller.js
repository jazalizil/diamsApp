/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders              ->  index
 * POST    /api/orders              ->  create
 * GET     /api/orders/:id          ->  show
 * PUT     /api/orders/:id          ->  upsert
 * PATCH   /api/orders/:id          ->  patch
 * DELETE  /api/orders/:id          ->  destroy
 */

'use strict';

import Utils from '../../components/utils';
import Order from './order.model';

// Gets a list of Orders
export function index(req, res) {
  return Order.find().exec()
    .then(Utils.respondWithResult(res))
    .catch(Utils.handleError(res));
}

// Gets a single Order from the DB
export function show(req, res) {
  return Order.findById(req.params.id).exec()
    .then(Utils.handleEntityNotFound(res))
    .then(Utils.respondWithResult(res))
    .catch(Utils.handleError(res));
}

// Creates a new Order in the DB
export function create(req, res) {
  return Order.create(req.body)
    .then(Utils.respondWithResult(res, 201))
    .catch(Utils.handleError(res));
}

// Upserts the given Order in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Order.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(Utils.respondWithResult(res))
    .catch(Utils.handleError(res));
}

// Updates an existing Order in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Order.findById(req.params.id).exec()
    .then(Utils.handleEntityNotFound(res))
    .then(Utils.patchUpdates(req.body))
    .then(Utils.respondWithResult(res))
    .catch(Utils.handleError(res));
}

// Deletes a Order from the DB
export function destroy(req, res) {
  return Order.findById(req.params.id).exec()
    .then(Utils.handleEntityNotFound(res))
    .then(Utils.removeEntity(res))
    .catch(Utils.handleError(res));
}
