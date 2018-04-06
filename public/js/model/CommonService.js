angular.module('mCommonService', []).factory('CommonService', function ($http, $q) {
    var records = [];
    return {
        regUser: function (data) {
            return $http.post('/regUser', data);
        },
        login: function (data) {
            return $http.post('/login', data);
        },
        add_seva: function (data) {
            return $http.post('/add_seva', data);
        },
        add_special: function (data) {
            return $http.post('/add_special', data);
        },
        add_hundi: function (data) {
            return $http.post('/add_hundi', data);
        },
        check_availability: function (data) {
            return $http.post('/check_availability', data);
        },
        getSeva: function (data) {
            return $http.post('/getSeva', data);
        },
        getHundi: function (data) {
            return $http.post('/getHundi', data);
        },
        getSpecial: function (data) {
            return $http.post('/getSpecial', data);
        },
        getSevaList: function () {
            return $http.post('/getSevaList', {});
        },
        getNoOfTicket: function () {
            return $http.post('/getNoOfTicket', {});
        },
        getBookedTicket: function () {
            return $http.post('/getBookedTicket', {});
        },
        getAllUsers: function () {
            return $http.post('/getAllUsers', {});
        },
        manageUser: function (data) {
            return $http.post('/manageUser', data);
        },
        updateCPanel: function (data) {
            return $http.post('/updateCPanel', data);
        }
    }
});
