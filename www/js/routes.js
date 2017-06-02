angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('menu.singKMou', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/singKMou.html',
        controller: 'singKMouCtrl'
      }
    }
  })

  .state('menu.booking', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/booking.html',
        controller: 'bookingCtrl'
      }
    }
  })

  .state('menu.historyOfBooking', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/historyOfBooking.html',
        controller: 'historyOfBookingCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

$urlRouterProvider.otherwise('/side-menu21/page1')


});