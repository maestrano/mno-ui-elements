#
# KPI Directive
#
@App.directive('rdKpi', ->
  transclude: true,
  scope:
    icon: '@'
    description: '@'
    link: '@'
    linkText: '@'
    loading: '=?'
  templateUrl: 'app/directives/rd-kpi/kpi.html',
  restrict: 'EA'
)
