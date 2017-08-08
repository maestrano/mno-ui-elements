angular.module('mnoUiElements')
.component('mnoDropdownFilterSelector', {
  templateUrl: 'dropdown-filter-selector.html',
  bindings: {
    filters: '<'
    selected: '<'
    onSelect: '&'
  }
})
