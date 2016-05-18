#
# Widget Foooter Directive
#
@App.directive('mnoWidgetFooter', ->
  requires: '^mnoWidget'
  transclude: true
  template: '<div class="widget-footer" ng-transclude></div>'
  restrict: 'E'
)
