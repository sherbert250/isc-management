import temperatureRanges from '../data/temperature_ranges';
import restroomUsages from '../data/restroom_usages';
import noisePreferences from '../data/noise_preferences';
import departmentsList from '../data/departments';
import titlesList from '../data/titles';
import inhabitancies from '../data/desk_inhabitancies';
import employees from '../data/employees';

//
// Add Employee Controller
//
// Display a form for adding employees
//

export default ['$scope', ($scope) => {
  $scope.employee = {
  	firstName : '',
  	lastName : '',
  	email : '',
  	teammates : [],
  	temperaturePreference : '',
  	department : '',
  	title : '',
  	restroomUsage : '',
  	noisePreference : '',
  	deskInhabitancy : '',
  	whiteList : [],
  	blackList : []
  };

  $scope.ranges = temperatureRanges;
  $scope.usages = restroomUsages;
  $scope.noises = noisePreferences;
  $scope.departments = departmentsList;
  $scope.titles = titlesList;
  $scope.frequencies = inhabitancies;
  $scope.teammates = employees;
  $scope.whiteList = employees;
  $scope.blackList = employees;

  $scope.loadTeamMembers = function(query) {
  	$scope.relevantMembers = $scope.teammates.slice();
  	for (var i = 0; i < $scope.relevantMembers; i++) {
  		if(!$scope.relevantMembers[i].toLowerCase().includes(query.toLowerCase())) {
  			$scope.relevantMembers.splice(i, 1);
  			i--;
  		}
  	}
  	return $scope.relevantMembers;
  }

  $scope.loadWhiteList = function(query) {
  	$scope.relevantWhiteList = $scope.whiteList.slice();
  	for (var i = 0; i < $scope.relevantWhiteList; i++) {
  		if(!$scope.relevantWhiteList[i].toLowerCase().includes(query.toLowerCase())) {
  			$scope.relevantWhiteList.splice(i, 1);
  			i--;
  		}
  	}
  	return $scope.relevantWhiteList;
  }

  $scope.loadBlackList = function(query) {
  	$scope.relevantBlackList = $scope.blackList.slice();
  	for (var i = 0; i < $scope.relevantBlackList; i++) {
  		if(!$scope.relevantBlackList[i].toLowerCase().includes(query.toLowerCase())) {
  			$scope.relevantBlackList.splice(i, 1);
  			i--;
  		}
  	}
  	return $scope.relevantBlackList;
  }
}];
