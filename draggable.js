angular.module('app').
  directive('draggable', ['$document' , function($document) {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        var startX, startY, initialMouseX, initialMouseY;

        if (typeof attrs.draggableModel != 'undefined') {
            scope.$watch(attrs.draggableModel, function() {
                var mx = scope[attrs.draggableModel].x;
                var my = scope[attrs.draggableModel].y
                setPosition(mx, my);
            }, true);
        }
 
        elm.bind('mousedown', function($event) {
          elm.addClass('dragging');
          startX = elm.prop('offsetLeft');
          startY = elm.prop('offsetTop');
          initialMouseX = $event.clientX;
          initialMouseY = $event.clientY;
          $document.bind('mousemove', mousemove);
          $document.bind('mouseup', mouseup);
          return false;
        });

        function mousemove($event) {
          var dx = $event.clientX - initialMouseX;
          var dy = $event.clientY - initialMouseY;
          var p = elm.parent();
          var ex = limitPosition((startX + dx) / p.width() * 100);
          var ey = limitPosition((startY + dy) / p.height() * 100);
          if (typeof attrs.draggableModel != 'undefined') {
            scope[attrs.draggableModel].x = ex;
            scope[attrs.draggableModel].y = ey;
            scope.$apply();
          } else {
            setPosition(ex, ey);
          }
          return false;
        }

        function setPosition(x,y) {
          elm.css({
            left:  x + '%',
            top: y + '%'
          });
        }

        function limitPosition(pos) {
            return Math.min(Math.max(pos,0),100);
        }
 
        function mouseup() {
          elm.removeClass('dragging');
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        }
      }
    };
  }]);
