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
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
      return false;
    }
    return true;
  };
  $scope.submit = function() {
    var adder = {
      employeeID: $scope.employeeID,
      officeID: $scope.office.officeID
    };
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/EditEmployeeWorksAtOffice/` + $scope.officeID,
      data: adder,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    })
    .then(response => {
      //console.log(response);
      $window.location.href = "/employee-detail/" + $scope.employeeID;
    },err => {
      //console.log(err);
    });
  };
  // Check to see if employee is in office
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/ExistsEmployeeInOffice/` + $scope.employeeID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.existsEmployeeInOffice = response.data[0];
    // If the employee is an admin not in an office, add them to an office. Superadmins won't access this
    if ($scope.existsEmployeeInOffice.result === 0) {
      $location.path('/add-admin-to-office/' + $scope.employeeID);
    } else {
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/IsEmployeeAdmin/` + $scope.employeeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log(response);
        $scope.isEmployeeAdmin = response.data[0];
        // If the employee is not an admin
        if ($scope.isEmployeeAdmin.result === 0) {
          $http({
            method: 'GET',
            url: `${env.api.root}/Api/EmployeeConfidential/` + $scope.employeeID,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
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
            url: `${env.api.root}/Api/OfficeOfEmployee/` + $scope.employeeID,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
          }).then(response => {
            //console.log(response);
            $scope.officeID = response.data[0].officeID;
            $http({
              method: 'GET',
              url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID,
              headers: {
                'x-access-token': $window.sessionStorage.token
              }
            }).then(response => {
              //console.log(response);
              $scope.company = response.data[0];
              $http({
                method: 'GET',
                url: `${env.api.root}/Api/CompanyOffices/` + $scope.company.companyID,
                headers: {
                  'x-access-token': $window.sessionStorage.token
                }
              }).then(response => {
                //console.log(response);
                $scope.offices = response.data;
              }, err => {
                //console.log(err);
              });
            }, err => {
              //console.log(err);
            });
          }, err => {
            //console.log(err);
          });
        } else {
          // Employee is an admin
          $http({
            method: 'GET',
            url: `${env.api.root}/Api/ExistsCompanyForAdmin/` + $scope.employeeID,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
          }).then(response => {
            //console.log(response);
            $scope.existsCompanyForAdmin = response.data[0];
            // The admin needs to be assigned to a company
            if ($scope.existsCompanyForAdmin.result === 0) {
              window.location.href = '/add-admin-to-company/' + $scope.employeeID;
            } else {
              $http({
                method: 'GET',
                url: `${env.api.root}/Api/EmployeeConfidential/` + $scope.employeeID,
                headers: {
                  'x-access-token': $window.sessionStorage.token
                }
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
                url: `${env.api.root}/Api/OfficeOfEmployee/` + $scope.employeeID,
                headers: {
                  'x-access-token': $window.sessionStorage.token
                }
              }).then(response => {
                //console.log(response);
                $scope.officeID = response.data[0].officeID;
                var permissionLevel;
                $http({
                  method: 'GET',
                  url : `${env.api.root}/Api/EmployeeConfidential/` + $scope.employeeID,
                  headers: {
                    'x-access-token': $window.sessionStorage.token
                  }
                }).then(response => {
                  //console.log(response);
                  permissionLevel = response.data[0].permissionLevel;
                  if (permissionLevel === "superadmin") {
                    $http({
                      method: 'GET',
                      url: `${env.api.root}/Api/AllOffices`,
                      headers: {
                        'x-access-token': $window.sessionStorage.token
                      }
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
                      url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID,
                      headers: {
                        'x-access-token': $window.sessionStorage.token
                      }
                    }).then(response => {
                      //console.log(response);
                      $scope.company = response.data[0];
                      $http({
                        method: 'GET',
                        url: `${env.api.root}/Api/CompanyOfficesWithoutAnAdmin/` + $scope.company.companyID,
                        headers: {
                          'x-access-token': $window.sessionStorage.token
                        }
                      }).then(response => {
                        //console.log(response);
                        if ($scope.isEmpty(response.data)) {
                          alert('All offices already have an admin');
                          $window.location.href = '/admin-management';
                        } else {
                          $scope.offices = response.data;
                        }
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
        }
      });
    }
  });
}];
