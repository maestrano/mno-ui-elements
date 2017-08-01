angular.module('mnoUiElements').component('mnoCreateTaskModal', {
  bindings: {
    resolve: '<'
    close: '&',
    dismiss: '&'
  },
  templateUrl: 'create-task-modal.html',
  controller: ()->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.recipients = ctrl.resolve.recipients
      ctrl.newTask = {}

    ctrl.ok = (isDraft = false)->
      ctrl.close($value: { isDraft: isDraft, newTask: ctrl.newTask})

    ctrl.cancel = ->
      ctrl.dismiss()

    ctrl
})
