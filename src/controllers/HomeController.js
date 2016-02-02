//
// Home Controller
//
// The home page
//

export default ['$scope', '$location', ($scope, $location) => {
  $scope.welcome = [
    'Welcome to the Ideal Seating Chart web application. Lucid Agency contacted Arizona State University in order to request that an ASU capstone team create a project that addresses a major problem that they were facing.',
    'They wanted a web application that could create an seating chart that considers employee preferences. This is a major issue in many corporate environments. Without tools such as the one requested, the office manager must assign employees to seats manually. In addition, if the seating chart was to accomodate the employee preferences, the office manager would also have to collect those preferences themselves. Then, the office manager would have to find a method to rank and then reflect those changes in the seating chart they would soon create. This web application addresses all of those issues.'
  ];
  $scope.objective = [
    'The primary objective is to provide a web application that uses employees, their preferences, and a floor plan to create an optimized seating chart.',
    'The application would aggregate the database of employees and use a clustering algorithm based on the available seats in the floor plan to assign employees to seats. The seating arrangement should optimally match seats to employees by preferences and related jobs, but will limit the tradeoffs of working in a cross functional environment.'
  ];
  $scope.benefits = [
    'Save time automating the seating chart creation process.',
    'Automatically gather employee preferences instead of doing so manually',
    'Employ seating chart that create conducive working environments by meeting employee preferences.',
    'Quickly modify seating chart to reflect current changes in the office layout',
    'Tailor office layout to needs of projects, employees, etc.',
    'Easily manage and scale to large office spaces with numerous employees.'
  ];
  $scope.login = function() {
    $location.path('/login');
  };
}];
