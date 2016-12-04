'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-local-storage';
import 'angular-socket-io';
import 'angular-toastr';

import uiRouter from 'angular-ui-router';

// import ngMessages from 'angular-messages';


import {
  routeConfig
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import authorization from '../components/auth/auth.module';


import './app.less';

angular.module('diamsApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter, navbar,
  footer, main, constants, socket, util, authorization, 'toastr', 'LocalStorageModule'
])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['diamsApp'], {
      strictDi: true
    });
  });
