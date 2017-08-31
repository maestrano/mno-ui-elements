angular.module('mnoUiElements')
.component('mnoSection', {
  bindings: {
    heading: '@',
    description: '@',
    required: '=',
    large: '<'
  },
  transclude: {
    'headerContentSlot': '?headerContent',
  },
  template: '''
    <div class="section row">
      <div class="left-column" ng-class="$ctrl.large ? 'col-xs-12' : 'col-md-4'">
        <div class="heading">{{$ctrl.heading}}<span ng-if="$ctrl.required">&nbsp;*</span></div>
        <div class="description">{{$ctrl.description}}</div>
        <span ng-transclude="headerContentSlot"></span>
      </div>
      <div class="right-column" ng-class="$ctrl.large ? 'col-xs-12' : 'col-md-8'" ng-transclude></div>
    </div>
  '''
})
