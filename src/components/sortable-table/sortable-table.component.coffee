###
#   @desc A customisable table with column ascending / descending sorting
#   @binding {Array<Object>} [rowCollection] Data to be represented across table body rows
#   @binding {Function} [rowOnClick] On click callback for each table body row (`<tr>`)
#   @binding {Function} [pipe] Callback given to the smart-table `st-pipe` directive
#   @binding {boolean} [isLoading] Hide collection rows and display loading spinner
#   @binding {Array<Object>} [fields] Table field options
#   @binding {string} [field.header] The string to display as the header of the table column
#   @binding {string} [field.attr] The rowCollection item attribute to render in this column (can use dot syntax e.g 'user.name')
#   @binding {Object} [field.filter] Apply a filter the attribute value, transforming the output
#   @binding {Function} [field.filter.run] A function which returns string
#   @binding {Array<string>} [field.filter.opts] Optional arguments to give to the run function
#   @binding {Function} [field.render] Render a custom attribute in the table body cell - return object: `{template: 'a html template', scope: { myScopedMethod: foo }}`
#   @binding {boolean} [field.stopPropagation] Whether top prevent click event propagation for the field (useful for custom actions)
#   @binding {string} [field.class] Css class string to apply to field <td>
###
angular.module('mnoUiElements')
.component('mnoSortableTable', {
  templateUrl: 'sortable-table.html',
  bindings: {
    rowCollection: '<'
    fields: '<'
    rowOnClick: '&?'
    pipe: '&?'
    isLoading: '<?'
  }
  controller: ->
    ctrl = this

    ctrl.$onChanges = (changes)->
      rowCollectionChanges = _.get(changes, 'rowCollection.currentValue')
      ctrl.displayedCollection = angular.copy(rowCollectionChanges) if rowCollectionChanges

    ctrl.hasCollectionItems = ->
      !_.isEmpty(ctrl.displayedCollection)

    ctrl
})
