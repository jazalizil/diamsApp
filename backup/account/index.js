/**
 * Created by jazalizil on 01/12/2016.
 */

'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routing from './account.routes';

export default angular.module('diamsApp.account', [
  uiRouter
])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if(next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  })
  .name;
