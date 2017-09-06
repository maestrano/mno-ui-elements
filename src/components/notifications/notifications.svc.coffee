angular.module 'mnoUiElements'
  .service 'Notifications', ($log, toastr, MnoeNotifications) ->

    @init = () ->
      $log.debug("Notifications are enabled")
      MnoeNotifications.get().then(
        (response)->
          notifications = response.data.plain()
          _.each(notifications, (notification)->
            MnoeNotifications.formatNotification(notification).then((result) ->
              onHidden = ->
                params = {object_id: notification.object_id, object_type: notification.object_type, notification_type: notification_type}
                MnoeNotifications.notified(params)
              toastr[result.method](result.message, result.title, {
                closeButton: true,
                autoDismiss: false,
                tapToDismiss: true,
                timeOut: 0,
                extendedTimeOut: 0,
                onHidden: onHidden,
                allowHtml: true
              })
            )
          )
        (errors)->
          $log.error(errors)
      )

    return @
