angular
  .module("app")
  .controller("ticketsCtrl", function($scope, $uibModal, $rootScope, Tickets) {
    $scope.tickets = Tickets.query();

    $scope.confirmdelete = function(inticket, msg) {
      console.log("confirmdelete modal");
      console.log(inticket.subject);
      modalInstance = $uibModal.open({
        controller: "ConfirmInstanceCtrl",
        controllerAs: "pc",
        animation: true,
        ariaLabelledBy: "modal-title",
        ariaDescribedBy: "modal-body",
        templateUrl: "ConfirmModal.html",
        backdrop: "static",
        resolve: {
          text: function() {
            return msg;
          }
        }
      });

      modalInstance.result.then(
        function(ticket) {
          console.log("confirm Modal OK clicked");
          console.log(inticket);
          // deletion from list
          // deletion from database
          inticket.$delete();
          $scope.tickets = Tickets.query();
        },
        function() {
          console.log("ConfirmModal dismissed");
        }
      );

      $rootScope.modalInstance = modalInstance;
    };

    $scope.openedit = function(inticket) {
      if (inticket) {
        $rootScope.modaltitle = "Edit ticket";
        // create copy
        ticket = {
          _id: inticket._id,
          subject: inticket.subject,
          description: inticket.description
        };
      } else {
        $rootScope.modaltitle = "New ticket";
        ticket = inticket;
      }

      modalInstance = $uibModal.open({
        // controller used for modal window
        controller: "EditInstanceCtrl",
        controllerAs: "$ctrl",
        animation: true,
        ariaLabelledBy: "modal-title",
        ariaDescribedBy: "modal-body",
        templateUrl: "tickets/tickets_modal.html",
        // value passed to controller as local variable
        resolve: {
          ticket: function() {
            return ticket;
          }
        }
      });

      modalInstance.result.then(
        function(ticket) {
          console.log("Modal OK clicked");
          console.log(ticket);
          // insertion to list on screen
          if (ticket._id) {
            //
            // change in list

            console.log("UPDATE");
            Tickets.update(ticket);
            $scope.tickets = Tickets.query();
          } else {
            Tickets.save(ticket, function(resticket) {
              if (resticket) {
                $scope.tickets.push(resticket);
              }
            }); // save to database
          }
        },
        function() {
          console.log("Modal dismissed");
        }
      );

      $rootScope.modalInstance = modalInstance;
    };
  })
  .controller("EditInstanceCtrl", function($uibModalInstance, ticket) {
    var $ctrl = this;
    $ctrl.ticket = ticket;
    $ctrl.ok = function() {
      console.log("Instance OK");
      console.log($ctrl.ticket);
      $uibModalInstance.close($ctrl.ticket);
    };
    $ctrl.cancel = function() {
      $uibModalInstance.dismiss();
    };
  });
