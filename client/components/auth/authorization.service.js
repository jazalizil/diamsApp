'use strict';
// @flow
class _User {
  constructor() {
    this._id = '';
    this.ip = '';
    this.$promise = undefined;
  }
}

export function AuthService($location, $http, $cookies, $q, appConfig, User) {
  'ngInject';
  // var currentUser = new _User();

  // if($cookies.get('token') && $location.path() !== '/logout') {
  //   currentUser = User.get();
  // }

  var Auth = {
    login() {
      return $http.post('/auth/login');
    },
    logout() {
      return $http.post('/auth/logout');
    }
  };
  return Auth;
}
