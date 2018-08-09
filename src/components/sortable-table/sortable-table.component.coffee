###
#   @desc A customisable table with column ascending / descending sorting
#   @binding {Array<Object>} [rowCollection] Data to be represented across table body rows
#   @binding {Function} [rowOnClick] On click callback for each table body row (`<tr>`)
#   @binding {Function} [pipe] Callback given to the smart-table `st-pipe` directive
#   @binding {boolean} [isLoading] Hide collection rows and display loading spinner
#   @binding {Array<Object>} [fields] Table field options
#   @binding {string} [field.header] The string to display as the header of the table column
#   @binding {string} [field.style] The style to apply to the header of the table column
#   @binding {string} [field.sort_default] Sort the table by default using this column (null, true" or "reverse")
#   @binding {string} [field.skip_natural] Skip the natural order when switching sort state
#   @binding {string} [field.attr] The rowCollection item attribute to render in this column (can use dot syntax e.g 'user.name')
#   @binding {boolean} [field.doNotSort] OPTIONAL Will prevent sorting for this column
#   @binding {Function} [field.filter] A callback passing the rowItem value, use as a way to filter the values (e.g apply $filter in the parent scope on specific rowItems)
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
    subHeaders: '<'
    rowOnClick: '&?'
    pipe: '&?'
    isLoading: '<?'
    bindings: '<'
  }
  controller: ->
    ctrl = this

    ctrl.$onChanges = (changes)->
      rowCollectionChanges = _.get(changes, 'rowCollection.currentValue')
      ctrl.displayedCollection = angular.copy(rowCollectionChanges) if rowCollectionChanges

    ctrl.$onInit = () ->
      ctrl.pipeCb = if ctrl.pipe? then (tableState) -> ctrl.pipe({tableState}) else undefined

    ctrl.hasCollectionItems = ->
      !_.isEmpty(ctrl.displayedCollection)

    ctrl
})
