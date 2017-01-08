angular.module('validation', [])
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
