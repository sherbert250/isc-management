import env from '../core/env';


//
// Create Seating Chart Controller
//
// Functionality for creating seating charts
//

export default ['$http', '$scope', ($http, $scope) => {

  var zoomArray = ['small', 'fa-lg', 'fa-2x', 'fa-3x', 'fa-4x'];
  var zoomIndex = 2;
  var zoomSnapSizes = [15, 20, 30, 45, 60];
  var activeElement = '';

  $('.live-demo').css('background-image', 'repeating-linear-gradient(0deg,transparent,transparent ' + (zoomSnapSizes[zoomIndex] - 1) + 'px,#CCC ' + (zoomSnapSizes[zoomIndex] - 1) + 'px,#CCC ' + (zoomSnapSizes[zoomIndex]) + 'px),repeating-linear-gradient(-90deg,transparent,transparent ' + (zoomSnapSizes[zoomIndex] - 1) + 'px,#CCC ' + (zoomSnapSizes[zoomIndex] - 1) + 'px,#CCC ' + zoomSnapSizes[zoomIndex] + 'px)');
  $('.live-demo').css('background-size', zoomSnapSizes[zoomIndex] + 'px ' + zoomSnapSizes[zoomIndex] + 'px');

  $scope.changeZoom = function(zoomIn) {
    if (zoomIn) {
      if (zoomIndex >= zoomArray.length - 1) {} else {
        $('.live-demo').find('.' + zoomArray[zoomIndex]).removeClass(zoomArray[zoomIndex]).addClass(zoomArray[++zoomIndex]);
        $('.live-demo').css('background-image', 'repeating-linear-gradient(0deg,transparent,transparent ' + (zoomSnapSizes[zoomIndex] - 1) + 'px,#CCC ' + (zoomSnapSizes[zoomIndex] - 1) + 'px,#CCC ' + (zoomSnapSizes[zoomIndex]) + 'px),repeating-linear-gradient(-90deg,transparent,transparent ' + (zoomSnapSizes[zoomIndex] - 1) + 'px,#CCC ' + (zoomSnapSizes[zoomIndex] - 1) + 'px,#CCC ' + zoomSnapSizes[zoomIndex] + 'px)');
        $('.live-demo').css('background-size', zoomSnapSizes[zoomIndex] + 'px ' + zoomSnapSizes[zoomIndex] + 'px');
        newInteractable();
      }
    } else {
      if (zoomIndex <= 0) {} else {
        $('.live-demo').find('.' + zoomArray[zoomIndex]).removeClass(zoomArray[zoomIndex]).addClass(zoomArray[--zoomIndex]);
        $('.live-demo').css('background-image', 'repeating-linear-gradient(0deg,transparent,transparent ' + (zoomSnapSizes[zoomIndex] - 1) + 'px,#CCC ' + (zoomSnapSizes[zoomIndex] - 1) + 'px,#CCC ' + (zoomSnapSizes[zoomIndex]) + 'px),repeating-linear-gradient(-90deg,transparent,transparent ' + (zoomSnapSizes[zoomIndex] - 1) + 'px,#CCC ' + (zoomSnapSizes[zoomIndex] - 1) + 'px,#CCC ' + zoomSnapSizes[zoomIndex] + 'px)');
        $('.live-demo').css('background-size', zoomSnapSizes[zoomIndex] + 'px ' + zoomSnapSizes[zoomIndex] + 'px');
      newInteractable();
      }
    }
  }

  $scope.createWall = function() {
    activeElement = '<div class="draggable drag" data-x="0" data-y="0" style="transform: translate(0px, 0px) rotate(0deg)"><i class="fa fa-stop ' + zoomArray[zoomIndex] + ' default"></i><i class="fa fa-stop ' + zoomArray[zoomIndex] + ' default"></i><i class="fa fa-stop ' + zoomArray[zoomIndex] + ' default"></i></div>';
    $(activeElement).appendTo(".live-demo");
    $(".btn").removeClass("selected");
    $("#wall").addClass("selected");
  }

  $scope.createDesk = function() {
    activeElement = '<div class="draggable drag" data-x="0" data-y="0" style="transform: translate(0px, 0px) rotate(0deg)"><i class="fa fa-simplybuilt ' + zoomArray[zoomIndex] + ' info"></i></div>';
    $(activeElement).appendTo(".live-demo");
    $(".btn").removeClass("selected");
    $("#desk").addClass("selected");
  }

  $scope.createUser = function() {
    activeElement = '<div class="draggable drag user" data-x="0" data-y="0" style="transform: translate(0px, 0px) rotate(0deg)"><i class="fa fa-user ' + zoomArray[zoomIndex] + ' danger"></i></div>';
    $(activeElement).appendTo(".live-demo");
    $(".btn").removeClass("selected");
    $("#person").addClass("selected");
  }

  $scope.submit = function() {
    var positions = [];
    var users = document.getElementsByClassName('user');
    for (var i = 0; i < users.length; i++) {
      var value = $(users[i]).attr("style");
      positions.push(value.match(/translate\((.*?)\)/)[1]);
    }
    console.log(positions);
  }

  $scope.getRotate = function(target) {
    var value = $(target).attr("style");
    return parseInt(value.match(/rotate\((.*?)\)/)[1]);
  }

  $(".live-demo").dblclick(function(event) {
    var x = (event.pageX - $(".live-demo").offset().left);
    var y = (event.pageY - $(".live-demo").offset().top);
    $(activeElement.replace(/data-x="0" data-y="0" style="transform: translate\(.*?px, .*?px\)/, "data-x=\"" + x + "\" data-y=\"" + y + "\" style=\"transform: translate(" + x + "px, " + y + "px)")).appendTo(".live-demo");
  });

  // target elements with the "draggable" class
  interact('.draggable')
    .on('hold', function(event) {
      $(event.currentTarget).remove();
    })
    .on('tap', function(event) {
      var newRotate = $scope.getRotate(event.currentTarget) + 90;
      $(event.currentTarget).css("transform", 'translate(' + event.currentTarget.getAttribute('data-x') + 'px, ' + event.currentTarget.getAttribute('data-y') + 'px) rotate(' + newRotate + 'deg)');
      $(event.currentTarget).css("webkitTransform", 'translate(' + event.currentTarget.getAttribute('data-x') + 'px, ' + event.currentTarget.getAttribute('data-y') + 'px) rotate(' + newRotate + 'deg)');
    })
    .draggable({
      snap: {
        targets: [
          interact.createSnapGrid({
            x: zoomSnapSizes[zoomIndex],
            y: zoomSnapSizes[zoomIndex]
          })
        ],
        range: Infinity,
        offset: {
          x: -3.67188,
          y: -7
        },
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
      'translate(' + x + 'px, ' + y + 'px) ' + 'rotate(' + $scope.getRotate(target) + 'deg)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

  var newInteractable = function() {
    // target elements with the "draggable" class
    interact('.draggable').unset();
    interact('.draggable')
      .on('hold', function(event) {
        $(event.currentTarget).remove();
      })
      .on('tap', function(event) {
        var newRotate = $scope.getRotate(event.currentTarget) + 90;
        $(event.currentTarget).css("transform", 'translate(' + event.currentTarget.getAttribute('data-x') + 'px, ' + event.currentTarget.getAttribute('data-y') + 'px) rotate(' + newRotate + 'deg)');
        $(event.currentTarget).css("webkitTransform", 'translate(' + event.currentTarget.getAttribute('data-x') + 'px, ' + event.currentTarget.getAttribute('data-y') + 'px) rotate(' + newRotate + 'deg)');
      })
      .draggable({
        snap: {
          targets: [
            interact.createSnapGrid({
              x: zoomSnapSizes[zoomIndex],
              y: zoomSnapSizes[zoomIndex]
            })
          ],
          range: Infinity,
          offset: {
            x: -3.67188,
            y: -7
          },
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
  }

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
