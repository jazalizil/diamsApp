'use strict';
class _User {
  _id = '';
  ip = '';
  $promise = undefined;
}

export function AuthService($location, $http, $q, localStorageService, User) {
  'ngInject';
  var currentUser = new _User();

  if(localStorageService.get('token') && $location.path() !== '/logout') {
    currentUser = User.get();
  }

  var Auth = {
    login(cb) {
      return $http.get('/auth/login')
        .then(res => {
          console.log('login ok::', res);
          localStorageService.set('token', res.data);
          currentUser = User.get();
          return currentUser.$promise;
        })
        .then(user => {
          cb(null, user);
          return user;
        })
        .catch(err => {
          Auth.logout();
          cb(err);
          return $q.reject(err.data);
        });
    },
    logout() {
      return $http.get('/auth/logout')
        .then(() => {
          localStorageService.remove('token');
        });
    },
    getCurrentUserSync() {
      return currentUser;
    },

    /**
     * Check if a user is logged in
     *
     * @return {Bool}
     */
    isLoggedInSync() {
      return !!_.get(currentUser);
    }
  };
  return Auth;
}
