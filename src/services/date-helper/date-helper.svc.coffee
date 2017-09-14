angular.module 'mnoUiElements'
  .service 'MnoDateHelper', ->

    # Strip time & zone from local date and create a UTC date at 00:00 hours.
    @parseAsUTCDate = (date) ->
      dateStr = moment(date).format('YYYY-MM-DD')
      moment.utc(dateStr).toISOString()

    return @
