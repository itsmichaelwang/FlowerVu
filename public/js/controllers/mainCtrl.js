// js/controllers/mainCtrl.js
// Main Controller - Functionality is here
var app = angular.module('flowerVu', ['angularMoment', 'tc.chartjs']);

app.filter('capitalize', function() {
	return function(input, scope) {
		if (input == null) {
			return null;
		} else {
			input = input.toLowerCase();
			return input.substring(0,1).toUpperCase() + input.substring(1);
		}
	}
});

app.controller('mainCtrl', ['$scope','$http', function($scope,$http) {
	
	$scope.parseInt = parseInt;		// pass to html for calculating total qty
	$scope.salesData = [];

	$http.get('resources/flowers.json')
		.success(function (data) {
			$scope.salesData = data;
			console.log(data);

			setChartData(data)
		})
		.error(function (data, status, headers, config) {
			// Exception handling
		});

	// ChartJS data/options objects
	$scope.myDataSales = {};
	$scope.myDataInv = {};
	$scope.myOptions = {
		responsive: true,
		bezierCurve: false,
		scaleOverride: true,
		scaleSteps: 5,
		scaleStepWidth: 20,
		scaleStartValue: 0,
		legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
   	};
   	
	// used to map colors to ChartJS themes
	chartColorHash = {
		rose: {
			fillColor: "rgba(239,89,123,0)",
			strokeColor: "rgba(239,89,123,1)",
			pointColor: "rgba(239,89,123,1)",
    		pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(239,89,123,1)"
		},

		tulip: {
			fillColor: "rgba(220,220,220,0)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
    		pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)"
		},

		dandelion: {
			fillColor: "rgba(225,212,100,0)",
			strokeColor: "rgba(225,212,100,1)",
			pointColor: "rgba(225,212,100,1)",
    		pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(225,212,100,1)"
		}
	}

	setChartData = function(data) {
		var salesByFlower = {};
		var dateArray = [];

		for (var i in data) {
			// covert loaded json object into dictionary by flower type
			value = data[i];
			key = value.flower;

			if (key in salesByFlower) {
				salesByFlower[key].push(value);
			} else {
				salesByFlower[key] = new Array();
				salesByFlower[key].push(value);
			}

			// create array of dates to load to graph for x-axis
			date = value.date;
			if (dateArray.indexOf(date) == -1) {
				dateArray.push(date);
			}
		}

		// cycle through dictionary and create chart dataset
		$scope.myDataSales.labels = dateArray;
		$scope.myDataSales.datasets = [];

		$scope.myDataInv.labels = dateArray;
		$scope.myDataInv.datasets = [];

		// iterating through flowers in dictionary, pushing data to the two separate graphs
		for (var key in salesByFlower) {
			if (salesByFlower.hasOwnProperty(key)) {

				var dataSetSales = {
					label: key,
					fillColor: chartColorHash[key].fillColor,
            		strokeColor: chartColorHash[key].strokeColor,
            		pointColor: chartColorHash[key].pointColor,
            		pointStrokeColor: chartColorHash[key].pointStrokeColor,
		            pointHighlightFill: chartColorHash[key].pointHighlightFill,
		            pointHighlightStroke: chartColorHash[key].pointHighlightStroke,
		            data: []
				};
				var dataSetInv = JSON.parse(JSON.stringify(dataSetSales));

				flowerSales = salesByFlower[key];
				for (var i in flowerSales) {
					dataSetSales.data.push(flowerSales[i]['quantity-sold']);
					dataSetInv.data.push(parseInt(flowerSales[i]['quantity-sold']) +
										   parseInt(flowerSales[i]['quantity-unsold']));
				}

				$scope.myDataSales.datasets.push(dataSetSales);
				$scope.myDataInv.datasets.push(dataSetInv)
			}
		}
	}

	// TABLE LOGIC
	$scope.gridFilter = ['-date', '-flower'];
	$scope.flipDate = function() {
		$scope.gridFilter[0] = flipString($scope.gridFilter[0]);
	}

	// Flip an angularJS string sort key
	function flipString(str) {
		if (str[0] == '-') {
			str = str.substr(1);
		} else {
			str = '-' + str;
		}
		return str;
	}

	// Return a symbol depending on ascending or descending sort
	$scope.getSymbol = function(str) {
		if (str[0] == '-') {
			return "▼";
		} else {
			return "▲";
		}
	}

}]);