#
# Section Title
#
angular.module('sectionTitle', []).component('mnoSectionTitle', {
  transclude: true
  require: '^mnoSection'
  template: '''
    <div class="mno-section-title" ng-transclude></div>
  '''
})
