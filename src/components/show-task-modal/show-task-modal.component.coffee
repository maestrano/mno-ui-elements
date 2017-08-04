angular.module('mnoUiElements').component('mnoShowTaskModal', {
  bindings: {
    resolve: '<'
    close: '&',
    dismiss: '&'
  },
  templateUrl: 'show-task-modal.html',
  controller: ()->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.task = ctrl.resolve.task
      ctrl.dateFormat = ctrl.resolve.dateFormat || 'medium'
      ctrl.isReplying = false
      ctrl.reply = { message: '' }

    ctrl.done = ()->
      ctrl.close($value: { done: !ctrl.task.markedDone })

    ctrl.send = (markDone = false)->
      ctrl.task.markedDone = markDone unless ctrl.task.markedDone
      ctrl.close($value: { reply: ctrl.reply })

    ctrl.cancel = ->
      ctrl.dismiss()

    ctrl.toggleReplyForm = ->
      ctrl.isReplying = !ctrl.isReplying
      ctrl.reply.message = '' unless ctrl.isReplying

    ctrl.canMarkAsDone = ->
      ctrl.task.due_date?

    ctrl.canSendAndMarkAsDone = ->
      ctrl.canMarkAsDone() && !ctrl.task.markedDone

    ctrl
})
