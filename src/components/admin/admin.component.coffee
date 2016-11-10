angular.module('admin', [])
.component('mnoAdmin', {
  templateUrl: 'admin.html',
  transclude: {
    header: 'mnoAdminHeader',
    navigation: 'mnoAdminNav',
    content: 'mnoAdminContent',
    footer: '?mnoAdminFooter'
  },
  bindings: {
    logo: '@',
    hideFooter: '='
  }
  controller: ($scope) ->
    vm = this
    vm.$onInit = () ->
      vm.toggled = false
      vm.reduced = if window.innerWidth > 992 then true else false

    vm.reduceSidebar = () ->
      if !vm.toggled
        vm.reduced = !vm.reduced

    # toggle the sidebar
    vm.toggleSidebar = () ->
      vm.toggled = !vm.toggled

    # Watch window width and reset the layout to default if changed
    $scope.$watch (() -> window.innerWidth), (newValue) ->
      if newValue
        vm.toggled = false
        vm.reduced = (window.innerWidth > 992)

    window.onresize = () ->
      $scope.$apply()

    return
})
