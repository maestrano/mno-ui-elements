angular.module('mnoUiElements')
.controller('MnoRowController', MnoRowController)
.component('mnoRow', {
  bindings: {
    name: '@',
    status: '@',
    mnoRowClick: '&?',
    mnoRowHref: '@?'
  },
  template: '''
    <a ng-if="$ctrl.mnoRowClick" class="row-link" ng-click="ctrl.mnoRowClick()">
      <span>{{$ctrl.name}}</span>
      <span>{{$ctrl.status}}</span>
      </a>
      <a ng-if="$ctrl.mnoRowHref" class="row-link" ng-href="{{$ctrl.mnoRowHref}}">
      <span>{{$ctrl.name}}</span>
        <span>{{$ctrl.status}}</span>
      </a>
  '''
});

MnoRowController = ($state) ->

  # Data-bound variables
  # @const {?Function}
  this.mnoRowClick;
  # @const {?string}
  this.mnoRowHref;
  # @const {?string}
  this.name;

  hasRowClick = this.mnoRowClick != null;
  hasRowHref = this.mnoRowHref != null;

  # Cannot specify more than one row attribute
  throw Error(
    'Must specify exactly one of mno-row-click, mno-row-href, ' +
    'for mno-row directive') if ((hasRowClick ? 1:0) + (hasRowHref ? 1:0) + (hasRowSref ? 1:0) > 1)
