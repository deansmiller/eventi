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


