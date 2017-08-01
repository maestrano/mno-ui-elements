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
      ctrl.isReplying = false
      ctrl.reply = { message: '' }

    ctrl.done = ()->
      ctrl.task.markedDone = true
      ctrl.close()

    ctrl.send = (markDone = false)->
      ctrl.task.markedDone = markDone unless ctrl.task.markedDone
      ctrl.close($value: { reply: ctrl.reply })

    ctrl.cancel = ->
      ctrl.dismiss()

    ctrl.toggleReplyForm = ->
      ctrl.isReplying = !ctrl.isReplying
      ctrl.reply.message = '' unless ctrl.isReplying

    ctrl
})
