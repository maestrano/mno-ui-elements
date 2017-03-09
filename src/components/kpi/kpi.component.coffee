angular.module('mnoUiElements')
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
    mnoClick: '&?',
    mnoHref: '@?',
    mnoUiSref: '@?',
    linkText: '@?'
  }
  controller: ->
    vm = this

    return
})
