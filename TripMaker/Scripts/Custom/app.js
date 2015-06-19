(function () {
    var app = angular.module('TripMaker', []);

    app.factory('tripService', function () {
        var trips = [];
        var subscribers = [];

        return {
            saveTrips:function (data) {
                trips.push(data);               
            },
            getTrips:function () {
                return trips;
            },
            saveSubsriber: function (data) {
                subscribers.push(data);                            
            },
            getSubsribers: function () {
                return subscribers;
            }
        }});


    app.controller('SubscriberController', ['$scope', '$http', 'tripService', function ($scope, $http, tripService) {
        $scope.subscriber = { "userid": "" , 'name': ''};
        $scope.subscribername = '';
        $scope.tripname = '';
        $scope.trip = { 'tripid': '', 'name': '' }
        $scope.successmessage = '';

        $scope.extractUIDFromURL = function (url) {
            splitArray = url.split('/');
            return splitArray[splitArray.length - 1]
        };

        $scope.usertrip = {
            "userId": "",
            "tripId": ""
        };
        $scope.registeredSubscribers = tripService.getSubsribers();
        $scope.allTrips = tripService.getTrips();
        $scope.message = '';
        var OnSubscriberCreation = function (response) {           
            var subxkribr = { 'subscriberid': $scope.extractUIDFromURL(response.data.links[0].href), 'name': response.data.links[0].name }
            tripService.saveSubsriber(subxkribr);
            $scope.successmessage = 'Subscriber created';
        };

        var OnTripCreation = function (response) {
            var tripp = { 'tripid': $scope.extractUIDFromURL(response.data.links[0].href), 'name': response.data.links[0].name }
            tripService.saveTrips(tripp);
            $scope.successmessage = 'Trip created';
        };

        var OnUserTripCreation = function (response) {
            var userTripp = { 'usertripid': $scope.extractUIDFromURL(response.data.links[0].href), 'name': response.data.links[0].name }
            console.log(userTripp);
            $scope.successmessage = 'Trip was associated with subscriber : ' + response.data.links[0].href + ', ' + response.data.links[0].name ;
        };


        var OnError = function (response) {
            $scope.message = response.data;           
        };


        $scope.CreateSubscriber = function () {            
            $http.post("http://api.doactively.com/v1/TripSubscriber", $scope.subscriber).then(OnSubscriberCreation, OnError);
            console.log($scope.subscriber.userid);
        };

        $scope.CreateT = function () {
            $http.post("http://api.doactively.com/v1/Trip", $scope.trip).then(OnTripCreation, OnError);
            console.log($scope.trip.name);
        };

        $scope.CreateUT = function () {
            $scope.usertrip.userId = $scope.subscribername.subscriberid;
            $scope.usertrip.tripid = $scope.tripname.tripid;
            $http.post("http://api.doactively.com/v1/UserTrip", $scope.usertrip).then(OnUserTripCreation, OnError);
           
        };

    }]);
}()
)