angular
  .module("app")
  .controller("usersCtrl", function($scope, $uibModal, $rootScope, Users) {
    $scope.users = Users.query();
    //console.log ('user init');

    $scope.confirmdelete = function(inuser, msg) {
      console.log("confirm delete modal");
      console.log(inuser.name);
      modalInstance = $uibModal.open({
        controller: "ConfirmInstanceCtrl",
        controllerAs: "pc",
        animation: true,
        ariaLabelledBy: "modal-title",
        ariaDescribedBy: "modal-body",
        templateUrl: "ConfirmModal.html",
        resolve: {
          text: function() {
            return msg;
          }
        }
      });

      modalInstance.result.then(
        function(user) {
          console.log("confirm Modal OK clicked");
          console.log(inuser);
          inuser.$delete();
          $scope.users = Users.query();
        },
        function() {
          console.log("ConfirmModal dismissed");
        }
      );

      $rootScope.modalInstance = modalInstance;
    };

    $scope.openedit = function(inuser) {
      console.log("Open modal edit");
      if (inuser) {
        $scope.modaltitle = "Edit user";
        // create copy
        user = {
          _id: inuser._id,
          name: inuser.name,
          username: inuser.username,
          email: inuser.email,
          role: inuser.role
        };
      } else {
        $rootScope.modaltitle = "New user";
        user = inuser;
      }
      console.log(user);

      modalInstance = $uibModal.open({
        // modal window controller
        controller: "UserEditInstanceCtrl",
        controllerAs: "$ctrl",
        animation: true,
        ariaLabelledBy: "modal-title",
        ariaDescribedBy: "modal-body",
        templateUrl: "users/users_modal.html",
        // value passed to controller as local variable
        resolve: {
          user: function() {
            return user;
          }
        }
      });

      modalInstance.result.then(
        function(user) {
          console.log("Modal OK clicked");
          console.log(user);
          // insert to list on screen
          if (user._id) {
            //list changes
            Users.update(user);
            $scope.users = Users.query();
          } else {
            Users.insert(user, function(resuser) {
              if (resuser) {
                $scope.users.push(resuser);
              }
            });

            // save to database
          }
        },
        function() {
          console.log("Modal dismissed");
        }
      );

      $rootScope.modalInstance = modalInstance;
    };
  })
  .controller("UserEditInstanceCtrl", function($uibModalInstance, user) {
    console.log("instance init");
    var $ctrl = this;
    $ctrl.user = user;
    $ctrl.ok = function() {
      console.log("Instance OK");
      console.log($ctrl.user);
      $uibModalInstance.close($ctrl.user);
    };
    $ctrl.cancel = function() {
      $uibModalInstance.dismiss();
    };
  });
