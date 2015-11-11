//isc.config(function($routeProvider, $locationProvider) {
//	$routeProvider.when('/', {
//		templateUrl: 'resources/templates/sample.html',
//		controller: 'sampleController'
//	})
//});
//isc-management/src/main/webapp/resources/templates/sample.html
//isc-management/src/main/webapp/resources/controllers/sampleController.js

isc.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'resources/templates/sample.html',
		controller : 'sampleController'
	})
});