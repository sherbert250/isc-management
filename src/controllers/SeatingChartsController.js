//
// Seating Charts Controller
//
// Display a list of created seating charts
// Provide actions to create/modify charts
//

export default ['$scope', ($scope) => {
  $scope.testing = [{
    'img': 'http://25.media.tumblr.com/tumblr_m9gus8QYjY1rw0ggfo3_r5_400.gif',
    'name': 'SeatingChart1',
    'floor': '1',
    'seats': '25'
  }, {
    'img': 'https://media.giphy.com/media/Wf6KVCUmNlnwY/giphy.gif',
    'name': 'SeatingChart2',
    'floor': '1',
    'seats': '25'
  }, {
    'img': 'https://ak-hdl.buzzfed.com/static/enhanced/webdr06/2013/9/17/10/anigif_enhanced-buzz-30162-1379428234-21.gif',
    'name': 'SeatingChart3',
    'floor': '1',
    'seats': '25'
  }, {
    'img': 'http://25.media.tumblr.com/tumblr_m9gus8QYjY1rw0ggfo3_r5_400.gif',
    'name': 'SeatingChart4',
    'floor': '4',
    'seats': '25'
  }, {
    'img': 'http://25.media.tumblr.com/tumblr_m9gus8QYjY1rw0ggfo3_r5_400.gif',
    'name': 'SeatingChart1',
    'floor': '1',
    'seats': '25'
  }, {
    'img': 'https://media.giphy.com/media/Wf6KVCUmNlnwY/giphy.gif',
    'name': 'SeatingChart2',
    'floor': '2',
    'seats': '25'
  }, {
    'img': 'https://ak-hdl.buzzfed.com/static/enhanced/webdr06/2013/9/17/10/anigif_enhanced-buzz-30162-1379428234-21.gif',
    'name': 'SeatingChart3',
    'floor': '1',
    'seats': '25'
  }, {
    'img': 'http://25.media.tumblr.com/tumblr_m9gus8QYjY1rw0ggfo3_r5_400.gif',
    'name': 'SeatingChart4',
    'floor': '2',
    'seats': '25'
  }, {
    'img': 'http://25.media.tumblr.com/tumblr_m9gus8QYjY1rw0ggfo3_r5_400.gif',
    'name': 'SeatingChart1',
    'floor': '1',
    'seats': '25'
  }, {
    'img': 'https://media.giphy.com/media/Wf6KVCUmNlnwY/giphy.gif',
    'name': 'SeatingChart2',
    'floor': '3',
    'seats': '25'
  }, {
    'img': 'https://ak-hdl.buzzfed.com/static/enhanced/webdr06/2013/9/17/10/anigif_enhanced-buzz-30162-1379428234-21.gif',
    'name': 'SeatingChart3',
    'floor': '4',
    'seats': '25'
  }, {
    'img': 'http://25.media.tumblr.com/tumblr_m9gus8QYjY1rw0ggfo3_r5_400.gif',
    'name': 'SeatingChart4',
    'floor': '3',
    'seats': '80'
  }];
  $scope.floors=[
    {"floor": 1},{"floor": 2},{"floor": 3},{"floor": 4}
  ];
  $scope.seatChoice="";
  $scope.filterSeats = function(val) {
    if($scope.seatChoice==="Less than 25"){
      return(val.seats <25);
    }
    else if($scope.seatChoice==="Between 25 and 50"){
      return (val.seats > 24 && val.seats < 51);
    }
    else if($scope.seatChoice==="More than 50"){
      return (val.seats > 50);
    }
    else{
      return (val.seats);
    }
};
}];
