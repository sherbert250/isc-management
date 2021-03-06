import env from '../core/env';
import permissions from '../settings/permissions';
import primaryNavItems from '../settings/primary_nav_items';
import accountNavItems from '../settings/account_nav_items';
import showAccountInfo from '../settings/account_info';
import {verifyOfficeAdmin} from './_common';

//
// Office Employees Controller
//
// Show a list of employees for an office
//

export default ['$http', '$scope', '$location', '$routeParams', '$window', ($http, $scope, $location, $routeParams, $window) => {
  $scope.primaryNavItems = primaryNavItems;
  $scope.accountNavItems = accountNavItems;
  $scope.showAccountInfo = showAccountInfo;
  $scope = permissions.adminPermissionCheck($http, $scope, $location, $window);
  $scope.emps = [];
  $scope.canAddEditDelete = false;
  $scope.officeID = $routeParams.id;
  verifyOfficeAdmin($scope, $http, $location, $window, $scope.officeID);
  $scope.errorMessage = "";
  $scope.add = function() {
    $location.path('/add-office-employee/' + $scope.officeID);
  };
  $scope.delete = function(employeeID) {
    if (confirm('Are you sure you want to delete this office employee? This cannot be undone.')) {
      $http({
        method: 'GET',
        url: `${env.api.root}/Api/IsEmployeeLastSuperadmin/` + employeeID,
        headers: {
          'x-access-token': $window.sessionStorage.token
        }
      }).then(response => {
        //console.log(response);
        $scope.isEmployeeLastSuperadmin = response.data[0];
        if ($scope.isEmployeeLastSuperadmin.result === 0) {
          alert('Error: Cannot delete only superadmin');
        } else {
          $http({
            method: 'GET',
            url: `${env.api.root}/Api/IsEmployeeSuperAdmin/` + employeeID,
            headers: {
              'x-access-token': $window.sessionStorage.token
            }
          }).then(response => {
            //console.log(response);
            $scope.isCurrentEmployeeSuperAdmin = response.data[0];
            if ($scope.isCurrentEmployeeSuperAdmin.result === 1) {
              $http({
                method: 'GET',
                url: `${env.api.root}/Api/IsEmployeeSuperAdmin/` + $scope.masterID,
                headers: {
                  'x-access-token': $window.sessionStorage.token
                }
              }).then(response => {
                //console.log(response);
                $scope.isDeleterSuperAdmin = response.data[0];
                if ($scope.isDeleterSuperAdmin.result === 1) {
                  $http({
                    method: 'GET',
                    url: `${env.api.root}/Api/DeleteOfficeEmployee/` + employeeID,
                    headers: {
                      'x-access-token': $window.sessionStorage.token
                    }
                  }).then(response => {
                    //console.log(response);
                    $http({
                      method: 'GET',
                      url: `${env.api.root}/Api/EmployeesOfOffice/` + $scope.officeID,
                      headers: {
                        'x-access-token': $window.sessionStorage.token
                      }
                    }).then(response => {
                      //console.log(response);
                      $scope.emps = response.data;
                    }, err => {
                      //console.log(err);
                    });
                  }, err => {
                    //console.log(err);
                  });
                } else {
                  alert('Error: Only a superadmin can delete a superadmin');
                }
              }, err => {
                //console.log(err);
              });
            } else {
              $http({
                method: 'GET',
                url: `${env.api.root}/Api/DeleteOfficeEmployee/` + employeeID,
                headers: {
                  'x-access-token': $window.sessionStorage.token
                }
              }).then(response => {
                //console.log(response);
                $http({
                  method: 'GET',
                  url: `${env.api.root}/Api/EmployeesOfOffice/` + $scope.officeID,
                  headers: {
                    'x-access-token': $window.sessionStorage.token
                  }
                }).then(response => {
                  //console.log(response);
                  $scope.emps = response.data;
                }, err => {
                  //console.log(err);
                });
              }, err => {
                //console.log(err);
              });
            }
          }, err => {
            //console.log(err);
          });
        }
      }, err => {
        //console.log(err);
      });
    }
  };
  $scope.officeDetail = function(companyID, officeID) {
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      $window.location.href = '/office-detail/' + companyID + '/'+ officeID;
    }, err => {
    });
  };
  $scope.upload = function() {
    try {
      var repeatEmail = false;
      var f = document.getElementById('csv-upload').files[0],
      r = new FileReader();
      r.onloadend = function(e){
        var data = e.target.result;
        var employees = [];
        data = data.trim();
        data = data.replace(/(?:\r\n|\r|\n)/g, ",");
        var splitted = data.split(",");
        var i = 0;
        var max = 0;

        if (splitted.length % 5 == 0) {
          max = splitted.length;
          while (i < max) {
            var employee = {};
            employee.firstName = splitted[i++];
            employee.lastName = splitted[i++];
            employee.email = splitted[i++];
            employee.password = Math.round((Math.pow(36, 8) - Math.random() * Math.pow(36, 7))).toString(36).slice(1);
            employee.department = splitted[i++];
            employee.title = splitted[i++];
            employee.restroomUsage = 1;
            employee.noisePreference = 1;
            employee.outOfDesk = 1;
            employee.pictureAddress = "";
            employee.permissionLevel = "user";
            employees.push(employee);
          }
        /*if (splitted.length % 11 == 0) {
          max = splitted.length;
          while (i < max) {
            var employee = {};
            employee.firstName = splitted[i++];
            employee.lastName = splitted[i++];
            employee.email = splitted[i++];
            employee.password = splitted[i++];
            employee.department = splitted[i++];
            employee.title = splitted[i++];
            employee.restroomUsage = splitted[i++];
            employee.noisePreference = splitted[i++];
            employee.outOfDesk = splitted[i++];
            employee.pictureAddress = splitted[i++];
            employee.permissionLevel = splitted[i++];
            employees.push(employee);
          }*/
          for (var i in employees) {
            for (var j in $scope.checkEmployees) {
              if (employees[i].email == $scope.checkEmployees[j].email) {
                repeatEmail = true;
              }
            }
          }
          if (repeatEmail == true) {
            alert("Error: CSV contains an email already in database!");
            $window.location.reload();
          } else {
            $http({
              method: 'POST',
              url: `${env.api.root}/Api/AddEmployees`,
              data: {employees: employees, officeID: $scope.officeID},
              headers: {
                'x-access-token': $window.sessionStorage.token
              }
            })
            .then(response => {
              alert("CSV successfully uploaded.");
              $http({
                method: 'GET',
                url: `${env.api.root}/Api/AllEmployees`,
                headers: {
                  'x-access-token': $window.sessionStorage.token
                }
              })
              .then(response => {
                $scope.emps = response.data;
                $window.location.reload();
              }, err => {
                //console.log(err);
              });
            }, err => {
              //console.log(err);
            });
          }
        } else {
          alert("Incorrect csv format.\nThe correct format is firstName,lastName,email,department,email");
        }
      }
      r.readAsText(f);
    } catch (err) {
      $scope.errorMessage = "Please choose a CSV file to upload employees";
    }
  };
  $scope.edit = function(employeeID) {
    $location.path('/edit-employee/' + employeeID);
  };
  $scope.orderProperty='firstName';
  $scope.setOrderProperty = function(propertyName) {
    if ($scope.orderProperty === propertyName) {
      $scope.orderProperty = '-' + propertyName;
    } else if ($scope.orderProperty === '-' + propertyName) {
      $scope.orderProperty = propertyName;
    } else {
      $scope.orderProperty = propertyName;
    }
    return $scope.orderProperty;
  };
  $scope.view = function(employeeID) {
    $location.path('/employee-detail/' + employeeID);
  };
  if ($scope.officeID == 0) {
    $http({
      method: 'GET',
      url : `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      if (response.data[0].permissionLevel == 'superadmin') {
        $window.location.href = '/view-employees';
      } else {
        $window.history.back();
      }
    }, err => {
    });
  } else {
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/Verify`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log(response);
      $scope.check = response.data[0];
      if ($scope.check.permissionLevel == 'superadmin') {
        $scope.canAddEditDelete = true;
      } else {
        $http({
          method: 'GET',
          url: `${env.api.root}/Api/OfficeOfEmployee/` + $scope.check.employeeID,
          headers: {
            'x-access-token': $window.sessionStorage.token
          }
        }).then(response => {
          //console.log(response);
          $scope.checkOffice = response.data[0];
          if ($scope.check.permissionLevel == 'admin' && $scope.officeID != $scope.checkOffice.officeID) {
            $scope.canAddEditDelete = false;
          } else if ($scope.check.permissionLevel == 'admin' && $scope.officeID == $scope.checkOffice.officeID) {
            $scope.canAddEditDelete = true;
          }
        }, err => {
          //console.log(err);
        });
      }
    }, err => {
      //console.log(err);
    });
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/EmployeesOfOffice/` + $scope.officeID,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log(response);
      $scope.emps = response.data;
    }, err => {
      //console.log(err);
    });
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log(response);
      $scope.header = response.data[0].companyName;
      $scope.companyID = response.data[0].companyID;
    }, err => {
      //console.log(err);
    });
    $http({
      method: 'GET',
      url: `${env.api.root}/Api/AllEmployees`,
      headers: {
        'x-access-token': $window.sessionStorage.token
      }
    }).then(response => {
      //console.log(response);
      $scope.checkEmployees = response.data;
    }, err => {
      //console.log(err);
    });
  }
}];
