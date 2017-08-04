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
      ctrl.recipients = _.map(ctrl.resolve.recipients, (r)->
        { id: r.id, name: r.user.name }
      )
      ctrl.newTask = {}

    ctrl.ok = (isDraft = false)->
      ctrl.newTask.orga_relation_id = ctrl.selectedRecipient.id
      ctrl.close($value: { isDraft: isDraft, newTask: ctrl.newTask})

    ctrl.cancel = ->
      ctrl.dismiss()

    ctrl
})
