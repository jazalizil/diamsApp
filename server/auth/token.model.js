/**
 * Created by jazalizil on 01/12/2016.
 */

'use strict';

import mongoose from 'mongoose';


var TokenSchema = new mongoose.Schema({
  value: String,
  creationDate: {
    type: Date,
    default: Date.now()
  },
  updatedDate: {
    type: Date
  },
  userId: mongoose.Schema.Types.ObjectId
});

TokenSchema.pre('save', (token, next) => {
  token.updatedAt = Date.now();
  return next();
});

export default mongoose.model('Token', TokenSchema);
