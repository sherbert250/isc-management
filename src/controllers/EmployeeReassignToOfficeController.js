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
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/ExistsEmployeeInOffice/` + $scope.employeeID,
    headers: {
      'x-access-token': $window.sessionStorage.token
    }
  }).then(response => {
    //console.log(response);
    $scope.existsEmployeeInOffice = response.data[0];
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
              url: `${env.api.root}/Api/Office/` + $scope.officeID,
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
        } else {
          $http({
            method: 'GET',
            url: `${env.api.root}/Api/ExistsCompanyForAdmin/` + $scope.employeeID,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
          }).then(response => {
            //console.log(response);
            $scope.existsCompanyForAdmin = response.data[0];
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
              // Add a check here to see if there is an admin in office
              if ($scope.existsEmployeeInOffice === 0) {
                $http({
                  method: 'GET',
                  url: `${env.api.root}/CompaniesForAdmin/` + $scope.employeeID,
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
              } else {
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
                    }
                  });
                }, err => {
                  //console.log(err);
                });
              }
            }
          }, err => {
            //console.log(err);
          });
        }
      });
    }
  });
}];
