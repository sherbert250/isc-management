import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';
import states from '../settings/states';

//
// Add Office Controller
//
// Call Query to add office to the database
//

export default ['$http', '$scope', '$location', '$window', ($http, $scope, $location, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope.states = states;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.header = "Add an Office";
  $scope.office = {
    officeName: "",
    officePhoneNumber: "",
    officeEmail: "",
    officeStreetAddress: "",
    officeCity: "",
    officeState: "",
    officeZipcode: ""
  };
  $http({
    method: 'GET',
    url : `${env.api.root}/Api/Verify`,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log('Response: ', response.data);
    $scope.employee = response.data[0];
    if ($scope.employee.permissionLevel == 'superadmin') {
      $http({
        method: 'GET',
        url : `${env.api.root}/Api/AllCompanies`,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log('Response: ', response.data);
        $scope.companies = response.data;
      }).then(err => {
        //console.log('Error: ', err);
      });
    } else {
      $http({
        method: 'GET',
        url : `${env.api.root}/Api/CompaniesForAdmin/` + $scope.employee.employeeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log('Response: ', response.data);
        $scope.companies = response.data;
      }).then(err => {
        //console.log('Error: ', err);
      });
    }
  }).then(err => {
    //console.log('Error: ', err);
  });
  $scope.submit = function() {
    if ($scope.office.officeState == "") {
      alert('Select a state');
    } else {
      $http({
        method: 'POST',
        url: `${env.api.root}/Api/AddOffice`,
        data: $scope.office,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      })
      .then(response => {
        $window.location.href = '/offices';
      }, err => {
        //console.log(err);
      });
    }
  };
}];
