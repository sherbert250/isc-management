(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _temperature_ranges = require('../data/temperature_ranges');

var _temperature_ranges2 = _interopRequireDefault(_temperature_ranges);

var _restroom_usages = require('../data/restroom_usages');

var _restroom_usages2 = _interopRequireDefault(_restroom_usages);

var _noise_preferences = require('../data/noise_preferences');

var _noise_preferences2 = _interopRequireDefault(_noise_preferences);

var _departments = require('../data/departments');

var _departments2 = _interopRequireDefault(_departments);

var _titles = require('../data/titles');

var _titles2 = _interopRequireDefault(_titles);

var _desk_inhabitancies = require('../data/desk_inhabitancies');

var _desk_inhabitancies2 = _interopRequireDefault(_desk_inhabitancies);

var _employees = require('../data/employees');

var _employees2 = _interopRequireDefault(_employees);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// Add Employee Controller
//
// Display a form for adding employees
//

exports.default = ['$scope', function ($scope) {
  $scope.employee = {
    firstName: '',
    lastName: '',
    email: '',
    teammates: [],
    temperaturePreference: '',
    department: '',
    title: '',
    restroomUsage: '',
    noisePreference: '',
    deskInhabitancy: '',
    whiteList: [],
    blackList: []
  };

  $scope.ranges = _temperature_ranges2.default;
  $scope.usages = _restroom_usages2.default;
  $scope.noises = _noise_preferences2.default;
  $scope.departments = _departments2.default;
  $scope.titles = _titles2.default;
  $scope.frequencies = _desk_inhabitancies2.default;
  $scope.teammates = _employees2.default;
  $scope.whiteList = _employees2.default;
  $scope.blackList = _employees2.default;

  $scope.loadTeamMembers = function (query) {
    $scope.relevantMembers = $scope.teammates.slice();
    for (var i = 0; i < $scope.relevantMembers; i++) {
      if (!$scope.relevantMembers[i].toLowerCase().includes(query.toLowerCase())) {
        $scope.relevantMembers.splice(i, 1);
        i--;
      }
    }
    return $scope.relevantMembers;
  };

  $scope.loadWhiteList = function (query) {
    $scope.relevantWhiteList = $scope.whiteList.slice();
    for (var i = 0; i < $scope.relevantWhiteList; i++) {
      if (!$scope.relevantWhiteList[i].toLowerCase().includes(query.toLowerCase())) {
        $scope.relevantWhiteList.splice(i, 1);
        i--;
      }
    }
    return $scope.relevantWhiteList;
  };

  $scope.loadBlackList = function (query) {
    $scope.relevantBlackList = $scope.blackList.slice();
    for (var i = 0; i < $scope.relevantBlackList; i++) {
      if (!$scope.relevantBlackList[i].toLowerCase().includes(query.toLowerCase())) {
        $scope.relevantBlackList.splice(i, 1);
        i--;
      }
    }
    return $scope.relevantBlackList;
  };
}];

},{"../data/departments":7,"../data/desk_inhabitancies":8,"../data/employees":9,"../data/noise_preferences":10,"../data/restroom_usages":11,"../data/temperature_ranges":13,"../data/titles":14}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//
// Home Controller
//
// The home page
//

exports.default = ['$scope', function ($scope) {
  $scope.message = 'Everyone come and see how good I look!';
}];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _account_nav_items = require('../settings/account_nav_items');

var _account_nav_items2 = _interopRequireDefault(_account_nav_items);

var _primary_nav_items = require('../settings/primary_nav_items');

var _primary_nav_items2 = _interopRequireDefault(_primary_nav_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// Main Controller
//
// Skeleton controller, included for every view
//

exports.default = ['$scope', '$route', '$routeParams', '$location', function ($scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  $scope.accountNavItems = _account_nav_items2.default;
  $scope.navLinkClass = function (path) {
    return $location.path() === path ? 'active' : '';
  };
  $scope.primaryNavItems = _primary_nav_items2.default;
}];

},{"../settings/account_nav_items":16,"../settings/primary_nav_items":17}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//
// Preferences Controller
//
// Allow user to modify their account
//

exports.default = ['$scope', function ($scope) {
  $scope.message = 'What would you like?';
}];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//
// Seating Charts Controller
//
// Display a list of created seating charts
// Provide actions to create/modify charts
//

exports.default = ['$scope', function ($scope) {
  $scope.message = 'What\'s it gonna be?';
}];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _team_members = require('../data/team_members');

var _team_members2 = _interopRequireDefault(_team_members);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// Team Members Controller
//
// Show a list of all team members
//

exports.default = ['$scope', function ($scope) {
  $scope.collection = _team_members2.default;
}];

},{"../data/team_members":12}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ["Marketing", "Social Media", "Management", "Web Development"];

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ["All the time", "Often", "Not very often", "Almost Never"];

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ["Darth Vader", "Luke Skywalker", "Princess Leia", "Han Solo", "Chewbacca", "Emperor Palpatine"];

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ["Loud", "Ambient", "Quiet", "Silent"];

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ["All the time", "Often", "Not very often", "Almost Never"];

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  id: 1,
  firstName: 'Allen',
  lastName: 'Kawanzaruwa',
  position: 'Genius',
  email: 'akawanza@asu.edu'
}, {
  id: 2,
  firstName: 'Daniel',
  lastName: 'Graca',
  position: 'Bad Boy',
  email: 'djgraca08@gmail.com'
}, {
  id: 3,
  firstName: 'Garrett',
  lastName: 'Gutierrez',
  position: 'Slayer',
  email: 'gdgutier@asu.edu'
}, {
  id: 4,
  firstName: 'Jack',
  lastName: 'Bankston',
  position: 'Captain',
  email: 'jeffwtribble@gmail.com'
}, {
  id: 5,
  firstName: 'Jeff',
  lastName: 'Tribble',
  position: 'Water Boy',
  email: 'jeffwtribble@gmail.com'
}, {
  id: 6,
  firstName: 'Jerry',
  lastName: 'Trayer',
  position: 'Chancellor',
  email: 'jtrayer1@asu.edu'
}];

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ["68-70", "71-73", "74-76", "77-79", "80-82"];

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ["Developer", "Analyst", "Manager", "President", "Director"];

},{}],15:[function(require,module,exports){
'use strict';

var _MainController = require('./controllers/MainController');

var _MainController2 = _interopRequireDefault(_MainController);

var _HomeController = require('./controllers/HomeController');

var _HomeController2 = _interopRequireDefault(_HomeController);

var _TeamMembersController = require('./controllers/TeamMembersController');

var _TeamMembersController2 = _interopRequireDefault(_TeamMembersController);

var _SeatingChartsController = require('./controllers/SeatingChartsController');

var _SeatingChartsController2 = _interopRequireDefault(_SeatingChartsController);

var _PreferencesController = require('./controllers/MyAccount/PreferencesController');

var _PreferencesController2 = _interopRequireDefault(_PreferencesController);

var _AddEmployeeController = require('./controllers/AddEmployeeController');

var _AddEmployeeController2 = _interopRequireDefault(_AddEmployeeController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// Modules
//

var iscApp = angular.module('iscApp', ['ngRoute', 'ngTagsInput', 'ui.bootstrap']);

//
// Controllers
//

iscApp.controller('MainController', _MainController2.default);
iscApp.controller('HomeController', _HomeController2.default);
iscApp.controller('TeamMembersController', _TeamMembersController2.default);
iscApp.controller('SeatingChartsController', _SeatingChartsController2.default);
iscApp.controller('PreferencesController', _PreferencesController2.default);
iscApp.controller('AddEmployeeController', _AddEmployeeController2.default);

//
// Routes
//

iscApp.config(function ($routeProvider, $locationProvider) {
  // define routes
  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController'
  }).when('/team-members', {
    templateUrl: 'views/team-members.html',
    controller: 'TeamMembersController'
  }).when('/seating-charts', {
    templateUrl: 'views/seating-charts.html',
    controller: 'SeatingChartsController'
  }).when('/my-account/preferences', {
    templateUrl: 'views/my-account/preferences.html',
    controller: 'PreferencesController'
  }).when('/add-employee', {
    templateUrl: 'views/add-employee.html',
    controller: 'AddEmployeeController'
  }).otherwise({
    redirectTo: '/'
  });
  // use html5 history api (no # in url)
  $locationProvider.html5Mode(true);
});

},{"./controllers/AddEmployeeController":1,"./controllers/HomeController":2,"./controllers/MainController":3,"./controllers/MyAccount/PreferencesController":4,"./controllers/SeatingChartsController":5,"./controllers/TeamMembersController":6}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//
// My Account Navigation Items
//

exports.default = [{
  href: '/my-account/preferences',
  text: 'Preferences'
}, {
  href: '/sign-out',
  text: 'Sign Out'
}];

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//
// Primary Navigation Items
//

exports.default = [{
  href: '/',
  text: 'Home'
}, {
  href: '/team-members',
  text: 'Team Members'
}, {
  href: '/seating-charts',
  text: 'Seating Charts'
}];

},{}]},{},[15])


//# sourceMappingURL=bundle.js.map
