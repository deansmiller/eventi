(function(){
    "use strict";

    angular.module("Eventi", [
            "ngRoute",
            "Eventi.Feed",
            "Eventi.Calendar",
            "Eventi.Event",
            "Eventi.Services.Modals",
            "Eventi.Services.Connectors",
            "Eventi.Directives.UserProfileMenu"
        
        ])

        .config(["$routeProvider", function ($routeProvider) {

            $routeProvider.when("/calendar", {
                templateUrl: "app/src/calendar/calendar.html",
                controller: "CalendarCtrl"
            });

            $routeProvider.when("/feed", {
                templateUrl: "app/feed/feed.html",
                controller: "FeedCtrl"
            });

            $routeProvider.otherwise({redirectTo: "/calendar"});

        }])
        .run(["$rootScope", "$window", function($rootScope, $window) {

            $window.fbAsyncInit = function() {
                FB.init({
                    appId      : "1108938715843096",
                    xfbml      : true,
                    version    : "v2.3"
                });
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, "script", "facebook-jssdk"));


        }]);
}());





(function(){
    'use strict';

    angular.module('Eventi.Calendar', ['ngRoute', 'ui.calendar', "ui.bootstrap"])

        .controller('CalendarCtrl', ["$scope", "$uibModal", function ($scope, $uibModal) {

            $scope.eventSource = {
                url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
                className: 'gcal-event',           // an option!
                currentTimezone: 'America/Chicago' // an option!
            };

            /* event source that contains custom events on the scope */
            $scope.events = [];


            $scope.dayClick = function(dateCell){

                var modalInstance = $uibModal.open({
                    templateUrl: 'app/src/calendar/event/create_event.html',
                    controller: 'CreateEventCtrl',
                    size: "m",
                    resolve: {
                        date: function () {
                            return new Date(dateCell._d);
                        }
                    }
                });

                modalInstance.result.then(function(event){
                    if(angular.isDefined(event)){
                        $scope.events.push(event);
                        console.log(event);
                    }

                }, function () {
                    // TODO
                });

            };


            $scope.eventClick = function(event){
                console.log(event);
                $scope.event = event;
            };


            $scope.uiConfig = {
                calendar: {
                    height: 450,
                    editable: true,
                    header: {
                        left: 'month basicWeek basicDay agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    dayClick: $scope.dayClick,
                    eventClick: $scope.eventClick
                }
            };

            $scope.eventSources = [$scope.events, $scope.eventSource];
        }]);



///* alert on eventClick */
//$scope.alertOnEventClick = function (date, jsEvent, view) {
//    $scope.alertMessage = (date.title + ' was clicked ');
//};
///* alert on Drop */
//$scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
//    $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
//};
///* alert on Resize */
//$scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
//    $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
//};

}());



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


(function(){
    'use strict';

    angular.module('Eventi.Feed', [])


        .controller('FeedCtrl', ["$scope", function ($scope) {
            console.log("in")

        }])

}());


