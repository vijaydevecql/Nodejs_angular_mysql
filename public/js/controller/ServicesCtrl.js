angular.module('ServicesCtrl', []).controller('ServicesCtrl', ['$scope', '$http', '$window', '$location', '$rootScope', 'CommonService', function ($scope, $http, $window, $location, $rootScope, CommonService) {

    if ($window.localStorage.getItem('uid') != null && $window.localStorage.getItem('uid') != '' && $window.localStorage.getItem('uid') != 'undefined') {
        $rootScope.isLogin = true;
        $rootScope.uname = $window.localStorage.getItem('uname');
    } else if ($window.localStorage.getItem('admin_id') != null && $window.localStorage.getItem('admin_id') != '' && $window.localStorage.getItem('admin_id') != 'undefined') {
        $rootScope.isALogin = true;
        $rootScope.uname = $window.localStorage.getItem('admin_uname');
        CommonService.getAllUsers().success(function (data) {
            $scope.all_users = data.records;
        });
    } else {
        $rootScope.isLogin = false;
        $rootScope.uname = '';
    }
    $("#visit_date").datepicker({
            minDate: new Date(),
            maxDate: '+3M',
            showOtherMonths: true,
            selectOtherMonths: true,
            numberOfMonths: 3,
            showButtonPanel: true
        }
    );
    $("#visit_date").datepicker("option", "showAnim", "clip");

    var user = {user_id: $window.localStorage.getItem('uid')}
    CommonService.getSeva(user).success(function (data) {
        $scope.sevas = data.records
    });
    CommonService.getSevaList().success(function (data) {
        $scope.SevaList = {
            options: data.records
        }
    });
    CommonService.getHundi(user).success(function (data) {
        $scope.hundies = data.records
    });
    CommonService.getNoOfTicket().success(function (data) {
        $scope.noOfTicket = data.records[0];
        $scope.noOfTicketVal = parseInt(data.records[0].value);

    });
    CommonService.getBookedTicket().success(function (data) {
        $scope.bookedTicket = parseInt(data.records[0].value);
    });
    CommonService.getSpecial(user).success(function (data) {
        $scope.special_entries = data.records
    });
    $scope.add_seva = function () {
        var seva = $scope.seva;
        seva['amount'] = $scope.amount;
        $scope.isAvailabilityFull = false;
        var expDate = new Date();
        expDate.setFullYear($scope.seva.year, parseInt($scope.seva.month), 1);
        console.log(expDate);
        if(expDate < new Date()){
            $scope.avail_msg = "Your card is expired. Please add valid card details";
            $scope.isAvailabilityFull = true;
            return false;
        }
        CommonService.add_seva(seva).success(function (data) {
            console.log(data);
            if (data.is_inserted) {
                $scope.isInserted = true;
                $scope.success_msg = "Your payment has been received and seva is has been booked successfully.";
                $scope.seva = {};
                $scope.payPage = false;
            } else {
                $scope.avail_msg = "Opps!!! Something wrong..Please try after some time....";
                $scope.isAvailabilityFull = true;
            }
        });
    }
    $scope.go_to_seva_payment = function () {
        var data = $scope.seva;
        var ticket_limit = $scope.noOfTicket.value;
        $scope.isAvailabilityFull = false;
        data['user_id'] = $window.localStorage.getItem('uid');

        if (data.sevaes.available_days != 'everyday') {
            var visit_date = data.visit_date;
            var date_arr = visit_date.split('/');
            var d = new Date();
            d.setFullYear(date_arr[2], date_arr[0] - 1, date_arr[1]);
            var avail_days = data.sevaes.available_days.split(',');
            console.log(d.getDay());
            console.log(avail_days);
            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var str_days = "";
            var isNotAvail = true;
            for (var count = 0; count < avail_days.length; count++) {
                str_days += days[avail_days[count]];
                if (count != avail_days.length - 1) {
                    str_days += ", ";
                }
                if (d.getDay() == avail_days[count]) {
                    isNotAvail = false;
                }
            }
            if (isNotAvail) {
                $scope.avail_msg = data.sevaes.seva_name + " is available only on days : " + str_days;
                $scope.isAvailabilityFull = true;
                return false;
            }
        }

        if (data.no_of_people > ticket_limit) {
            $scope.avail_msg = "Only " + ticket_limit + " peoples are allow for one days.";
            $scope.isAvailabilityFull = true;
            return false;
        } else {
            data['type'] = 'seva';
            CommonService.check_availability(data).success(function (result) {
                console.log(result)
                console.log(result.record[0].no_of_pos + data.no_of_people);
                if (result.record[0].no_of_pos != null) {
                    if (result.record[0].no_of_pos >= ticket_limit) {
                        $scope.avail_msg = "Quota of the selected date was full. Please try other day.";
                        $scope.isAvailabilityFull = true;
                        return false;
                    } else if ((result.record[0].no_of_pos + data.no_of_people) > ticket_limit) {
                        $scope.avail_msg = "Only " + (ticket_limit - result.record[0].no_of_pos) + " places are available for selected day.";
                        $scope.isAvailabilityFull = true;
                    } else {
                        $scope.amount = data.no_of_people * data.sevaes.price;
                        $scope.payPage = true;
                    }
                } else {
                    $scope.amount = data.no_of_people * data.sevaes.price;
                    $scope.payPage = true;
                }
            });
        }
    }


    $scope.add_special = function () {
        var special = $scope.special;
        special['amount'] = $scope.amount;

        $scope.isAvailabilityFull = false;
        var expDate = new Date();
        expDate.setFullYear($scope.special.year, parseInt($scope.special.month), 1);
        if(expDate < new Date()){
            $scope.avail_msg = "Your card is expired. Please add valid card details";
            $scope.isAvailabilityFull = true;
            return false;
        }

        CommonService.add_special(special).success(function (data) {
            console.log(data);
            if (data.is_inserted) {
                $scope.isInserted = true;
                $scope.success_msg = "Your payment has been received and special entry darshan is has been booked successfully.";
                $scope.special = {};
                $scope.payPage = false;
            } else {
                $scope.avail_msg = "Opps!!! Something wrong..Please try after some time....";
                $scope.isAvailabilityFull = true;
            }
        });
    }
    $scope.go_to_special_payment = function () {
        var data = $scope.special;
        $scope.isAvailabilityFull = false;
        var ticket_limit = $scope.noOfTicket.value;
        data['user_id'] = $window.localStorage.getItem('uid');
        if (data.no_of_people > ticket_limit) {
            $scope.avail_msg = "Only " + ticket_limit + " peoples are allow for one days.";
            $scope.isAvailabilityFull = true;
            return false;
        } else {
            data['type'] = 'special';
            CommonService.check_availability(data).success(function (result) {
                console.log(result)
                console.log(result.record[0].no_of_pos + data.no_of_people);
                if (result.record[0].no_of_pos != null) {
                    if (result.record[0].no_of_pos >= ticket_limit) {
                        $scope.avail_msg = "Quota of the selected date was full. Please try other day.";
                        $scope.isAvailabilityFull = true;
                        return false;
                    } else if ((result.record[0].no_of_pos + data.no_of_people) > ticket_limit) {
                        $scope.avail_msg = "Only " + (ticket_limit - result.record[0].no_of_pos) + " places are available for selected day.";
                        $scope.isAvailabilityFull = true;
                    } else {
                        $scope.amount = data.no_of_people * 30;
                        $scope.payPage = true;
                    }
                } else {
                    $scope.amount = data.no_of_people * 30;
                    $scope.payPage = true;
                }
            });
        }
    }


    // ======================== Hundi Offering Start ========
    $scope.add_hundi = function () {
        var hundi = $scope.hundi;

        $scope.isAvailabilityFull = false;
        var expDate = new Date();
        expDate.setFullYear($scope.hundi.year, parseInt($scope.hundi.month), 1);
        if(expDate < new Date()){
            $scope.avail_msg = "Your card is expired. Please add valid card details";
            $scope.isAvailabilityFull = true;
            return false;
        }
        CommonService.add_hundi(hundi).success(function (data) {
            console.log(data);
            if (data.is_inserted) {
                $scope.isInserted = true;
                $scope.success_msg = "Payment has been received for your Hundi. Thank you......";
                $scope.hundi = {};
                $scope.payPage = false;
            } else {
                $scope.avail_msg = "Opps!!! Something wrong..Please try after some time....";
                $scope.isAvailabilityFull = true;
            }
        });
    }
    $scope.go_to_hundi_payment = function () {
        var data = $scope.hundi;
        console.log(data);
        $scope.isAvailabilityFull = false;
        data['user_id'] = $window.localStorage.getItem('uid');
        $scope.amount = data.no_of_people * 300;
        $scope.payPage = true;
    }
    // ======================== Hundi Offering End ========

    $scope.manageUser = function (user) {
        CommonService.manageUser(user).success(function (data) {
            var data = {}
            CommonService.getAllUsers(data).success(function (data) {
                $scope.all_users = data.records;
            });
        });
    }
    $scope.updatePanel = function (keys, values) {
        var data = {"keys": keys, "values": values};
        $scope.showUpd = false;
        CommonService.updateCPanel(data).success(function (data) {
            $scope.showUpd = true;
        });
    }
}]);

