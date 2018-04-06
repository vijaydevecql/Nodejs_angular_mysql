angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'views/home.html',
        controller: 'LoginCtrl'
    }).when('/reg', {
        templateUrl: 'views/register.html',
        controller: 'LoginCtrl'
    }).when('/logout', {
        templateUrl: 'views/home.html',
        controller: 'mLogoutCtrl'
    }).when('/seva', {
        templateUrl: 'views/seva.html',
        controller: 'ServicesCtrl'
    }).when('/special', {
        templateUrl: 'views/special.html',
        controller: 'ServicesCtrl'
    }).when('/hundi', {
        templateUrl: 'views/hundi.html',
        controller: 'ServicesCtrl'
    }).when('/seva-history', {
        templateUrl: 'views/seva_history.html',
        controller: 'ServicesCtrl'
    }).when('/hundi-history', {
        templateUrl: 'views/hundi_history.html',
        controller: 'ServicesCtrl'
    }).when('/special-history', {
        templateUrl: 'views/special_history.html',
        controller: 'ServicesCtrl'
    }).when('/manage_user', {
        templateUrl: 'views/manage_user.html',
        controller: 'ServicesCtrl'
    }).when('/manage_panel', {
        templateUrl: 'views/manage_panel.html',
        controller: 'ServicesCtrl'
    }).otherwise({
        redirectTo: '/home'
    });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]).run(function ($rootScope, $location, $templateCache) {

});