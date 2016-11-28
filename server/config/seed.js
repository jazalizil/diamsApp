/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Order from '../api/order/order.model';

setInterval(createOrder, 15000);

function createOrder() {
  var quantity = Math.random() * (42 - 24) + 24;
  var price = quantity * (Math.random() * (10000 - 1000) + 1000);
  Order.create({ price: price.toFixed(2) });
}
