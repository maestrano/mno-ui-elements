#
# Navigation Header component
#
@App.component('mnoNavigationHeader', {
  bindings: {
    icon: '@'
    description: '@'
    link: '@'
    linkText: '@'
    loading: '<'
  },
  transclude: true,
  templateUrl: 'src/components/rd-kpi/kpi.html'
})
