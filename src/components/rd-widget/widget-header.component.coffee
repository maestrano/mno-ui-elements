#
# Widget Header Directive
#
@App.directive('mnoWidgetHeader', ->
  requires: '^mnoWidget'
  scope:
    title: '@'
    icon: '@'
  transclude: true
  template: '<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div ng-transclude></div></div></div>'
  restrict: 'E'
)
