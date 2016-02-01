import env from '../core/env';


//
// Create Seating Chart Controller
//
// Functionality for creating seating charts
//

export default ['$http', '$scope', ($http, $scope) => {

  $scope.createWall = function() {
    $('<div class="draggable drag"><i class="fa fa-stop fa-2x default"></i><i class="fa fa-stop fa-2x default"></i><i class="fa fa-stop fa-2x default"></i></div>').appendTo(".live-demo");
  }

  $scope.createDesk = function() {
    $('<div class="draggable drag"><i class="fa fa-simplybuilt fa-3x info"></i></div>').appendTo(".live-demo");
  }

  $scope.createUser = function() {
    $('<div class="draggable drag"><i class="fa fa-user fa-3x danger"></i></div>').appendTo(".live-demo");
  }

  // target elements with the "draggable" class
  interact('.draggable')
    .on('doubletap', function(event) {
      event.currentTarget.classList.toggle('rotate');
    })
    .draggable({
      snap: {
        targets: [
          interact.createSnapGrid({
            x: 30,
            y: 30
          })
        ],
        range: Infinity,
        relativePoints: [{
          x: 0,
          y: 0
        }]
      },
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: {
          top: 0,
          left: 0,
          bottom: 1,
          right: 1
        }
      },
      // enable autoScroll
      autoScroll: true,

      // call this function on every dragmove event
      onmove: dragMoveListener
    });

  function dragMoveListener(event) {
    var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

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
