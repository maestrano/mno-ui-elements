angular.module 'mnoUiElements'
  .service 'Notifications', ($log, toastr) ->

    @init = (notifications, notifiedCallback) ->
      $log.debug("Notifications are enabled")
      _.each(notifications, (notification) ->
        onHidden = ->
          params = _.pick(notification, ['object_id', 'object_type', 'notification_type']);
          notifiedCallback(params)
        toastr[notification.method](notification.message, notification.title, {
          closeButton: true,
          autoDismiss: false,
          tapToDismiss: true,
          timeOut: 0,
          extendedTimeOut: 0,
          onHidden: onHidden,
          allowHtml: true
        })
      )

    return @
