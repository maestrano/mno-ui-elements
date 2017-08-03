angular.module('mnoUiElements')
.component('mnoDropdownFilterSelector', {
  templateUrl: 'dropdown-filter-selector.html',
  bindings: {
    filters: '<'
    selected: '<'
    onSelect: '&'
  }
  controller: ->
    ctrl = this

    ctrl
})
