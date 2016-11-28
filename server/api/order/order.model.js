'use strict';

import mongoose from 'mongoose';

var OrderSchema = new mongoose.Schema({
  sold: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now()
  },
  finished: {
    type: Boolean,
    default: false
  }
});

OrderSchema.post('save', (order, next) => {
  if(!order.finished) {
    console.log(`order just created with price ${order.price}`);
    setTimeout(() => {
      order.active = false;
      order.finished = true;
      order.save(() => {
        console.log(`order with price ${order.price} is now inactive`);
      });
    }, 30000);
    next();
  }
});

export default mongoose.model('Order', OrderSchema);
