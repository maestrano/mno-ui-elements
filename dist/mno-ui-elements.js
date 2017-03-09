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
  angular.module('mnoUiElements').component('mnoSection', {
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
