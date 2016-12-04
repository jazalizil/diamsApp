'use strict';

export function authInterceptor($rootScope, $q, localStorageService, Util) {
  'ngInject';

  return {
    // Add authorization token to headers
    request(config) {
      config.headers = config.headers || {};
      if(localStorageService.get('token') && Util.isSameOrigin(config.url)) {
        config.headers.Authorization = localStorageService.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError(response) {
      if(response.status === 401) {
        $rootScope.$emit('logout');
      }
      return $q.reject(response);
    }
  };
}
