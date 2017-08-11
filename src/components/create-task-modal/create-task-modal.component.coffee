angular.module('mnoUiElements').component('mnoCreateTaskModal', {
  bindings: {
    resolve: '<'
    close: '&',
    dismiss: '&'
  },
  templateUrl: 'create-task-modal.html',
  controller: ()->
    ctrl = this

    ctrl.buttonDisabled = false
    ctrl.$onInit = ->
      ctrl.task = {}
      ctrl.isDraft = !_.isEmpty(ctrl.resolve.draftTask)
      ctrl.recipients = _.map(ctrl.resolve.recipients, (orgaRel) -> {id: orgaRel.id, name: ctrl.resolve.recipientFormater(orgaRel)})
      if ctrl.isDraft
        draft = ctrl.resolve.draftTask
        recip = draft.task_recipients[0]
        ctrl.selectedRecipient = {id: recip.orga_relation_id, name: ctrl.resolve.recipientFormater(recip)}
        ctrl.task = _.pick(draft, ['id', 'title', 'message'])
        ctrl.task.due_date = moment.utc(draft.due_date).toDate() if draft.due_date?

    ctrl.ok = (status = 'sent')->
      ctrl.buttonDisabled = true
      angular.merge(ctrl.task, status: status, orga_relation_id: ctrl.selectedRecipient.id)
      cb = if ctrl.isDraft then ctrl.resolve.updateDraftCb else ctrl.resolve.createTaskCb
      cb(ctrl.task).then(
        ->
          ctrl.close()
      )

    ctrl.cancel = ->
      ctrl.dismiss()

    ctrl
})
