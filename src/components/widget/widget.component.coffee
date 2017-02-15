angular.module('mnoUiElements')
.component('mnoWidget', {
  templateUrl: 'widget.html',
  transclude: {
    header: 'mnoWidgetHeader',
    body: 'mnoWidgetBody',
    footer: '?mnoWidgetFooter'
  },
  bindings: {
    icon: '@',
    isLoading: '=',
    heading: '@?'
  }
  controller: () ->
    vm = this
    return
})
