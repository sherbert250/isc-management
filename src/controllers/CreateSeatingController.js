import env from '../core/env';


//
// Create Seating Chart Controller
//
// Functionality for creating seating charts
//

export default ['$http', '$scope', ($http, $scope) => {
  var element = document.getElementById('grid-snap'),
    x = 0, y = 0;

interact(element)
  .draggable({
    snap: {
      targets: [
        interact.createSnapGrid({ x: 30, y: 30 })
      ],
      range: Infinity,
      relativePoints: [ { x: 0, y: 0 } ]
    },
    inertia: true,
    restrict: {
      restriction: element.parentNode,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
      endOnly: true
    }
  })
  .on('dragmove', function (event) {
    x += event.dx;
    y += event.dy;

    event.target.style.webkitTransform =
    event.target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';
  });
  
  // $scope.collection = teamMembers;
  // $http({
  //   method: 'GET',
  //   url: `${env.api.root}/Api/AllClusters`
  // }).then(response => {
  //   console.log(response);
  // }, err => {
  //   console.log(err);
  // });
}];
