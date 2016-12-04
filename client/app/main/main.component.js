import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor($http, $scope, socket, $log, Auth, toastr) {
    this.$http = $http;
    this.socket = socket;
    this.$log = $log;
    this.orders = [];
    this.isLogged = Auth.isLoggedInSync();

    $scope.$on('$destroy', () => {
      this.socket.unsyncUpdates('order');
    });

    $scope.$on('login', () => {
      this.isLogged = true;
      toastr.success('Welcome !');
      this.socket.syncUpdates('order', this.orders,
        (ev, order) => {
          if(ev === 'updated') {
            this.$log.debug('order', order, 'updated');
          }
        });
    });

    $scope.$on('logout', () => {
      toastr.error('Good bye !');
      this.isLogged = false;
      this.socket.unsyncUpdates('order');
    });
  }

  $onInit() {
    if(this.isLogged) {
      this.$http.get('/api/orders')
        .then(response => {
          this.orders = response.data;
        });
    }
  }

  buy(order) {
    this.$http.patch(`/api/orders/${order._id}`, [{
      op: 'replace',
      path: '/sold',
      value: true
    }]);
  }
}

export default angular.module('diamsApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
