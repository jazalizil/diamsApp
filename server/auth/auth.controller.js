/**
 * Created by jazalizil on 26/11/2016.
 */
'use strict';

import UserService from '../api/user/user.service';

export function auth(req, res) {
  return UserService.getOrCreate(req, res);
}
