import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items'

//
// Reassign Employee To Office Controller
//
// Reassign Employee To Office
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = 'Reassign Admin to Company';
  $scope.employeeID = $routeParams.id;
  $scope.submit = function() {
    var adder = {
      employeeID: $scope.employeeID,
      companyID: $scope.companyID
    };
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/EditAdminToCompany/` + $scope.companyID,
      data: adder
    })
    .then(response => {
      //console.log(response);
      $window.location.href = "/admin-management";
    },err => {
      //console.log(err);
    });
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/ExistsCompanyForAdmin/` + $scope.employeeID
  }).then(response => {
    //console.log(response);
    $scope.existsCompanyForAdmin = response.data[0];
    if ($scope.existsCompanyForAdmin.result === 1) {
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/EmployeeConfidential/` + $scope.employeeID
      }).then(response => {
        //console.log(response);
        $scope.employee = response.data[0];
        if ($scope.employee.pictureAddress !== "") {
          $scope.imageURL = `${env.api.root}/Api/Media/ProfileImage/` + $scope.employeeID;
          $scope.noURL = false;
        } else if ($scope.employee.pictureAddress === "") {
          $scope.imageURL = `${env.api.root}/Api/Media/DefaultImage/` ;
          $scope.noURL = false;
        } else {
          $scope.noURL = true;
        }
      }, err => {
        //console.log(err);
      });
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/AllCompanies`
      })
      .then(response => {
        //console.log(response);
        $scope.companies = response.data;
      },err => {
        //console.log(err);
      });
    } else {
      $location.path('/add-admin-to-company/' + $scope.employeeID);
    }
  });
}];
