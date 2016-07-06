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




