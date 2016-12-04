/**
 * Created by jazalizil on 27/11/2016.
 */
'use strict';
import angular from 'angular';
import constants from '../../app/app.constants';
import util from '../util/util.module';
import ngCookies from 'angular-cookies';
import {authInterceptor} from './interceptor.service';
import {AuthService} from './authorization.service';
import {UserResource} from './user.service';
import uiRouter from 'angular-ui-router';

function addInterceptor($httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push('authInterceptor');
}

export default angular.module('diamsApp.auth', [
  constants,
  util,
  ngCookies,
  uiRouter
])
  .factory('authInterceptor', authInterceptor)
  .factory('Auth', AuthService)
  .factory('User', UserResource)
  .config(['$httpProvider', addInterceptor])
  .name;
