(function() {


angular.module("mnoUiElements.components.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("navigation-header/navigation-header.html","<div class=\"visual\">\r\n  <i class=\"fa\" ng-class=\"icon\"></i>\r\n</div>\r\n<div class=\"details\">\r\n  <div class=\"loader\" ng-show=\"loading\">\r\n    <i class=\"fa fa-2x fa-spin fa-refresh\"></i>\r\n  </div>\r\n  <div class=\"body\" ng-transclude></div>\r\n  <div class=\"desc\">{{description}}</div>\r\n</div>\r\n<a class=\"more\" ng-href=\"{{link}}\" ng-if=\"link\">\r\n  {{ linkText || \'View more\'}} <i class=\"fa fa-arrow-circle-o-right\"></i>\r\n</a>\r\n");
$templateCache.put("rd-kpi/kpi-body-currency.html","<span>{{currency}} {{amount}}</span>\r\n");
$templateCache.put("rd-kpi/kpi-body-number.html","<span>{{number}}</span>\r\n");
$templateCache.put("rd-kpi/kpi.html","<div class=\"visual\">\r\n  <i class=\"fa\" ng-class=\"icon\"></i>\r\n</div>\r\n<div class=\"details\">\r\n  <div class=\"loader\" ng-show=\"loading\">\r\n    <i class=\"fa fa-2x fa-spin fa-refresh\"></i>\r\n  </div>\r\n  <div class=\"body\" ng-transclude></div>\r\n  <div class=\"desc\">{{description}}</div>\r\n</div>\r\n<a class=\"more\" ng-href=\"{{link}}\" ng-if=\"link\">\r\n  {{ linkText || \'View more\'}} <i class=\"fa fa-arrow-circle-o-right\"></i>\r\n</a>\r\n");}]);
}());
(function() {
  this.App.component('mnoAppRow', {
    bindings: {
      app: '<'
    },
    template: '<a href="" class="app-row-link" ng-click="$ctrl.goToApp($ctrl.app.nid)">\n  <span>{{::$ctrl.app.name}}</span>\n  <span>{{::$ctrl.app.status}}</span>\n</a>',
    controller: ["$state", function($state) {
      this.goToApp = function(appNid) {
        return $state.go('dashboard.apps.app.technical', {
          appNid: appNid
        });
      };
    }]
  });

}).call(this);

(function() {


}).call(this);

(function() {
  angular.module('mnoUiElements.components.loading').component('mnoLoadingEllipsis', {
    template: '<div class="mno-three-bounce">\n  <div class="mno-bounce1"></div>\n  <div class="mno-bounce2"></div>\n  <div class="mno-bounce3"></div>\n</div>'
  });

}).call(this);

(function() {


}).call(this);

(function() {
  this.App.component('mnoNavigationHeader', {
    bindings: {
      icon: '@',
      description: '@',
      link: '@',
      linkText: '@',
      loading: '<'
    },
    transclude: true,
    templateUrl: 'src/components/rd-kpi/kpi.html'
  });

}).call(this);

(function() {


}).call(this);

(function() {
  this.App.directive('rdKpiBodyCurrency', function() {
    return {
      requires: '^rdKpi',
      scope: {
        currency: '@',
        amount: '@'
      },
      templateUrl: 'app/directives/rd-kpi/kpi-body-currency.html',
      restrict: 'E'
    };
  });

}).call(this);

(function() {
  this.App.directive('rdKpiBodyNumber', function() {
    return {
      requires: '^rdKpi',
      scope: {
        number: '@'
      },
      templateUrl: 'app/directives/rd-kpi/kpi-body-number.html',
      restrict: 'E'
    };
  });

}).call(this);

(function() {
  this.App.directive('rdKpi', function() {
    return {
      transclude: true,
      scope: {
        icon: '@',
        description: '@',
        link: '@',
        linkText: '@',
        loading: '=?'
      },
      templateUrl: 'app/directives/rd-kpi/kpi.html',
      restrict: 'EA'
    };
  });

}).call(this);

(function() {
  this.App.directive('rdLoading', function() {
    return {
      restrict: 'AE',
      template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    };
  });

}).call(this);

(function() {
  this.App.component('mnoWidgetBody', function() {
    return {
      requires: '^mnoWidget',
      transclude: true,
      bindings: {
        loading: '=?',
        classes: '@?'
      },
      template: '<div class="widget-body" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>'
    };
  });

}).call(this);

(function() {
  this.App.directive('mnoWidgetFooter', function() {
    return {
      requires: '^mnoWidget',
      transclude: true,
      template: '<div class="widget-footer" ng-transclude></div>',
      restrict: 'E'
    };
  });

}).call(this);

(function() {
  this.App.directive('mnoWidgetHeader', function() {
    return {
      requires: '^mnoWidget',
      scope: {
        title: '@',
        icon: '@'
      },
      transclude: true,
      template: '<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div ng-transclude></div></div></div>',
      restrict: 'E'
    };
  });

}).call(this);

(function() {
  this.App.directive('mnoWidget', function() {
    return {
      scope: {
        loading: '=?',
        classes: '@?'
      },
      transclude: true,
      template: '<div class="widget"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" ng-transclude></div></div>',
      restrict: 'EA'
    };
  });

}).call(this);

(function() {
  this.App.component('mnoSectionTitle', {
    transclude: true,
    require: '^mnoSection',
    template: '<div class="mno-section-title" ng-transclude></div>'
  });

}).call(this);

(function() {
  this.App.component('mnoSection', {
    bindings: {
      title: '@',
      description: '@'
    },
    transclude: true,
    template: '<div class="section row">\n  <div class="col-md-4 left-column">\n    <div class="title">{{$ctrl.title}}</div>\n    <div class="description">{{$ctrl.description}}</div>\n  </div>\n  <div class="col-md-8" ng-transclude></div>\n</div>'
  });

}).call(this);

(function() {


}).call(this);
