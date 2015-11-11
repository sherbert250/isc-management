isc.controller('sampleController', function($scope, $http, $routeParams) {
	$scope.i = 0;
	$scope.runRequest = function() {
		$scope.displayText = "request sent";
		$http.get('hello').success(function(data, status, headers, config) {
			$scope.displayText = data;
		}).error(function(data, status, headers, config) {
			alert('Page did not load correctly. Please refresh your browser.');
		});
	}
})