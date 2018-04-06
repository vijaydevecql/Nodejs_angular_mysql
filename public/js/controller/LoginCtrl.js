angular.module('LoginCtrl', []).controller('LoginCtrl', ['$scope', '$http', '$window', '$location', '$rootScope', 'CommonService', function ($scope, $http, $window, $location, $rootScope, CommonService) {

    console.log("Hello ==== " + $window.localStorage.getItem('uid'))
    if ($window.localStorage.getItem('uid') != null && $window.localStorage.getItem('uid') != '' && $window.localStorage.getItem('uid') != 'undefined') {
        $location.path("/home");
        $rootScope.isLogin = true;
        $rootScope.uname = $window.localStorage.getItem('uname');
    } else if ($window.localStorage.getItem('admin_id') != null && $window.localStorage.getItem('admin_id') != '' && $window.localStorage.getItem('admin_id') != 'undefined') {
        if ($window.localStorage.getItem('user_type') == "admin") {
            $location.path("/home");
            $rootScope.isALogin = true;
        }
        $rootScope.uname = $window.localStorage.getItem('admin_uname');
    }
    CommonService.getBookedTicket().success(function (data) {
        $scope.bookedTicket = parseInt(data.records[0].value);
    });
    $scope.login = function () {
        var user = $scope.user;
        CommonService.login(user).success(function (data) {
            if (data.is_logged) {
                if (user.types == 'user') {
                    $scope.error_msg = false;
                    $window.localStorage.setItem('uid', data.record[0].user_id);
                    $window.localStorage.setItem('uname', data.record[0].first_name + " " + data.record[0].last_name);
                    $location.path("/home");
                    $rootScope.isLogin = true;
                    $rootScope.isALogin = false;
                    $rootScope.uname = data.record[0].first_name + " " + data.record[0].last_name;
                } else if (user.types == 'admin') {
                    $window.localStorage.setItem('user_type', user.types);
                    $window.localStorage.setItem('admin_id', data.record[0].id);
                    $window.localStorage.setItem('admin_uname', data.record[0].email_id);
                    $location.path("/home");
                    $rootScope.isLogin = false;
                    $rootScope.isALogin = true;
                }
            } else {
                $scope.error_msg = true;
                $scope.errors_msg = "Please enter valid credential.";
            }
        });
    }
    $scope.regUser = function () {
        var user_data = $scope.user;
        CommonService.regUser(user_data).success(function (data) {
            $scope.success_msg = '';
            $scope.error_msg = '';
            if (data.is_inserted) {
                $scope.success_msg = data.msg;
                $scope.is_success = true;
            } else {
                $scope.error_msg = data.msg;
                $scope.is_error = true;
            }
            $scope.user = {};
        });
    }
}]);
