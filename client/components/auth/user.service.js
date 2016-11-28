/**
 * Created by jazalizil on 27/11/2016.
 */
'use strict';

export function UserResource($resource) {
  'ngInject';
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    }
  });
}
