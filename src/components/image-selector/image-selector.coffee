#
# Image Selector
#
# Upload an image
#
angular.module('mnoUiElements')
.component('mnoImageSelector', {
  bindings: {
    maxSize: '<'
    defaultPreview: '@'
    required: '@'
    isDisabled: '='
  },
  require: {
    form: '^form'
    ngModel: 'ngModel'
  },
  template: '''
    <input type="file" ngf-select ng-model="$ctrl.file" ng-change="$ctrl.updateParentModel()" name="logoFile"
           ngf-pattern="'image/*,!.svg'" ngf-accept="'image/*'" ngf-max-size="$ctrl.maxSize" ngf-model-invalid="errorFile"
           ng-disabled="$ctrl.isDisabled">

    <div class="top-buffer-1">
      <img ng-show="$ctrl.file" ngf-thumbnail="$ctrl.file" class="img-thumbnail">
      <img ng-show="!$ctrl.file && $ctrl.defaultPreview" ng-src="{{$ctrl.defaultPreview}}" class="img-thumbnail">
    </div>

    <div class="text-danger" ng-if="$ctrl.form.logoFile.$dirty || $ctrl.form.$submitted" ng-messages="$ctrl.form.logoFile.$error">
      <p ng-message="maxSize" translate translate-value-size="{{vm.errorFile.size / 1000000|number:1}}MB" translate-value-max="{{$ctrl.maxSize}}">
        devpl.component.mno_image_selector.file_too_large
      </p>
      <p ng-message="pattern" translate>
        devpl.component.mno_image_selector.authorized_format
      </p>
    </div>

    <div class="progress top-buffer-1" ng-show="$ctrl.file.progress >= 0">
      <uib-progressbar value="$ctrl.file.progress">
        <span ng-show="$ctrl.file.result">Upload successful</span>
        <span ng-show="$ctrl.file.error">An error occurred</span>
        <span ng-show="!$ctrl.file.result && !$ctrl.file.error">{{$ctrl.file.progress}}%</span>
      </uib-progressbar>
    </div>
  ''',
  controller: () ->
    ctrl = this

    ctrl.$onInit = () ->
      # $render is called when angular detects a change to the model
      ctrl.ngModel.$render = () ->
        ctrl.file = ctrl.ngModel.$viewValue

    # Update the parent controller binding
    ctrl.updateParentModel = () ->
      ctrl.ngModel.$setViewValue(ctrl.file)

    return
})
