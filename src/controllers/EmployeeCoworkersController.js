import env from '../core/env';

//
// Employee  Coworkers Controller
//
// Show a list of all employees in an employee's whitelist
//

export default ['$http', '$scope', '$location', '$routeParams', ($http, $scope, $location, $routeParams) => {
  $scope.employeeID = $routeParams.employeeID;
  $scope.officeID = $routeParams.officeID;
  $scope.employees = [
    {
      employeeID: 0,
      firstName : " ",
      lastName : " ",
      email : " ",
      title: " ",
      department: " "
    }
  ];
  $scope.blacklist = [
    {
      employeeID: 0,
      firstName : " ",
      lastName : " ",
      email : " ",
      title: " ",
      department: " "
    }
  ];
  $scope.whitelist = [
    {
      employeeID: 0,
      firstName : " ",
      lastName : " ",
      email : " ",
      title: " ",
      department: " "
    }
  ];
  $scope.editEmployee = function(employeeID) {
    $location.path('/edit-employee/' + employeeID);
  };
  $scope.updateCoworkers = function(employeeID, officeID) {
    var coworkers = {
      blacklist : $scope.blacklist,
      whitelist : $scope.whitelist
    };
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/UpdateCoworkers/` + employeeID,
      data : coworkers
    })
    .then(response => {
      $location.path('/employee-coworkers/' + employeeID + '/' + officeID);
    }, err => {
      alert('Error');
    });
  };
  $scope.isEmpty = function (obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  };
  $scope.view = function(employeeID) {
    $location.path('/employee-detail/' + employeeID);
  };
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeesNotInWhiteListOrBlackList/` + $scope.employeeID + '/' + $scope.officeID
  }).then(response => {
    console.log(response.data);
    $scope.employees = response.data;
    $scope.employeesCopy = response.data;
  }, err => {
    console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/EmployeeWhitelist/` + $scope.employeeID
  }).then(response => {
    console.log(response.data);
    $scope.whitelist = response.data;
  }, err => {
    console.log(err);
  });
  $http({
   method: 'GET',
   url: `${env.api.root}/Api/EmployeeBlacklist/` + $scope.employeeID
  }).then(response => {
   console.log(response.data)
   $scope.blacklist = response.data;
  }, err => {
   console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/Employee/` + $scope.employeeID
  }).then(response => {
    console.log(response.data);
    $scope.employee = response.data[0];
    $scope.header = $scope.employee.firstName + ' ' + $scope.employee.lastName;
  }, err => {
    console.log(err);
  });
  $http({
    method: 'GET',
    url: `${env.api.root}/Api/CompanyForOffice/` + $scope.officeID
  }).then(response => {
    if ($scope.isEmpty(response.data)) {
      $scope.companyName = "No Company Assigned";
    } else {
      console.log(response.data);
      $scope.companyName = response.data[0].companyName
    }
  }, err => {
    console.log(err);
  });
}];
