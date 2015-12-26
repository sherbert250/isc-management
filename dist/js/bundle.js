(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"../settings/account_nav_items":10,"../settings/primary_nav_items":11}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"../data/team_members":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _employees = require('../data/employees');

var _employees2 = _interopRequireDefault(_employees);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// View Employees Controller
//
// Show a list of employees
//

exports.default = ['$scope', function ($scope) {
  $scope.emps = _employees2.default;
  $scope.positions = [{
    'position': 'CEO'
  }, {
    'position': 'Manager'
  }, {
    'position': 'Developer'
  }];
  $scope.orderProperty = 'firstName';
  $scope.setOrderProperty = function (propertyName) {
    if ($scope.orderProperty === propertyName) {
      $scope.orderProperty = '-' + propertyName;
    } else if ($scope.orderProperty === '-' + propertyName) {
      $scope.orderProperty = propertyName;
    } else {
      $scope.orderProperty = propertyName;
    }
    return $scope.orderProperty;
  };
}];

},{"../data/employees":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  id: 1,
  firstName: 'Allen',
  lastName: 'Kawanzaruwa',
  position: 'Developer',
  temp: '76'
}, {
  id: 2,
  firstName: 'Daniel',
  lastName: 'Graca',
  position: 'Developer',
  temp: '72'
}, {
  id: 3,
  firstName: 'Garrett',
  lastName: 'Gutierrez',
  position: 'Developer',
  temp: '74'
}, {
  id: 4,
  firstName: 'Jack',
  lastName: 'Bankston',
  position: 'Developer',
  temp: '75'
}, {
  id: 5,
  firstName: 'Jeff',
  lastName: 'Tribble',
  position: 'Developer',
  temp: '76'
}, {
  id: 6,
  firstName: 'Jerry',
  lastName: 'Trayer',
  position: 'Developer',
  temp: '74'
}, {
  id: 7,
  firstName: 'Bob',
  lastName: 'Dylan',
  position: 'Manager',
  temp: '76'
}, {
  id: 8,
  firstName: 'Inspector',
  lastName: 'Gadget',
  position: 'CEO',
  temp: '74'
}];

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

var _ViewEmployeesController = require('./controllers/ViewEmployeesController');

var _ViewEmployeesController2 = _interopRequireDefault(_ViewEmployeesController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// Modules
//

var iscApp = angular.module('iscApp', ['ngRoute']);

//
// Controllers
//

iscApp.controller('MainController', _MainController2.default);
iscApp.controller('HomeController', _HomeController2.default);
iscApp.controller('TeamMembersController', _TeamMembersController2.default);
iscApp.controller('SeatingChartsController', _SeatingChartsController2.default);
iscApp.controller('ViewEmployeesController', _ViewEmployeesController2.default);
iscApp.controller('PreferencesController', _PreferencesController2.default);

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
  }).when('/view-employees', {
    templateUrl: 'views/view-employees.html',
    controller: 'ViewEmployeesController'
  }).otherwise({
    redirectTo: '/'
  });
  // use html5 history api (no # in url)
  $locationProvider.html5Mode(true);
});

},{"./controllers/HomeController":1,"./controllers/MainController":2,"./controllers/MyAccount/PreferencesController":3,"./controllers/SeatingChartsController":4,"./controllers/TeamMembersController":5,"./controllers/ViewEmployeesController":6}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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
}, {
  href: '/view-employees',
  text: 'View Employees'
}];

},{}]},{},[9])


//# sourceMappingURL=bundle.js.map
