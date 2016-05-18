#
# Widget Body Directive
#
@App.component('mnoWidgetBody', ->
  requires: '^mnoWidget',
  transclude: true,
  bindings: {
    loading: '=?',
    classes: '@?'
  },
  template: '<div class="widget-body" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>'
)
