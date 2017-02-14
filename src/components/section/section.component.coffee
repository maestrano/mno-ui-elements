angular.module('mnoUiElements')
.component('mnoSection', {
  bindings: {
    title: '@',
    description: '@'
  },
  transclude: true,
  template: '''
    <div class="section row">
      <div class="col-md-4 left-column">
        <div class="title">{{$ctrl.title}}</div>
        <div class="description">{{$ctrl.description}}</div>
      </div>
      <div class="col-md-8" ng-transclude></div>
    </div>
  '''
})
