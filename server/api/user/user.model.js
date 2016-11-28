/**
 * Created by jazalizil on 26/11/2016.
 */
'use strict';

import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
  ip: String,
  creationDate: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('User', UserSchema);
