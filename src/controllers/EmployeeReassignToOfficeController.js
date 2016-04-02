import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';

//
// Reassign Employee To Office Controller
//
// Reassign Employee To Office
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.superadminPermissionCheck($http, $scope, $location, $window);
  $scope.header = 'Reassign Employee to Office';
  $scope.employeeID = $routeParams.id;
  $scope.office;
  $scope.officeID;
  $scope.company;
  $scope.offices;
  $scope.submit = function() {
    var adder = {
      employeeID: $scope.employeeID,
      officeID: $scope.office.officeID
    };
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/EditEmployeeWorksAtOffice/` + $scope.officeID,
      data: adder
    })
    .then(response => {
      //console.log(response);
      $window.location.href = "/employee-detail/" + $scope.employeeID;
    },err => {
      //console.log(err);
    });
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/ExistsEmployeeInOffice/` + $scope.employeeID
  }).then(response => {
    //console.log(response);
    $scope.existsEmployeeInOffice = response.data[0];
    if ($scope.existsEmployeeInOffice.result === 0) {
      $location.path('/add-admin-to-office/' + $scope.employeeID);
    }
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/ExistsCompanyForAdmin/` + $scope.employeeID
  }).then(response => {
    //console.log(response);
    $scope.existsCompanyForAdmin = response.data[0];
    if ($scope.existsCompanyForAdmin.result === 0) {
      window.location.href = '/add-admin-to-company/' + $scope.employeeID;
    } else {
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
        url: `${env.api.root}/Api/OfficeOfEmployee/` + $scope.employeeID
      }).then(response => {
        //console.log(response);
        $scope.officeID = response.data[0].officeID;
        var permissionLevel;
        $http({
          method: 'GET',
          url : `${env.api.root}/Api/EmployeeConfidential/` + $scope.employeeID
        }).then(response => {
          //console.log(response);
          permissionLevel = response.data[0].permissionLevel;
          if (permissionLevel === "superadmin") {
            $http({
              method: 'GET',
              url: `${env.api.root}/Api/AllOffices`
            }).then(response => {
              //console.log(response);
              $scope.offices = response.data;
            }, err => {
              //console.log(err);
            });
          }
          else if (permissionLevel === "admin") {
            //console.log($scope.officeID);
            $http({
              method: 'GET',
              url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID
            }).then(response => {
              //console.log(response);
              $scope.company = response.data[0];
              $http({
                method: 'GET',
                url: `${env.api.root}/Api/CompanyOffices/` + $scope.company.companyID
              }).then(response => {
                //console.log(response);
                $scope.offices = response.data;
              }, err => {
                //console.log(err);
              });
            }, err => {
              //console.log(err);
            });
          }
        });
      }, err => {
        //console.log(err);
      });
    }
  }, err => {
    //console.log(err);
  });
}];
