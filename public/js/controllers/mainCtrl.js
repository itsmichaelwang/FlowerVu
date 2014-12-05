// js/controllers/mainCtrl.js
// Main Controller - Functionality is here
var app = angular.module('flowerShop', []);

app.controller('mainCtrl', ['$scope','$http', function($scope,$http) {
	
	var salesData = null;
	var currentDate = new Date(2012, 2, 3);
	$scope.todaySales = null;

	$http.get('resources/flowers.json')
		.success(function (data) {
			salesData = data;
			console.log(data);

			$scope.todaySales = getTodaySales(salesData, currentDate);
			console.log($scope.todaySales);

		})
		.error(function (data, status, headers, config) {
			// Exception handling
		});

	getTodaySales = function(salesData, currentDate) {
		todaySales = [];
		for (var day in salesData) {
			var date = Date.parse(day.date);
			console.log(date);
			console.log(currentDate);
			if (date == currentDate) {
				todaySales.push(day);
			}
		}

		return todaySales;
	}
		

}]);