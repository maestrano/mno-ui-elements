angular.module('mnoUiElements')
.component('mnoTasksMenu', {
  templateUrl: 'tasks-menu.html',
  bindings: {
    onSelect: '&'
    menus: '<'
  }
  controller: ($element)->
    ctrl = this

    ctrl.menuOnClick = (menu)->
      _.each(ctrl.menus, (m)-> m.selected = false; null)
      menu.selected = true
      ctrl.onSelect($event: { menu: menu })

    ctrl
})
