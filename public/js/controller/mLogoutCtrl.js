angular.module('mLogoutCtrl', []).controller('mLogoutCtrl', ['$scope', '$http', '$window', '$location', '$rootScope', function ($scope, $http, $window, $location, $rootScope) {


    if ($window.localStorage.getItem('uid') != null) {

        $window.localStorage.removeItem('user_type');
        $window.localStorage.removeItem('uid');
        $window.localStorage.removeItem('uname');
    }
    if ($window.localStorage.getItem('admin_id') != null) {

        $window.localStorage.removeItem('user_type');
        $window.localStorage.removeItem('admin_id');
        $window.localStorage.removeItem('admin_uname');
    }
    $location.path("/home");
    $rootScope.isLogin = false;
    $rootScope.isALogin = false;
}]);