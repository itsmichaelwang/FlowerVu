// js/controllers/mainCtrl.js
// Main Controller - Functionality is here
var app = angular.module('flowerVu', ['angularMoment', 'tc.chartjs']);

app.filter('capitalize', function() {
	return function(input, scope) {
		if (input != null) {
			input = input.toLowerCase();
		}
		return input.substring(0,1).toUpperCase() + input.substring(1);
	}
});

app.controller('mainCtrl', ['$scope','$http', function($scope,$http) {
	
	$scope.salesData = [];

	$scope.myData = {};
	$scope.myOptions = {
		responsive: true,
		bezierCurve: false
	}

	$http.get('resources/flowers.json')
		.success(function (data) {
			$scope.salesData = data;
			console.log(data);

			setChartData(data)
		})
		.error(function (data, status, headers, config) {
			// Exception handling
		});

	setChartData = function(data) {
		var salesByFlower = {};
		var dateArray = [];

		for (var i in data) {
			// covert json object into dictionary
			value = data[i];
			key = value.flower;

			if (key in salesByFlower) {
				salesByFlower[key].push(value);
			} else {
				salesByFlower[key] = new Array();
				salesByFlower[key].push(value);
			}

			// create array that matches dates to graph position
			date = value.date;
			if (dateArray.indexOf(date) == -1) {
				dateArray.push(date);
			}
		}

		// cycle through dictionary and create chart dataset
		$scope.myData.labels = dateArray;
		$scope.myData.datasets = [];

		for (var flower in salesByFlower) {
			if (salesByFlower.hasOwnProperty(flower)) {

				var flowerDataSet = {
					label: flower,
					fillColor: "rgba(220,220,220,0.2)",
            		strokeColor: "rgba(220,220,220,1)",
            		pointColor: "rgba(220,220,220,1)",
            		pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: []
				}

				flowerArray = salesByFlower[flower];
				for (var i in flowerArray) {
					flowerDataSet.data.push(flowerArray[i]['quantity-sold']);
				}

				$scope.myData.datasets.push(flowerDataSet);
			}
		}
	}
}]);