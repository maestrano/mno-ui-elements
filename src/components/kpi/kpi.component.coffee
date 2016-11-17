angular.module('kpi', [])
.component('mnoKpi', {
  templateUrl: 'kpi.html',
  transclude: true,
  controllerAs: "vm",
  bindings: {
    description: '@',
    loading: '=',
    value: '@',
    icon: '@?',
    unit: '@?',
    bgColor: '@?',
    color:'@?',
    mnoClick: '&?',
    mnoHref: '@?',
    mnoUiSref: '@?',
    linkText: '@?'
  }
  controller: ($scope) ->
    vm = this
    vm.$onInit = () ->

    return
})
