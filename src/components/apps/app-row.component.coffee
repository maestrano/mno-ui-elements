#
# App row component
#
@App.component('mnoAppRow', {
  bindings: {
    app: '<'
  },
  template: '''
    <a href="" class="app-row-link" ng-click="$ctrl.goToApp($ctrl.app.nid)">
      <span>{{::$ctrl.app.name}}</span>
      <span>{{::$ctrl.app.status}}</span>
    </a>
  ''',
  controller: ($state) ->

    this.goToApp = (appNid) ->
      $state.go('dashboard.apps.app.technical', appNid: appNid)

    return
})
