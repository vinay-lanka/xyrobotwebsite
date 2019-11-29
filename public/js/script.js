var app = angular.module('robotApp', []);
app.controller('pointsCtrl', function($scope, $http) {
  $scope.showCoordinateCardVar = false;
  $scope.showPointsCardVar = true;
  $scope.sendPoints = function(number) {
    console.log(number);
    $http.post("/setpoints", {points:number})
    .then(function(response) {
        $scope.points = response.data;
        var range = [];
        var x=0,y=0;
        for(var i=1;i<=response.data;i++) {
          range.push({x,y});
        }
        $scope.range = range;
        console.log(response.data);
        $scope.showCoordinateCardVar = true;
        $scope.showPointsCardVar = false;
    });
  }

  $scope.back = function(number) {
    console.log($scope.range)
    $scope.showCoordinateCardVar = false;
    $scope.showPointsCardVar = true;
  }

  $scope.submit = function(number) {
    console.log($scope.range)
    $http.post("/submit", $scope.range)
    .then(function(response) {
      console.log(response);
      alert(response.data);
        $scope.showCoordinateCardVar = false;
        $scope.showPointsCardVar = true;
    });
  }
});