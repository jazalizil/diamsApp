'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Home',
    state: 'main'
  }];
  isCollapsed = true;

  constructor($rootScope, Auth) {
    'ngInject';
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.loginPromise = Auth.login;
    this.logoutPromise = Auth.logout;
    this.$rootScope = $rootScope;
  }

  login() {
    this.loginPromise(() => {
      this.$rootScope.$emit('login');
    });
  }

  logout() {
    this.logoutPromise(() => {
      this.$rootScope.$emit('logout');
    });
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
