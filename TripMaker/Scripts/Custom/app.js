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
        $scope.subscriber = { "userid": "" };
        $scope.subscribername = '';
        $scope.tripname = '';
        $scope.trip = { "name": "" }
        $scope.usertrip = {
            "userId": "dfae1558-a6d8-4bf5-9e51-23bbe0a7e2d2",
            "tripId": "3492b76f-fecc-4f89-9763-9dfdd864ae27"
        };
        $scope.registeredSubscribers = ['Sub1', 'Sub12', 'Sub51'];
            //tripService.getSubsribers();
        $scope.allTrips = ['Tr1', 'Tr2', 'Tr3']; // tripService.getTrips();
        $scope.message = '';
        var OnSubscriberCreation = function (response) {           
            tripService.saveSubsriber(response.data.links[0].name);
            $scope.message = response.data;
            
        };

        var OnSubscriberCreationT = function (response) {
            tripService.saveTrips(response.data.links[0].name);
            $scope.message = response.data;
        };

        var OnError = function (response) {
            $scope.message = response.data;           
        };


        $scope.CreateSubscriber = function () {            
            $http.post("http://api.doactively.com/v1/TripSubscriber", $scope.subscriber).then(OnSubscriberCreation, OnError);
            console.log($scope.subscriber.userid);
        };

        $scope.CreateT = function () {
            $http.post("http://api.doactively.com/v1/Trip", $scope.trip).then(OnSubscriberCreationT, OnError);
            console.log($scope.trip.name);
        };

        $scope.CreateUT = function () {
            $http.post("http://api.doactively.com/v1/UserTrip", $scope.usertrip).then(OnSubscriberCreation, OnError);
           
        };





    }]);
}()
)