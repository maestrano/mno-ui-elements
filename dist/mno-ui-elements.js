(function() {

angular.module('mnoUiElements', [

]);

}());
(function() {
  angular.module('mnoUiElements').component('mnoAdmin', {
    template:'<div id="sidebar-wrapper" ng-class="{\'reduced\': $ctrl.reduced}"><ul class="sidebar"><li class="sidebar-main"><a ng-click="$ctrl.reduceSidebar()"><span ng-if="!$ctrl.logo">{{$ctrl.name}}</span> <img class="sidebar-logo visible-sm visible-xs" src="{{$ctrl.logo}}"> <span class="menu-icon glyphicon glyphicon-transfer hidden-sm hidden-xs"></span></a></li><div ng-transclude="navigation"></div></ul><div class="sidebar-footer"></div></div><div id="content-wrapper" ng-class="{\'open\': $ctrl.toggled, \'reduced\': $ctrl.reduced}"><header class="header"><a class="header-sidebar-toggle visible-sm visible-xs" ng-click="$ctrl.toggleSidebar()"><div id="hamburger-toggle" ng-class="{\'open\': $ctrl.toggled}"><span></span> <span></span> <span></span></div></a><div ng-transclude="header"></div></header><div class="page-content"><div class="container" ng-transclude="content"></div></div><footer ng-if="!$ctrl.hideFooter"><div ng-transclude="footer"></div></footer></div>',
    transclude: {
      header: 'mnoAdminHeader',
      navigation: 'mnoAdminNav',
      content: 'mnoAdminContent',
      footer: '?mnoAdminFooter'
    },
    bindings: {
      logo: '@?',
      name: '@?',
      hideFooter: '='
    },
    controller: ["$scope", function($scope) {
      var vm;
      vm = this;
      vm.$onInit = function() {
        vm.toggled = false;
        return vm.reduced = window.innerWidth > 992 ? false : true;
      };
      vm.reduceSidebar = function() {
        if (!vm.toggled) {
          return vm.reduced = !vm.reduced;
        }
      };
      vm.toggleSidebar = function() {
        vm.toggled = !vm.toggled;
        return vm.reduced = !vm.toggled;
      };
      $scope.$watch((function() {
        return window.innerWidth;
      }), function(newValue) {
        if (newValue) {
          vm.toggled = false;
          return vm.reduced = window.innerWidth < 1200;
        }
      });
      window.onresize = function() {
        return $scope.$apply();
      };
    }]
  });

}).call(this);

(function() {
  angular.module('mnoUiElements').component('mnoDropdownFilterSelector', {
    template:'<div class="btn-group" uib-dropdown ng-if="$ctrl.filters.length"><div id="split-button" class="btn btn-primary" ng-bind="$ctrl.selected.name"></div><button type="button" class="btn btn-primary" uib-dropdown-toggle><span class="caret"></span> <span class="sr-only"></span></button><ul class="dropdown-menu" uib-dropdown-menu role="menu" aria-labelledby="split-button"><li role="menuitem" ng-repeat="filter in $ctrl.filters"><a ng-click="$ctrl.onSelect({$event: {filter: filter}})" ng-bind="filter.name"></a></li></ul></div>',
    bindings: {
      filters: '<',
      selected: '<',
      onSelect: '&'
    }
  });

}).call(this);

(function() {
  angular.module('mnoUiElements').component('mnoCreateTaskModal', {
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    template:'<div class="modal-header"></div><div class="modal-body" id="modal-body"><form name="$ctrl.createTaskForm"><div class="form-group"><label>To</label> <input type="text" class="form-control" name="to" ng-model="$ctrl.selectedRecipient" uib-typeahead="recipient as recipient.name for recipient in $ctrl.recipients | filter:{name:$viewValue}" typeahead-min-length="0" autocomplete="off" typeahead-editable="false" required></div><div class="form-group"><label>Title</label> <input type="text" name="title" class="form-control" ng-model="$ctrl.task.title" required></div><div class="row"><div class="col-xs-12 col-md-12"><label>Due Date (optional)</label><p class="input-group"><input type="text" class="form-control" uib-datepicker-popup="{{$ctrl.datepicker.options.format}}" ng-model="$ctrl.taskDueDate" ng-model-options="{timezone: \'utc\'}" is-open="$ctrl.datepicker.opened" close-text="Close"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="$ctrl.openDatepicker()"><i class="glyphicon glyphicon-calendar"></i></button></span></p></div></div><div class="form-group"><label>Message</label> <textarea class="form-control" name="message" rows="3" ng-model="$ctrl.task.message" required></textarea></div></form></div><div class="modal-footer"><button class="btn btn-default" ng-disabled="$ctrl.loading" type="button" ng-click="$ctrl.cancel()">Discard</button> <button class="btn btn-warning" ng-disabled="$ctrl.isCreateTaskFormDisabled()" type="button" ng-click="$ctrl.ok(\'draft\')">{{$ctrl.isDraft ? \'Update\' : \'Save as\'}} draft</button> <button class="btn btn-success" ng-disabled="$ctrl.isCreateTaskFormDisabled()" type="button" ng-click="$ctrl.ok()">Send</button></div>',
    controller: ["MnoDateHelper", function(MnoDateHelper) {
      var ctrl;
      ctrl = this;
      ctrl.loading = false;
      ctrl.$onInit = function() {
        var draft, recip;
        ctrl.task = {};
        ctrl.isDraft = !_.isEmpty(ctrl.resolve.draftTask);
        ctrl.datepicker = {
          options: {
            format: 'dd MMMM yyyy'
          },
          opened: false
        };
        ctrl.recipients = _.map(ctrl.resolve.recipients, function(orgaRel) {
          return {
            id: orgaRel.id,
            name: ctrl.resolve.recipientFormatter(orgaRel)
          };
        });
        if (ctrl.isDraft) {
          draft = ctrl.resolve.draftTask;
          recip = draft.task_recipients[0];
          ctrl.selectedRecipient = {
            id: recip.orga_relation_id,
            name: ctrl.resolve.recipientFormatter(recip)
          };
          ctrl.task = _.pick(draft, ['id', 'title', 'message']);
          if (draft.due_date != null) {
            return ctrl.taskDueDate = moment.utc(draft.due_date).toDate();
          }
        }
      };
      ctrl.ok = function(status) {
        var cb;
        if (status == null) {
          status = 'sent';
        }
        ctrl.loading = true;
        angular.merge(ctrl.task, {
          status: status,
          orga_relation_id: ctrl.selectedRecipient.id
        });
        if (_.isDate(ctrl.taskDueDate)) {
          ctrl.task.due_date = MnoDateHelper.parseAsUTCDate(ctrl.taskDueDate);
        }
        cb = ctrl.isDraft ? ctrl.resolve.updateDraftCb : ctrl.resolve.createTaskCb;
        return cb(ctrl.task).then(function() {
          return ctrl.close();
        });
      };
      ctrl.cancel = function() {
        return ctrl.dismiss();
      };
      ctrl.openDatepicker = function() {
        return ctrl.datepicker.opened = true;
      };
      ctrl.isCreateTaskFormDisabled = function() {
        var r;
        return ctrl.loading || !(ctrl.createTaskForm.$valid && (r = ctrl.selectedRecipient) && (r.id != null));
      };
      return ctrl;
    }]
  });

}).call(this);

(function() {
  angular.module('mnoUiElements').component('mnoImageSelector', {
    bindings: {
      maxSize: '<',
      defaultPreview: '@',
      required: '@',
      isDisabled: '='
    },
    require: {
      form: '^form',
      ngModel: 'ngModel'
    },
    template: '<input type="file" ngf-select ng-model="$ctrl.file" ng-change="$ctrl.updateParentModel()" name="logoFile"\n       ngf-pattern="\'image/*,!.svg\'" ngf-accept="\'image/*\'" ngf-max-size="$ctrl.maxSize" ngf-model-invalid="errorFile"\n       ng-disabled="$ctrl.isDisabled">\n\n<div class="top-buffer-1">\n  <img ng-show="$ctrl.file" ngf-thumbnail="$ctrl.file" class="img-thumbnail">\n  <img ng-show="!$ctrl.file && $ctrl.defaultPreview" ng-src="{{$ctrl.defaultPreview}}" class="img-thumbnail">\n</div>\n\n<div class="text-danger" ng-if="$ctrl.form.logoFile.$dirty || $ctrl.form.$submitted" ng-messages="$ctrl.form.logoFile.$error">\n  <p ng-message="maxSize" translate translate-value-size="{{vm.errorFile.size / 1000000|number:1}}MB" translate-value-max="{{$ctrl.maxSize}}">\n    devpl.component.mno_image_selector.file_too_large\n  </p>\n  <p ng-message="pattern" translate>\n    devpl.component.mno_image_selector.authorized_format\n  </p>\n</div>\n\n<div class="progress top-buffer-1" ng-show="$ctrl.file.progress >= 0">\n  <uib-progressbar value="$ctrl.file.progress">\n    <span ng-show="$ctrl.file.result">Upload successful</span>\n    <span ng-show="$ctrl.file.error">An error occurred</span>\n    <span ng-show="!$ctrl.file.result && !$ctrl.file.error">{{$ctrl.file.progress}}%</span>\n  </uib-progressbar>\n</div>',
    controller: function() {
      var ctrl;
      ctrl = this;
      ctrl.$onInit = function() {
        return ctrl.ngModel.$render = function() {
          return ctrl.file = ctrl.ngModel.$viewValue;
        };
      };
      ctrl.updateParentModel = function() {
        return ctrl.ngModel.$setViewValue(ctrl.file);
      };
    }
  });

}).call(this);

(function() {
  angular.module('mnoUiElements').component('mnoKpi', {
    template:'<div><div class="visual"><i class="fa" ng-class="vm.icon || \'fa-file-text-o\'"></i></div><div class="details"><div class="loader" ng-show="vm.loading" aria-hidden="true"><i class="fa fa-2x fa-spin fa-refresh"></i></div><div class="body" ng-hide="vm.loading">{{vm.unit}} {{vm.value}}</div><div class="desc">{{vm.description}}</div></div><div ng-if="vm.mnoHref || vm.mnoUiSref || vm.mnoClick" class="more"><a ng-if="vm.mnoHref" ng-href="{{vm.mnoHref}}">{{vm.linkText || "View more"}} <i class="fa fa-arrow-circle-o-right"></i></a> <a ng-if="vm.mnoUiSref" ui-sref="{{vm.mnoUiSref}}">{{vm.linkText || "View more"}} <i class="fa fa-arrow-circle-o-right"></i></a> <a ng-if="vm.mnoClick" ng-click="vm.mnoClick()">{{vm.linkText || "View more"}} <i class="fa fa-arrow-circle-o-right"></i></a></div></div>',
    transclude: true,
    controllerAs: "vm",
    bindings: {
      description: '@',
      loading: '=',
      value: '@',
      icon: '@?',
      unit: '@?',
      mnoClick: '&?',
      mnoHref: '@?',
      mnoUiSref: '@?',
      linkText: '@?'
    },
    controller: function() {
      var vm;
      vm = this;
    }
  });

}).call(this);

(function() {
  angular.module('mnoUiElements').component('mnoMultipleStringField', {
    bindings: {
      isDisabled: '=',
      command: '<?'
    },
    require: {
      form: '^form',
      ngModel: 'ngModel'
    },
    template: '<ul class="list-group">\n  <!-- List of elements -->\n  <li class="list-group-item mutiple-string-field" ng-class="{\'disabled\' : $ctrl.isDisabled}" ng-repeat="elem in $ctrl.list track by $index">\n    <pre>{{elem}}</pre>\n    <button class="btn btn-sm btn-default" type="button" ng-click="$ctrl.removeElement($index)" ng-if="!$ctrl.isDisabled">\n      <i class="fa fa-times"></i>\n    </button>\n  </li>\n  <!-- New element form -->\n  <li class="list-group-item mutiple-string-field" ng-if="!$ctrl.isDisabled" ng-hide="$ctrl.list.length >= 5">\n    <input type="text" ng-model="$ctrl.new_element" class="form-control" ng-disabled="$ctrl.isDisabled">\n    <button class="btn btn-sm btn-default" type="button" ng-click="$ctrl.addElement($ctrl.new_element)" ng-disabled="!$ctrl.new_element || $ctrl.isDisabled">\n      <i class="fa fa-plus"></i>\n    </button>\n  </li>\n</ul>',
    controller: ["MnoConfirm", function(MnoConfirm) {
      var ctrl;
      ctrl = this;
      ctrl.$onInit = function() {
        return ctrl.ngModel.$render = function() {
          var viewValue;
          if (ctrl.ngModel.$viewValue) {
            viewValue = JSON.parse(ctrl.ngModel.$viewValue);
          }
          return ctrl.list = viewValue || [];
        };
      };
      ctrl.$onChanges = function(changes) {
        if (changes.command.currentValue === 'submit') {
          return this.addElement(ctrl.new_element);
        }
      };
      ctrl.addElement = function(element) {
        if (_.isEmpty(element)) {
          return;
        }
        ctrl.list.push(element);
        ctrl.new_element = null;
        return ctrl.ngModel.$setViewValue(ctrl.list);
      };
      ctrl.removeElement = function(index) {
        var opts;
        opts = {
          headerText: 'Delete entry',
          bodyText: 'Are you sure you want to delete this entry?'
        };
        return MnoConfirm.showModal(opts).then(function() {
          ctrl.list.splice(index, 1);
          return ctrl.ngModel.$setViewValue(ctrl.list);
        });
      };
    }]
  });

}).call(this);

(function() {
  angular.module('mnoUiElements').component('mnoLoadingEllipsis', {
    template: '<div class="mno-three-bounce">\n  <div class="mno-bounce1"></div>\n  <div class="mno-bounce2"></div>\n  <div class="mno-bounce3"></div>\n</div>'
  });

}).call(this);

(function() {
  var MnoRowController;

  angular.module('mnoUiElements').controller('MnoRowController', MnoRowController).component('mnoRow', {
    bindings: {
      name: '@',
      status: '@',
      mnoRowClick: '&?',
      mnoRowHref: '@?'
    },
    template: '<a ng-if="$ctrl.mnoRowClick" class="row-link" ng-click="ctrl.mnoRowClick()">\n  <span>{{$ctrl.name}}</span>\n  <span>{{$ctrl.status}}</span>\n  </a>\n  <a ng-if="$ctrl.mnoRowHref" class="row-link" ng-href="{{$ctrl.mnoRowHref}}">\n  <span>{{$ctrl.name}}</span>\n    <span>{{$ctrl.status}}</span>\n  </a>'
  });

  MnoRowController = function($state) {
    var hasRowClick, hasRowHref;
    this.mnoRowClick;
    this.mnoRowHref;
    this.name;
    hasRowClick = this.mnoRowClick !== null;
    hasRowHref = this.mnoRowHref !== null;
    if ((hasRowClick != null ? hasRowClick : {
      1: 0
    }) + (hasRowHref != null ? hasRowHref : {
      1: 0
    }) + (typeof hasRowSref !== "undefined" && hasRowSref !== null ? hasRowSref : {
      1: 0
    }) > 1) {
      throw Error('Must specify exactly one of mno-row-click, mno-row-href, ' + 'for mno-row directive');
    }
  };

}).call(this);

(function() {
  angular.module('mnoUiElements').component('mnoSection', {
    bindings: {
      heading: '@',
      description: '@',
      required: '=',
      large: '<'
    },
    transclude: {
      'headerContentSlot': '?headerContent'
    },
    template: '<div class="section row">\n  <div class="left-column" ng-class="$ctrl.large ? \'col-xs-12\' : \'col-md-4\'">\n    <div class="heading">{{$ctrl.heading}}<span ng-if="$ctrl.required">&nbsp;*</span></div>\n    <div class="description">{{$ctrl.description}}</div>\n    <span ng-transclude="headerContentSlot"></span>\n  </div>\n  <div class="right-column" ng-class="$ctrl.large ? \'col-xs-12\' : \'col-md-8\'" ng-transclude></div>\n</div>'
  });

}).call(this);

(function() {
  angular.module('sectionTitle', []).component('mnoSectionTitle', {
    transclude: true,
    require: '^mnoSection',
    template: '<div class="mno-section-title" ng-transclude></div>'
  });

}).call(this);


/*
 *   @desc Modal for displaying a Task, with the ability to set a reminder for the Task.
 *   @binding {Object} [resolve.task] The task being render in the show modal
 *   @binding {string} [resolve.dueDateFormat] The date format for the task due date & reminder value
 *   @binding {Object} [resolve.currentUser] The current user object
 *   @binding {Function} [resolve.setReminderCb] Called on click when a user sets a reminder for a Task, passing a timestamp of the reminder date.
 *   @binding {Function} [resolve.onReadTaskCb] Called on init passing a boolean for whether the current user has read the Task or not.
 */

(function() {
  angular.module('mnoUiElements').component('mnoShowTaskModal', {
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    template:'<div class="modal-header"><div class="close" ng-click="$ctrl.cancel()"><i class="fa fa-times" aria-hidden="true"></i></div></div><div class="modal-body" id="modal-body"><div><label ng-bind="$ctrl.person.label"></label><p ng-bind="$ctrl.person.value"></p></div><div><label>Title</label><p ng-bind="$ctrl.task.title"></p></div><div ng-if="$ctrl.task.due_date"><div class="due-date"><label>Due date</label><p ng-bind="$ctrl.task.due_date | date : $ctrl.dueDateFormat"></p></div><button class="btn btn-primary" type="button" ng-if="$ctrl.showAddReminderButton()" ng-click="$ctrl.toggleReminderForm(true)">Add reminder</button></div><div><div ng-if="$ctrl.reminderDate()" class="reminder"><label>Reminder</label><p ng-bind="$ctrl.reminderDate() | date: $ctrl.dueDateFormat"></p></div><button class="btn btn-warning" type="button" ng-if="$ctrl.showUpdateReminderButton()" ng-click="$ctrl.toggleReminderForm(true)">Update reminder</button> <button class="btn btn-danger" type="button" ng-if="$ctrl.showUpdateReminderButton()" ng-click="$ctrl.deleteReminderOnClick()">Delete reminder</button><div ng-if="$ctrl.isSettingReminder"><form name="$ctrl.reminderForm"><div class="row"><div class="col-xs-12 col-md-12"><label>Reminder</label><p class="input-group"><input type="text" class="form-control" uib-datepicker-popup="{{$ctrl.datepicker.options.format}}" ng-model="$ctrl.reminder.date" ng-model-options="{timezone: \'utc\'}" is-open="$ctrl.datepicker.opened" close-text="Close" ng-required="true"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="$ctrl.openDatepicker()"><i class="glyphicon glyphicon-calendar"></i></button></span></p></div></div><button class="btn btn-default" ng-click="$ctrl.toggleReminderForm(false)">Cancel</button> <button class="btn btn-success" ng-click="$ctrl.setReminderOnClick()" ng-disabled="$ctrl.reminderForm.$invalid">Set Reminder</button></form></div></div><div><label>Message</label><p ng-bind="$ctrl.task.message"></p></div><form name="$ctrl.taskReplyForm" ng-if="$ctrl.isReplying"><div class="form-group"><label>Reply</label> <textarea class="form-control" name="message" rows="3" ng-model="$ctrl.reply.message" required></textarea></div></form></div><div class="modal-footer"><button class="btn" ng-if="$ctrl.showReplyButton()" ng-class="{ \'btn-default\': $ctrl.isReplying, \'btn-primary\': !$ctrl.isReplying }" type="button" ng-click="$ctrl.toggleReplyForm()" ng-bind="$ctrl.isReplying ? \'Cancel\' : \'Reply\'" ng-disabled="$ctrl.loading"></button> <button class="btn" ng-class="{ \'btn-success\': !$ctrl.task.markedDone, \'btn-warning\': $ctrl.task.markedDone }" type="button" ng-click="$ctrl.done()" ng-if="!$ctrl.isReplying && $ctrl.canMarkAsDone()" ng-disabled="$ctrl.loading">Mark as {{$ctrl.task.markedDone ? \'not done\' : \'done\'}}</button> <button class="btn btn-success" type="button" ng-click="$ctrl.send()" ng-if="$ctrl.isReplying" ng-disabled="$ctrl.isFormDisabled()">Send</button> <button class="btn btn-success" type="button" ng-click="$ctrl.send(true)" ng-if="$ctrl.isReplying && $ctrl.canSendAndMarkAsDone()" ng-disabled="$ctrl.isFormDisabled()">Send & mark as done</button></div>',
    controller: ["MnoDateHelper", function(MnoDateHelper) {
      var ctrl, getCurrentUserRecipient, hasBeenRead, isTaskOwner;
      ctrl = this;
      ctrl.$onInit = function() {
        ctrl.task = ctrl.resolve.task;
        ctrl.person = ctrl.resolve.isInbox ? {
          label: 'From',
          value: ctrl.resolve.nameFormatter(ctrl.task.owner)
        } : {
          label: 'To',
          value: ctrl.resolve.nameFormatter(ctrl.task.task_recipients[0])
        };
        ctrl.dueDateFormat = ctrl.resolve.dueDateFormat || 'medium';
        ctrl.isReplying = false;
        ctrl.isSettingReminder = false;
        ctrl.datepicker = {
          options: {
            format: 'dd MMMM yyyy'
          },
          opened: false
        };
        ctrl.reply = {
          message: ''
        };
        ctrl.reminder = {
          date: null
        };
        return ctrl.resolve.onReadTaskCb(hasBeenRead());
      };
      ctrl.done = function() {
        return ctrl.resolve.markAsDoneCb(!ctrl.task.markedDone).then(function() {
          return ctrl.close();
        });
      };
      ctrl.send = function(markAsDone) {
        ctrl.loading = true;
        return ctrl.resolve.sendReplyCb(ctrl.reply, markAsDone).then(function() {
          return ctrl.close();
        })["finally"](function() {
          return ctrl.loading = false;
        });
      };
      ctrl.cancel = function() {
        return ctrl.dismiss();
      };
      ctrl.openDatepicker = function() {
        return ctrl.datepicker.opened = true;
      };
      ctrl.reminderDate = function() {
        var recipient;
        recipient = getCurrentUserRecipient();
        return recipient && recipient.reminder_date;
      };
      ctrl.setReminderOnClick = function() {
        var reminderDate;
        if (!ctrl.canSetReminder()) {
          return;
        }
        reminderDate = MnoDateHelper.parseAsUTCDate(ctrl.reminder.date);
        return ctrl.resolve.setReminderCb(reminderDate).then(function(response) {
          if (response != null) {
            ctrl.task = response;
          }
          return ctrl.toggleReminderForm(false);
        });
      };
      ctrl.deleteReminderOnClick = function() {
        ctrl.reminder.date = null;
        return ctrl.setReminderOnClick();
      };
      ctrl.showAddReminderButton = function() {
        return ctrl.canSetReminder() && !ctrl.isSettingReminder && !ctrl.reminderDate();
      };
      ctrl.showUpdateReminderButton = function() {
        return ctrl.canSetReminder() && !ctrl.isSettingReminder && ctrl.reminderDate();
      };
      ctrl.showReplyButton = function() {
        return !isTaskOwner();
      };
      ctrl.toggleReplyForm = function() {
        ctrl.isReplying = !ctrl.isReplying;
        if (!ctrl.isReplying) {
          return ctrl.reply.message = '';
        }
      };
      ctrl.toggleReminderForm = function(bool) {
        ctrl.isSettingReminder = bool;
        if (ctrl.isSettingReminder) {
          return ctrl.reminder.date = moment.utc(ctrl.reminderDate()).toDate();
        }
      };
      ctrl.canSetReminder = function() {
        return !isTaskOwner() && _.isFunction(ctrl.resolve.setReminderCb) && (ctrl.task.due_date != null);
      };
      ctrl.canMarkAsDone = function() {
        return !isTaskOwner() && (ctrl.task.due_date != null);
      };
      ctrl.canSendAndMarkAsDone = function() {
        return ctrl.canMarkAsDone() && ctrl.task.status !== 'done';
      };
      ctrl.isFormDisabled = function() {
        return ctrl.loading || ctrl.taskReplyForm.$invalid;
      };
      getCurrentUserRecipient = function() {
        return _.find(ctrl.task.task_recipients, function(orga_rel) {
          return orga_rel.user.id === ctrl.resolve.currentUser.id;
        });
      };
      hasBeenRead = function() {
        var r;
        r = getCurrentUserRecipient();
        return r && (r.read_at != null);
      };
      isTaskOwner = function() {
        return ctrl.resolve.currentUser.id === _.get(ctrl.task, 'owner.user.id');
      };
      return ctrl;
    }]
  });

}).call(this);


/*
 *   @desc Accompanies the mnoSortableTable component, assisting in the rendering of dynamic attributes and custom html.
 *   @binding {Object} [rowItem] contains values to render
 *   @binding {Object} [field] a mnoSortableTable fields configuration object (see sortable-table cmp)
 */

(function() {
  angular.module('mnoUiElements').directive('mnoRenderDynamicAttr', ["$compile", function($compile) {
    return {
      restrict: 'A',
      scope: {
        rowItem: '<',
        field: '<'
      },
      link: function(scope, element, attrs) {
        return scope.$watchGroup(['rowItem', 'field'], function() {
          var customField, html, str, value;
          if (!((scope.rowItem != null) && (scope.field != null))) {
            return;
          }
          if (scope.field.stopPropagation) {
            element.click(function(ev) {
              return ev.stopPropagation();
            });
          }
          if (_.isFunction(scope.field.render)) {
            customField = scope.field.render(scope.rowItem);
            html = customField.template;
            scope = angular.merge(scope, customField.scope);
          } else {
            value = _.get(scope.rowItem, scope.field.attr);
            str = _.isFunction(scope.field.filter) ? scope.field.filter(value) : value;
            if (str == null) {
              str = '-';
            }
            html = "<span>" + str + "</span>";
          }
          return element.append($compile(html)(scope));
        });
      }
    };
  }]);

}).call(this);


/*
 *   @desc Accompanies the mnoSortableTable component, assisting in the rendering of dynamic attributes and custom html.
 *   @binding {Object} [field] a mnoSortableTable fields configuration object (see sortable-table cmp)
 */

(function() {
  angular.module('mnoUiElements').directive('mnoRenderDynamicHeader', ["$compile", function($compile) {
    return {
      restrict: 'A',
      scope: {
        field: '<'
      },
      link: function(scope, element, attrs) {
        return scope.$watchGroup(['field'], function() {
          var customField, html;
          if (scope.field == null) {
            return;
          }
          if (_.isFunction(scope.field.render)) {
            customField = scope.field.render(scope.field.data);
            html = customField.template;
            scope = angular.merge(scope, customField.scope);
          } else {
            html = scope.field.render;
            if (html == null) {
              html = "<span>-</span>";
            }
          }
          return element.append($compile(html)(scope));
        });
      }
    };
  }]);

}).call(this);


/*
 *   @desc A customisable table with column ascending / descending sorting
 *   @binding {Array<Object>} [rowCollection] Data to be represented across table body rows
 *   @binding {Function} [rowOnClick] On click callback for each table body row (`<tr>`)
 *   @binding {Function} [pipe] Callback given to the smart-table `st-pipe` directive
 *   @binding {boolean} [isLoading] Hide collection rows and display loading spinner
 *   @binding {Array<Object>} [fields] Table field options
 *   @binding {string} [field.header] The string to display as the header of the table column
 *   @binding {string} [field.attr] The rowCollection item attribute to render in this column (can use dot syntax e.g 'user.name')
 *   @binding {Function} [field.filter] A callback passing the rowItem value, use as a way to filter the values (e.g apply $filter in the parent scope on specific rowItems)
 *   @binding {Function} [field.render] Render a custom attribute in the table body cell - return object: `{template: 'a html template', scope: { myScopedMethod: foo }}`
 *   @binding {boolean} [field.stopPropagation] Whether top prevent click event propagation for the field (useful for custom actions)
 *   @binding {string} [field.class] Css class string to apply to field <td>
 */

(function() {
  angular.module('mnoUiElements').component('mnoSortableTable', {
    template:'<table st-table="$ctrl.displayedCollection" st-safe-src="$ctrl.rowCollection" st-pipe="$ctrl.pipe()" class="table table-responsive" ng-class="{ \'table-hover\': !$ctrl.loading && $ctrl.hasCollectionItems() }"><thead><tr><th ng-repeat="field in $ctrl.fields" st-sort="{{field.attr}}"><span ng-bind="field.header"></span></th></tr><tr><th ng-repeat="field in $ctrl.subHeaders" mno-render-dynamic-header field="field"></th></tr></thead><tbody ng-hide="$ctrl.isLoading || !$ctrl.hasCollectionItems()"><tr ng-repeat="rowItem in $ctrl.displayedCollection" ng-click="$ctrl.rowOnClick({$event: { rowItem: rowItem }})"><td ng-repeat="field in $ctrl.fields" ng-class="field.class" mno-render-dynamic-attr row-item="rowItem" field="field"></td></tr></tbody><tbody ng-show="$ctrl.isLoading"><tr><td colspan="{{$ctrl.fields.length}}" class="text-center"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i></td></tr></tbody><tbody ng-hide="$ctrl.hasCollectionItems() || $ctrl.isLoading"><tr><td colspan="{{$ctrl.fields.length}}" class="text-center"><span>No results</span></td></tr></tbody></table>',
    bindings: {
      rowCollection: '<',
      fields: '<',
      subHeaders: '<',
      rowOnClick: '&?',
      pipe: '&?',
      isLoading: '<?'
    },
    controller: function() {
      var ctrl;
      ctrl = this;
      ctrl.$onChanges = function(changes) {
        var rowCollectionChanges;
        rowCollectionChanges = _.get(changes, 'rowCollection.currentValue');
        if (rowCollectionChanges) {
          return ctrl.displayedCollection = angular.copy(rowCollectionChanges);
        }
      };
      ctrl.hasCollectionItems = function() {
        return !_.isEmpty(ctrl.displayedCollection);
      };
      return ctrl;
    }
  });

}).call(this);

(function() {
  angular.module('mnoUiElements').component('mnoTasksMenu', {
    template:'<div class="tasks-menu"><button ng-repeat="menu in $ctrl.menus" class="btn btn-default menu-item {{menu.name}}" ng-class="{ \'selected\': menu.selected }" ng-click="$ctrl.menuOnClick(menu)"><span ng-bind="menu.label"></span></button></div>',
    bindings: {
      onSelect: '&',
      menus: '<'
    },
    controller: ["$element", function($element) {
      var ctrl;
      ctrl = this;
      ctrl.menuOnClick = function(menu) {
        _.each(ctrl.menus, function(m) {
          m.selected = false;
          return null;
        });
        menu.selected = true;
        return ctrl.onSelect({
          $event: {
            menu: menu
          }
        });
      };
      return ctrl;
    }]
  });

}).call(this);

(function() {
  angular.module('mnoUiElements').component('mnoValidation', {
    template:'<p ng-class="$ctrl.valid ? \'checked\' : \'unchecked\'"><i class="fa" ng-class="$ctrl.valid ? \'fa-check-circle\' : \'fa-times-circle\'"></i> {{$ctrl.message}}</p>',
    bindings: {
      valid: '=',
      message: '@'
    },
    controller: function() {
      var vm;
      vm = this;
    }
  });

}).call(this);

(function() {
  angular.module('mnoUiElements').component('mnoWidget', {
    template:'<div class="widget"><div class="header"><div class="row"><div class="col-xs-12"><div class="pull-left"><i class="fa" ng-class="$ctrl.icon"></i> <span class="heading">{{$ctrl.heading}}</span></div><div ng-transclude="header"></div></div></div></div><div class="body"><div class="row"><div class="col-xs-12 loading" ng-show="$ctrl.isLoading"><mno-loading-ellipsis></mno-loading-ellipsis></div><div class="col-xs-12" ng-hide="$ctrl.isLoading"><div ng-transclude="body"></div></div></div></div><div class="footer"><div class="row"><div class="col-xs-12"><div ng-transclude="footer"></div></div></div></div></div>',
    transclude: {
      header: 'mnoWidgetHeader',
      body: 'mnoWidgetBody',
      footer: '?mnoWidgetFooter'
    },
    bindings: {
      icon: '@',
      isLoading: '=',
      heading: '@?'
    },
    controller: function() {
      var vm;
      vm = this;
    }
  });

}).call(this);

(function() {
  angular.module('mnoUiElements').service('MnoDateHelper', function() {
    this.parseAsUTCDate = function(date) {
      var dateStr;
      dateStr = moment(date).format('YYYY-MM-DD');
      return moment.utc(dateStr).toISOString();
    };
    return this;
  });

}).call(this);

(function() {
  angular.module('mnoUiElements').service('Notifications', ["$log", "toastr", function($log, toastr) {
    this.init = function(notifications, notifiedCallback) {
      $log.debug("Notifications are enabled");
      return _.each(notifications, function(notification) {
        var onHidden;
        onHidden = function() {
          var params;
          params = _.pick(notification, ['object_id', 'object_type', 'notification_type']);
          return notifiedCallback(params);
        };
        return toastr[notification.method](notification.message, notification.title, {
          closeButton: true,
          autoDismiss: false,
          tapToDismiss: true,
          timeOut: 0,
          extendedTimeOut: 0,
          onHidden: onHidden,
          allowHtml: true
        });
      });
    };
    return this;
  }]);

}).call(this);
