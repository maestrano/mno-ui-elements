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

    ctrl.ok = (status = 'sent')->
      angular.merge(ctrl.newTask, status: status, orga_relation_id: ctrl.selectedRecipient.id)
      ctrl.resolve.createTaskCb(ctrl.newTask).then(
        ->
          ctrl.close()
      )

    ctrl.cancel = ->
      ctrl.dismiss()

    ctrl
})
