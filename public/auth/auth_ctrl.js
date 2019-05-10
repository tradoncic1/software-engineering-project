angular.module('app')
.controller ('authCtrl', function ($scope, $rootScope,$location, Login, $http){
  $scope.loged= $rootScope.loged || false;
  // token authentication
  
  $scope.login = function () {
      Login.save({username:$scope.username,password:$scope.password}, function(loginres){
       // console.log(loginres);
        if (loginres.success) {
          // successful login attempt
         
          localStorage.setItem('user',loginres.token);
          localStorage.setItem('userid',loginres.userid);
          localStorage.setItem('isadmin',loginres.isadmin);
          localStorage.setItem('token',loginres.token);

          $scope.error = null;
          $http.defaults.headers.common['Authorization'] =  loginres.token;
          
          $rootScope.appuser = loginres.userid;
          $rootScope.loged   = true;
          $rootScope.isadmin = loginres.isadmin;
     
          $scope.loged = true;
          $location.path('/tickets');
        } else {
          $scope.error = loginres.message;
        };
      });
  };

  $scope.logout = function () {
    console.log('logout');
    // deleting the token from the local storage and the http header for logout purposes
    localStorage.removeItem('user');
    localStorage.removeItem('isadmin');
    localStorage.removeItem('userid');
    delete $http.defaults.headers.common.Authorization;
    $rootScope.loged=false;
    $rootScope.isadmin=false;
    $scope.loged = false;
    $scope.password = null;
  };
 
})
;