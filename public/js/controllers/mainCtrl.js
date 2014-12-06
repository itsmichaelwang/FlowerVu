// js/controllers/mainCtrl.js
// Main Controller - Functionality is here
var app = angular.module('flowerVu', ['angularMoment']);

app.filter('capitalize', function() {
	return function(input, scope) {
		if (input != null) {
			input = input.toLowerCase();
		}
		return input.substring(0,1).toUpperCase() + input.substring(1);
	}
});

app.controller('mainCtrl', ['$scope','$http', function($scope,$http) {
	
	$scope.salesData = null;
	$scope.currentDate = moment("2/3/2012", "MM/DD/YYYY")
	$scope.todaySales = null;

	$http.get('resources/flowers.json')
		.success(function (data) {
			$scope.salesData = data;
			console.log(data);
		})
		.error(function (data, status, headers, config) {
			// Exception handling
		});

	// Return all sales data that matches current date
	getTodaySales = function(salesData, currentDate) {
		todaySales = [];
		for (var i in salesData) {
			var date = moment(salesData[i].date, "MM/DD/YYYY");

			if (date.isSame(currentDate)) {
				todaySales.push(salesData[i]);
			}
		}

		return todaySales;
	}
		

}]);