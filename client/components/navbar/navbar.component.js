'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  /*@ngInject*/
  constructor(Auth, $state) {
    this.menu = [{
      title: 'Home',
      click: this.main
    }, {
      title: 'Signin',
      click: this.login
    }];
    this.isCollapsed = true;
    this.Auth = Auth;
    this.$state = $state;
  }
  login() {
    this.Auth.login();
  }
  main() {
    this.$state.go('main');
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
