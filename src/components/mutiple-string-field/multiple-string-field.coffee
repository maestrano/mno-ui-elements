#
# Dynamic input
#
angular.module('mnoUiElements')
.component('mnoMultipleStringField', {
  bindings: {
    isDisabled: '='
  },
  require: {
    form: '^form'
    ngModel: 'ngModel'
  },
  template: '''
    <ul class="list-group">
      <!-- List of elements -->
      <li class="list-group-item mutiple-string-field" ng-class="{'disabled' : $ctrl.isDisabled}" ng-repeat="elem in $ctrl.list track by $index">
        <pre>{{elem}}</pre>
        <button class="btn btn-sm btn-default" type="button" ng-click="$ctrl.removeElement($index)" ng-if="!$ctrl.isDisabled">
          <i class="fa fa-times"></i>
        </button>
      </li>
      <!-- New element form -->
      <li class="list-group-item mutiple-string-field" ng-if="!$ctrl.isDisabled" ng-hide="$ctrl.list.length >= 5">
        <input type="text" ng-model="$ctrl.new_element" class="form-control" ng-disabled="$ctrl.isDisabled">
        <button class="btn btn-sm btn-default" type="button" ng-click="$ctrl.addElement($ctrl.new_element)" ng-disabled="!$ctrl.new_element || $ctrl.isDisabled">
          <i class="fa fa-plus"></i>
        </button>
      </li>
    </ul>
  ''',
  controller: (MnoConfirm) ->
    ctrl = this

    ctrl.$onInit = () ->
      # $render is called when angular detects a change to the model
      ctrl.ngModel.$render = () ->
        viewValue = JSON.parse(ctrl.ngModel.$viewValue) if ctrl.ngModel.$viewValue
        ctrl.list = viewValue || []

    ctrl.addElement = (element) ->
      return if _.isEmpty(element)

      # Add the key benefit to the array
      ctrl.list.push(element)
      ctrl.new_element = null

      # Sync with the parent model
      ctrl.ngModel.$setViewValue(ctrl.list)

    ctrl.removeElement = (index) ->
      opts = {
        headerText: 'Delete entry'
        bodyText: 'Are you sure you want to delete this entry?'
      }

      MnoConfirm.showModal(opts).then(->
        # Remove the key benefit from the array
        ctrl.list.splice(index, 1)

        # Sync with the parent model
        ctrl.ngModel.$setViewValue(ctrl.list)
      )

    return
})
