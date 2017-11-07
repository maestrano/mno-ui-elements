###
#   @desc Accompanies the mnoSortableTable component, assisting in the rendering of dynamic attributes and custom html.
#   @binding {Object} [field] a mnoSortableTable fields configuration object (see sortable-table cmp)
###
angular.module('mnoUiElements')
.directive('mnoRenderDynamicHeader', ($compile)->
  return {
    restrict: 'A'
    scope: {
      field: '<'
    }
    link: (scope, element, attrs)->
      scope.$watchGroup(['field'], ->
        return unless scope.field?

        # Custom render; compile provided html & scope to element
        if _.isFunction(scope.field.render)
          customField = scope.field.render(scope.field.data)
          html = customField.template
          scope = angular.merge(scope, customField.scope)

        # Default render; select value from via field.render
        else
          html = scope.field.render
          html = "<span>-</span>" unless html?

        element.append( $compile(html)(scope) )
      )
  }
)
