###
#   @desc A customisable table with column ascending / descending sorting
#   @binding {Array<Object>} [dataset] Data to be represented across table body rows
#   @binding {Array<Object>} [fields] Table field options
#   @binding {string} [field.header] The string to display as the header of the table column
#   @binding {string} [field.attr] The dataset item attribute to render in this column
#   @binding {Object} [field.filter] Apply a filter the attribute value, transforming the output
#   @binding {Function} [field.filter.run] A function which returns string
#   @binding {Array<string>} [field.filter.opts] Optional arguments to give to the run function
#   @binding {Function} [field.render] Render a custom attribute in the table body cell - return object: `{template: 'a html template', scope: { myScopedMethod: foo }}`
###
angular.module('mnoUiElements')
.component('mnoSortableTable', {
  templateUrl: 'sortable-table.html',
  bindings: {
    fields: '<'
    dataset: '<'
  }
  controller: ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.sort = { column: 'title', descending: false }

    ctrl.changeSorting = (column)->
      sort = ctrl.sort
      sort.descending = if column == sort.column then !sort.descending else false
      sort.column = column

    ctrl.selectedSortClass = (column)->
      sortType = if ctrl.sort.descending then 'desc' else 'asc'
      (column == ctrl.sort.column && "mno-sort-#{sortType}") || ''

    ctrl
})
