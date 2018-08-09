###
#   @desc Accompanies the mnoSortableTable component, assisting in the rendering of dynamic attributes and custom html.
#   @binding {Object} [rowItem] contains values to render
#   @binding {Object} [field] a mnoSortableTable fields configuration object (see sortable-table cmp)
###
angular.module('mnoUiElements')
.directive('mnoRenderDynamicAttr', ($compile)->
  return {
    restrict: 'A'
    scope: {
      rowItem: '<'
      field: '<'
      bindings: '<'
    }
    link: (scope, element, attrs)->
      scope.$watchGroup(['rowItem', 'field'], ->
        return unless scope.rowItem? && scope.field?

        element.click((ev)-> ev.stopPropagation()) if scope.field.stopPropagation

        # Custom render; compile provided html & scope to element
        if _.isFunction(scope.field.render)
          customField = scope.field.render(scope.rowItem, scope.bindings)
          html = customField.template
          scope = angular.merge(scope, customField.scope)

        # Default render; select value from rowItem via field.attr & apply custom filters
        else
          value = _.get(scope.rowItem, scope.field.attr)
          str = if _.isFunction(scope.field.filter) then scope.field.filter(value) else value
          str = '-' unless str?
          html = "<span>#{str}</span>"

        element.append( $compile(html)(scope) )
      )
  }
)
