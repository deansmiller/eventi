/**
 * Created by deansmiller on 05/07/16.
 */

(function() {
    'use strict';

    angular.module('Eventi.Services.Connectors', ["ui.bootstrap"])

        .service("ConnectorsService", ["$uibModal", "$http", function ($uibModal, $http) {

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
                location.href = "login/facebook";


            }

            function getExistingConnections(){
                $http.get("/user").success(function(data) {
                    self.user = data.userAuthentication.details.name;
                    console.log(data);
                    self.authenticated = true;

                    $http.get("/test").success(function(resp){
                        console.log(resp);
                    }).error(function(e){
                        console.log(e);
                    })

                }).error(function() {
                    self.user = "N/A";
                    self.authenticated = false;
                });
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
