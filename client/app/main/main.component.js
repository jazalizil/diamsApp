import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor($http, $scope, socket, $log) {
    this.$http = $http;
    this.socket = socket;
    this.$log = $log;
    this.orders = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('order');
    });

    // $scope.$watchCollection(() => {
    //   return this.orders;
    // }, newVal => {
    //   this.$log.debug(`new orders::${newVal}`);
    // });

  }

  $onInit() {
    this.$http.get('/api/orders')
      .then(response => {
        this.orders = response.data;
        this.socket.syncUpdates('order', this.orders,
          (ev, order) => {
            if(ev === 'updated') {
              this.$log.debug('order', order, 'updated');
            }
        });
      });
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
