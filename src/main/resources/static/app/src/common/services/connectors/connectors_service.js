/**
 * Created by deansmiller on 05/07/16.
 */

(function() {
    'use strict';

    angular.module('Eventi.Services.Connectors', ["ui.bootstrap"])

        .service("ConnectorsService", ["$uibModal", "$http", "$location", function ($uibModal, $http, $location) {

            getExistingConnections();

            function openConnectorsModal(){

                var modalInstance = $uibModal.open({
                    templateUrl: 'app/src/common/services/connectors/connectors_modal.html',
                    controller: 'ConnectorsModalCtrl',
                    size: "md"
                });

                modalInstance.result.then(function(event){
                    if(angular.isDefined(event)){

                    }

                }, function () {

                });

            }


            function addConnector(connector){
                console.log("Added:", connector);
                $http.get("/test").success(function(response){
                    location.href = response.loginUrl; // angular $location?
                }).error(function(e){
                    console.log(e);
                });



            }

            function getExistingConnections(){
                var len = location.search.length;

                console.log(location.search.substring(6, len));

                //$http.get("/user").success(function(data) {
                //    self.user = data.userAuthentication.details.name;
                //    console.log(data);
                //    self.authenticated = true;
                //
                //}).error(function() {
                //    self.user = "N/A";
                //    self.authenticated = false;
                //});
            }


            function getAvailableConnectors(){
                return [
                    {
                        title: "Spotify",
                        logo: "app/img/spotify.png"
                    },
                    {
                        title: "Facebook",
                        logo: "app/img/facebook.jpg"
                    },
                    {
                        title: "Google",
                        logo: "app/img/google.jpg"
                    },
                    {
                        title: "TfL",
                        logo: "app/img/tfl.png"
                    }
                ]
            }

            return {
                openModal: openConnectorsModal,
                getAvailableConnectors: getAvailableConnectors,
                addConnector: addConnector,
                getConnections: getExistingConnections
            }
        }])

        .controller('ConnectorsModalCtrl',
            ["$scope", "$uibModal", "ConnectorsService", function ($scope, $uibModal, ConnectorsService) {

                $scope.connectors = ConnectorsService.getAvailableConnectors();

                $scope.addConnector = function(connector){
                    ConnectorsService.addConnector(connector);
                }

        }]);


}());
