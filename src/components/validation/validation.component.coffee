angular.module('mnoUiElements')
.component('mnoValidation', {
  templateUrl: 'validation.html',
  bindings: {
    valid: '=',
    message: '@'
  }
  controller: () ->
    vm = this
    return
})
