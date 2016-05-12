#
# KPI Currency Body Directive
#
@App.directive('rdKpiBodyNumber', ->
  requires: '^rdKpi',
  scope: {
    number: '@'
  },
  templateUrl: 'app/directives/rd-kpi/kpi-body-number.html',
  restrict: 'E'
)
