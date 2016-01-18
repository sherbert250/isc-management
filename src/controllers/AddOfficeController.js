import env from '../core/env';

//
// Add Employee Controller
//
// Call Query to add employee to the database
//

export default ['$http', '$scope', '$location', ($http, $scope, $location) => {
  $scope.header = "Add a Office";
  $scope.office = {
    companyName: "",
    officeName: "",
    officePhoneNumber: "",
    officeEmail: "",
    officeStreetAddress: "",
    officeCity: "",
    officeState: "",
    officeZipcode: ""
  };
  $scope.reset = function() {
    $scope.office = {
      companyName: "",
      officeName: "",
      officePhoneNumber: "",
      officeEmail: "",
      officeStreetAddress: "",
      officeCity: "",
      officeState: "",
      officeZipcode: ""
    };
  };
  $scope.submit = function() {
    $http({
      method: 'POST',
      url: `${env.api.root}/Api/AddOffice`,
      data: $scope.office
    })
    .then(function (response) {
      alert('success');
    },function (response) {
      alert('error');
    });
    $location.path('/offices');
  };
}];
