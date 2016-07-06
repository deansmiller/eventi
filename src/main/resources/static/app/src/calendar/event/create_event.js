/**
 * Created by deansmiller on 12/04/16.
 */

(function(){
    'use strict';

    angular.module('Eventi.Event', [])


        .controller('CreateEventCtrl', ["$scope", "date", "$uibModalInstance", function ($scope, date, $uibModalInstance) {

            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            $scope.event = {
                start: date,
                end: new Date(y, m, d + 1),
                allDay: false
            };

            $scope.save = function(){
                $uibModalInstance.close($scope.event);
            };

            $scope.cancel = function(){
                $uibModalInstance.dismiss();
            }

        }]);

}());



