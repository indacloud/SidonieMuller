App = angular.module('App', ['ui.router', 'ngTouch', 'ui.bootstrap'])

App.config ['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider)->

  $locationProvider.html5Mode(true)

  $stateProvider
    .state 'home',
      url: "/"
      templateUrl: "templates/home.html"
    .state 'resume',
      url: "/resume"
      templateUrl: "templates/resume.html"
    .state 'contact',
      url: "/contact"
      templateUrl: "templates/contact.html"
    .state 'high-corridor',
      url: '/project/high-corridor'
      templateUrl: "templates/projects/high-corridor.html"
    .state 'basel',
      url: '/project/basel'
      templateUrl: "templates/projects/basel.html"
    .state 'roma',
      url: '/project/roma'
      templateUrl: "templates/projects/roma.html"
    .state 'bigness',
      url: '/project/bigness'
      templateUrl: "templates/projects/bigness.html"

  $urlRouterProvider.otherwise("/")

]


App.controller 'App.Controller.Main', ['$scope', '$rootScope', '$location', '$window', ($scope, $rootScope, $location, $window)->

  isLargeWindow = ->
    $(window).outerWidth() > 768

  setCoolapseText = ->
    if $scope.sidebarOpen
      $scope.collapseText = 'Collapse'
    else
      $scope.collapseText = 'Expand'

  $scope.toggleSidebar = ->
    $scope.sidebarOpen = !$scope.sidebarOpen
    setCoolapseText()
  $scope.closeSidebar = ->
    $scope.sidebarOpen = false
    setCoolapseText()
  $scope.openSidebar = ->
    $scope.sidebarOpen = true
    setCoolapseText()

  $scope.isLargeWindow = isLargeWindow

  $rootScope.$on '$stateChangeSuccess', ->
    unless isLargeWindow()
      $scope.sidebarOpen = false

    if !$window.ga
      return

    $window.ga 'send', 'pageview', { page: $location.path() }


  init = ->
    $scope.sidebarOpen = isLargeWindow()
    setCoolapseText()

    $scope.projects = [
      {
        name:  'High-Corridor'
        route: 'high-corridor'
        icon:  'images/icons/high-corridor.svg'
      }
      {
        name:  'Basel'
        route: 'basel'
        icon:  'images/icons/basel.svg'
      }
      {
        name:  'Roma'
        route: 'roma'
        icon:  'images/icons/roma.svg'
      }
      {
        name:  'Bigness'
        route: 'bigness'
        icon:  'images/icons/bigness.svg'
      }
    ]

  init()

]

App.directive 'scrollTop', [ '$window', ($window)->

  return{
    restrict: 'A'
    template: '
      <div id="back-top">
        <i class="fa fa-chevron-up"></i>
      </div>
    '
    link: ($scope, element, attrs)->
      element.fadeOut()
      $main = $('[role="main"]')
      $main.scroll (ev)->
        if $main.scrollTop() > 150
          element.fadeIn(300)
        else
          element.fadeOut(300)

      element.on 'click', (ev)->
        $main.animate scrollTop: 0,
          duration: 500

  }
]

App.directive 'largePicture', [ '$window', ($window)->

  isLargeWindow = ->
    $window.outerWidth >= 600

  return{
    restrict: 'A'
    scope:
      largePicture: '='

    link: ($scope, element, attrs)->
      if isLargeWindow()
        img = new Image()
        img.onload = ->
          element.attr 'src', img.src
        img.src = $scope.largePicture

      false
  }
]
