/**
 * Created by jazalizil on 01/12/2016.
 */

'use strict';

export default function routes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      referrer: 'main',
      template: '',
      controller($rootScope, Auth) {
        Auth.login(() => {
          // Logged in, broadcast event
          $rootScope.$broadcast('login');
        })
      }
    })
    .state('logout', {
      url: '/logout?referrer',
      referrer: 'main',
      template: '',
      controller($rootScope, Auth) {
        'ngInject';
        var referrer = $state.params.referrer
          || $state.current.referrer
          || 'main';
        Auth.logout()
          .then(() => {
            $rootScope.$broadcast('logout');
          })
      }
    });
}
