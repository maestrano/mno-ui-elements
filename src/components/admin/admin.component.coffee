angular.module('admin', [])
  .component('mnoAdmin', {
    templateUrl: 'admin.html',
    transclude: {
      header: 'mnoAdminHeader',
      navigation: 'mnoAdminNav',
      content: 'mnoAdminContent',
      footer: 'mnoAdminFooter'
    },
    bindings: {
      logo: '@'
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

      $scope.$watch (() -> window.innerWidth), (newValue) ->
        if newValue
          console.log window.innerWidth
          vm.toggled = false
          vm.reduced = if window.innerWidth > 992 then true else false

      window.onresize = () ->
        $scope.$apply()

      return
  })
