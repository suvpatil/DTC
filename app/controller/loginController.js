mainApp.controller('loginController', function (loginService, $rootScope, $scope, reqResponseService,$location) {
    console.log("in Login conntroller.....")
    var thisCtrl = this;

    thisCtrl.login = function () {
        console.log('Email=' + thisCtrl.email);
        console.log('Password=' + thisCtrl.password);

        if(thisCtrl.email == "sachin_seller" && thisCtrl.password == "1234"){
            $rootScope.loginUserId = thisCtrl.email;
            $rootScope.loginSuccess = true;
            $rootScope.role = "seller";
            $rootScope.activeMenu = "contractDetails"
            $location.path('/contractdetails');
        }else if(thisCtrl.email == "abc_buyer" && thisCtrl.password == "1234"){
            //$rootScope.loginUserId = thisCtrl.email;
            $rootScope.loginUserId = "sachin_seller";
            $rootScope.loginSuccess = true;
            $rootScope.role = "buyer";
            $rootScope.activeMenu = "contractDetails"
            $location.path('/contractdetails');
        }

    //     var reqJsonPromise = reqResponseService.getRequestJson('./app/json/blockchainRequest.json');
    //     var userData = "loginUserName:" + thisCtrl.email + "," + "loginPassword:" + thisCtrl.password;
    //     reqJsonPromise.then(function (val) {
    //         console.log('Get json Success: ', val);

    //         var reqJsonData = reqResponseService.getRequestToBlockchain(val, "traderLogin", userData);

    //         var promise = loginService.postLoginPromise(reqJsonData);

    //         promise.then(function (val) {
    //             console.log('Login Success: ', val);
    //             $rootScope.loginUserId = thisCtrl.email;
    //             $rootScope.loginSuccess = true;

    //         }, function (reason) {
    //             console.log('Login Failed: ', reason);
    //             $rootScope.loginUserId = thisCtrl.email;
    //             $rootScope.loginSuccess = true;
    //         });

    //     }, function (reason) {
    //         console.log('Get Json Failed: ', reason);

    //     });
     }
})