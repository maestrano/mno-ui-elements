#
# KPI Currency Body Directive
#
@App.directive('rdKpiBodyCurrency', ->
  requires: '^rdKpi',
  scope: {
    currency: '@',
    amount: '@'
  },
  templateUrl: 'app/directives/rd-kpi/kpi-body-currency.html',
  restrict: 'E'
)
