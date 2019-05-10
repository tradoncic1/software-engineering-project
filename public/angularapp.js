angular.module('app', ['ngRoute', 'ngResource','ui.bootstrap'])
// Routes
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller : 'homeCtrl'
    })
    .when('/login', {
        templateUrl: '/auth/login.html',
        controller : 'authCtrl'
      })
    .when('/users', {
        templateUrl: '/users/users.html',
        controller : 'usersCtrl'
    })
    .when('/register', {
        templateUrl: '/register/register.html',
        controller : 'registerCtrl'
      })
    .when('/tickets', {
        templateUrl: '/tickets/tickets.html',
        controller : 'ticketsCtrl'
    })
    .when('/tickets/:id', {
        templateUrl: '/ticketdet/ticketdet.html',
        controller : 'ticketDetCtrl',
        /*resolve : {
          //This function is injected with the AuthService where you'll put your authentication logic
          'auth' : function(AuthService){
              return AuthService.authenticate();
          }
        }*/
      })
}])

// globalni kontroleri za cijelu aplikaciju
// kontroler za ConfirmMoldal
.controller('ConfirmInstanceCtrl', function ($uibModalInstance,text) {
  console.log('confirminstance');
  this.confirmtext = text
  this.ok = function () {
    $uibModalInstance.close('ok');
  };

  this.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});