#
# Section Title
#
@App.component('mnoSectionTitle', {
  transclude: true
  require: '^mnoSection'
  template: '''
    <div class="mno-section-title" ng-transclude></div>
  '''
})
