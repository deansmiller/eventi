/**
 * Created by deansmiller on 05/07/16.
 */

/**
 * Created by deansmiller on 05/07/16.
 */

(function() {
    'use strict';

    angular.module('Eventi.Services.Modals', ["ui.bootstrap"])

        .service("Modals", ["$uibModal", function ($uibModal) { // factory or service?

            function open(templateUrl, ctrl, size, callback){

                var modalInstance = $uibModal.open({
                    templateUrl: templateUrl,
                    controller: ctrl,
                    size: size
                });

                modalInstance.result.then(function(response){
                    callback(response);

                }, function () {

                });
            }

            return {
                open: open
            }
        }])



}());

