(function() {
  var App;

  App = angular.module('App', ['ui.router', 'ngAnimate', 'ngTouch', 'ui.bootstrap']);

  App.config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $stateProvider.state('home', {
        url: "/",
        templateUrl: "templates/home.html"
      }).state('resume', {
        url: "/resume",
        templateUrl: "templates/resume.html"
      }).state('contact', {
        url: "/contact",
        templateUrl: "templates/contact.html"
      }).state('high-corridor', {
        url: '/project/high-corridor',
        templateUrl: "templates/projects/high-corridor.html"
      }).state('basel', {
        url: '/project/basel',
        templateUrl: "templates/projects/basel.html"
      }).state('roma', {
        url: '/project/roma',
        templateUrl: "templates/projects/roma.html"
      }).state('bigness', {
        url: '/project/bigness',
        templateUrl: "templates/projects/bigness.html"
      });
      return $urlRouterProvider.otherwise("/");
    }
  ]);

  App.controller('App.Controller.Main', [
    '$scope', '$rootScope', '$location', '$window', function($scope, $rootScope, $location, $window) {
      var init, isLargeWindow, setCoolapseText;
      isLargeWindow = function() {
        return $(window).outerWidth() > 768;
      };
      setCoolapseText = function() {
        if ($scope.sidebarOpen) {
          return $scope.collapseText = 'Collapse';
        } else {
          return $scope.collapseText = 'Expand';
        }
      };
      $scope.toggleSidebar = function() {
        $scope.sidebarOpen = !$scope.sidebarOpen;
        return setCoolapseText();
      };
      $scope.closeSidebar = function() {
        $scope.sidebarOpen = false;
        return setCoolapseText();
      };
      $scope.openSidebar = function() {
        $scope.sidebarOpen = true;
        return setCoolapseText();
      };
      $scope.isLargeWindow = isLargeWindow;
      $rootScope.$on('$stateChangeSuccess', function() {
        if (!isLargeWindow()) {
          $scope.sidebarOpen = false;
        }
        if (!$window.ga) {
          return;
        }
        return $window.ga('send', 'pageview', {
          page: $location.path()
        });
      });
      init = function() {
        $scope.sidebarOpen = isLargeWindow();
        setCoolapseText();
        return $scope.projects = [
          {
            name: 'High-Corridor',
            route: 'high-corridor',
            icon: 'images/icons/high-corridor.svg'
          }, {
            name: 'Basel',
            route: 'basel',
            icon: 'images/icons/basel.svg'
          }, {
            name: 'Roma',
            route: 'roma',
            icon: 'images/icons/roma.svg'
          }, {
            name: 'Bigness',
            route: 'bigness',
            icon: 'images/icons/bigness.svg'
          }
        ];
      };
      return init();
    }
  ]);

  App.directive('scrollTop', [
    '$window', function($window) {
      return {
        restrict: 'A',
        template: '<div id="back-top"> <i class="fa fa-chevron-up"></i> </div>',
        link: function($scope, element, attrs) {
          var $main;
          element.fadeOut();
          $main = $('[role="main"]');
          $main.scroll(function(ev) {
            if ($main.scrollTop() > 150) {
              return element.fadeIn(300);
            } else {
              return element.fadeOut(300);
            }
          });
          return element.on('click', function(ev) {
            return $main.animate({
              scrollTop: 0
            }, {
              duration: 500
            });
          });
        }
      };
    }
  ]);

  App.directive('largePicture', [
    '$window', function($window) {
      var isLargeWindow;
      isLargeWindow = function() {
        return $window.outerWidth >= 600;
      };
      return {
        restrict: 'A',
        scope: {
          largePicture: '='
        },
        link: function($scope, element, attrs) {
          var img;
          if (isLargeWindow()) {
            img = new Image();
            img.onload = function() {
              return element.attr('src', img.src);
            };
            img.src = $scope.largePicture;
          }
          return false;
        }
      };
    }
  ]);

}).call(this);
