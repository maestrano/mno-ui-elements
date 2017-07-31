###
#   @desc Accompanies the mnoSortableTable component, assisting in the rendering of dynamic attributes and custom html.
#   @binding {Object} [data] contains values to render
#   @binding {Object} [field] a mnoSortableTable fields configuration object (see sortable-table cmp)
###
angular.module('mnoUiElements')
.directive('mnoRenderDynamicAttr', ($compile)->
  return {
    restrict: 'A'
    scope: {
      data: '<'
      field: '<'
    }
    link: (scope, element, attrs)->
      scope.$watchGroup(['data', 'field'], ->
        return unless scope.data? && scope.field?

        # Custom render; compile provided html & scope to element
        if _.isFunction(scope.field.render)
          customField = scope.field.render()
          html = customField.template
          scope = angular.merge(scope, customField.scope)

        # Default render; select value from data via field.attr & apply custom filters
        else
          value = _.get(scope.data, scope.field.attr)
          filter = scope.field.filter
          str = if filter && _.isFunction(filter.run) then filter.run.apply(this, [value, filter.opts]) else value
          str = '-' unless str?
          html = "<span>#{str}</span>"

        element.append( $compile(html)(scope) )
      )
  }
)
