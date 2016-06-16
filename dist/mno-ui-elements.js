(function() {

angular.module('mnoUiElements', [
  'admin',
  'loadingEllipsis',
  'section',
  'sectionTitle',
  'row'
]);

}());
(function() {
  angular.module('admin', []).component('mnoAdmin', {
    template:'<div id=sidebar-wrapper ng-class="{\'reduced\': $ctrl.reduced}"><ul class=sidebar><li class=sidebar-main><a ng-click=$ctrl.reduceSidebar()><img class="sidebar-logo visible-sm visible-xs" src=$ctrl.logo> <span class="menu-icon glyphicon glyphicon-transfer hidden-sm hidden-xs"></span></a></li><div ng-transclude=navigation></div></ul><div class=sidebar-footer></div></div><div id=content-wrapper ng-class="{\'open\': $ctrl.toggled, \'reduced\': $ctrl.reduced}"><header class=header><a class="header-sidebar-toggle visible-sm visible-xs" ng-click=$ctrl.toggleSidebar()><div id=hamburger-toggle ng-class="{\'open\': $ctrl.toggled}"><span></span> <span></span> <span></span></div></a><div ng-transclude=header></div></header><div ng-transclude=content><footer><div ng-transclude=footer></div></footer></div></div>',
    transclude: {
      header: 'mnoAdminHeader',
      navigation: 'mnoAdminNav',
      content: 'mnoAdminContent',
      footer: 'mnoAdminFooter'
    },
    bindings: {
      logo: '@'
    },
    controller: ["$scope", function($scope) {
      var vm;
      vm = this;
      vm.$onInit = function() {
        vm.toggled = false;
        return vm.reduced = window.innerWidth > 992 ? true : false;
      };
      vm.reduceSidebar = function() {
        if (!vm.toggled) {
          return vm.reduced = !vm.reduced;
        }
      };
      vm.toggleSidebar = function() {
        return vm.toggled = !vm.toggled;
      };
      $scope.$watch((function() {
        return window.innerWidth;
      }), function(newValue) {
        if (newValue) {
          console.log(window.innerWidth);
          vm.toggled = false;
          return vm.reduced = window.innerWidth > 992 ? true : false;
        }
      });
      window.onresize = function() {
        return $scope.$apply();
      };
    }]
  });

}).call(this);

(function() {
  angular.module('loadingEllipsis', []).component('mnoLoadingEllipsis', {
    template: '<div class="mno-three-bounce">\n  <div class="mno-bounce1"></div>\n  <div class="mno-bounce2"></div>\n  <div class="mno-bounce3"></div>\n</div>'
  });

}).call(this);

(function() {
  var MnoRowController;

  angular.module('row', []).controller('MnoRowController', MnoRowController).component('mnoRow', {
    bindings: {
      name: '@',
      status: '@',
      mnoRowClick: '&?',
      mnoRowHref: '@?'
    },
    template: '<a ng-if="$ctrl.mnoRowClick" class="row-link" ng-click="ctrl.mnoRowClick()">\n  <span>{{$ctrl.name}}</span>\n  <span>{{$ctrl.status}}</span>\n</a>\n<a ng-if="$ctrl.mnoRowHref" class="row-link" ng-href="{{$ctrl.mnoRowHref}}">\n  <span>{{$ctrl.name}}</span>\n  <span>{{$ctrl.status}}</span>\n</a>'
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
  angular.module('section', []).component('mnoSection', {
    bindings: {
      title: '@',
      description: '@'
    },
    transclude: true,
    template: '<div class="section row">\n  <div class="col-md-4 left-column">\n    <div class="title">{{$ctrl.title}}</div>\n    <div class="description">{{$ctrl.description}}</div>\n  </div>\n  <div class="col-md-8" ng-transclude></div>\n</div>'
  });

}).call(this);

(function() {
  angular.module('sectionTitle', []).component('mnoSectionTitle', {
    transclude: true,
    require: '^mnoSection',
    template: '<div class="mno-section-title" ng-transclude></div>'
  });

}).call(this);
