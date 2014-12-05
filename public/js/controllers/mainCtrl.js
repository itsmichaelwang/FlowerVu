// js/controllers/mainCtrl.js
// Main Controller - Functionality is here
var app = angular.module('flowerShop', []);

app.controller('mainCtrl', ['$scope','$http', function($scope,$http) {
	var currentDate = moment.format("2/3/2012",'MM/DD/YYYY');
	console.log(currentDate);

	$scope.test = 'Hello world!';
	$scope.flowersList = null;

	$http.get('resources/flowers.json')
		.success(function (data) {
			console.log("Great success!");
			$scope.flowersList = data;
		})
		.error(function (data, status, headesr, config) {
			console.log("No bueno");
		});


}]);