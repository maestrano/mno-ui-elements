###
#   @desc Modal for displaying a Task, with the ability to set a reminder for the Task.
#   @binding {Object} [resolve.task] The task being render in the show modal
#   @binding {string} [resolve.dueDateFormat] The date format for the task due date & reminder value
#   @binding {Object} [resolve.currentUser] The current user object
#   @binding {Function} [resolve.setReminderCb] Called on click when a user sets a reminder for a Task, passing a timestamp of the reminder date.
#   @binding {Function} [resolve.onReadTaskCb] Called on init passing a boolean for whether the current user has read the Task or not.
###
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
      ctrl.dueDateFormat = ctrl.resolve.dueDateFormat || 'medium'
      ctrl.isReplying = false
      ctrl.isSettingReminder = false
      ctrl.reply = { message: '' }
      ctrl.reminder = { date: null }
      ctrl.resolve.onReadTaskCb(hasBeenRead())

    ctrl.done = ()->
      ctrl.close($value: { done: !ctrl.task.markedDone })

    ctrl.send = (markDone = false)->
      ctrl.task.markedDone = markDone unless ctrl.task.markedDone
      ctrl.close($value: { reply: ctrl.reply })

    ctrl.cancel = ->
      ctrl.dismiss()

    ctrl.reminderDate = ->
      recipient = getCurrentUserRecipient()
      recipient && recipient.reminder_date

    ctrl.setReminderOnClick = ->
      return unless ctrl.canSetReminder()
      ctrl.resolve.setReminderCb(ctrl.reminder.date).then((updatedTask)->
        ctrl.task = updatedTask
      ).finally(->
        ctrl.toggleReminderForm(false)
      )

    ctrl.deleteReminderOnClick = ->
      ctrl.reminder.date = null
      ctrl.setReminderOnClick()

    ctrl.showAddReminderButton = ->
      ctrl.canSetReminder() && !ctrl.isSettingReminder && !ctrl.reminderDate()

    ctrl.showUpdateReminderButton = ->
      ctrl.canSetReminder() && !ctrl.isSettingReminder && ctrl.reminderDate()

    ctrl.toggleReplyForm = ->
      ctrl.isReplying = !ctrl.isReplying
      # clear message on cancel reply
      ctrl.reply.message = '' unless ctrl.isReplying

    ctrl.toggleReminderForm = (bool)->
      ctrl.isSettingReminder = bool
      # Set current reminder date to form model if available for update
      ctrl.reminder.date = moment(ctrl.reminderDate()).toDate() if ctrl.isSettingReminder

    ctrl.canSetReminder = ->
      _.isFunction(ctrl.resolve.setReminderCb) && ctrl.task.due_date?

    ctrl.canMarkAsDone = ->
      ctrl.task.due_date?

    ctrl.canSendAndMarkAsDone = ->
      ctrl.canMarkAsDone() && !ctrl.task.markedDone

    # Private

    # Finds the current user in the task_recipients list
    getCurrentUserRecipient = ->
      _.find(ctrl.task.task_recipients, (orga_rel)-> orga_rel.user.id == ctrl.resolve.currentUser.id)

    # Whether the recipient has already read this Task
    hasBeenRead = ->
      r = getCurrentUserRecipient()
      r && r.read_at?

    ctrl
})
