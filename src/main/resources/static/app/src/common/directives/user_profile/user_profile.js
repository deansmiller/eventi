/**
 * Created by deansmiller on 05/07/16.
 */

(function() {

    'use strict';

    angular.module("Eventi.Directives.UserProfileMenu", ["Eventi.Services.Connectors"])
        .directive("userProfileMenu", function(ConnectorsService) {

            return {
                restrict: "E",
                templateUrl: "app/src/common/directives/user_profile/user_profile.html",
                controller: function($scope) {

                    $scope.openConnectorsModal = function(){
                        ConnectorsService.openModal();
                    };


                    $scope.toggled = function(open){

                    };

                }
            }

        });

})();
