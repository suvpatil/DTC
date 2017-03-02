mainApp.controller('contractDetailController', function (contractDetailService,$rootScope,reqResponseService,$location) {
    console.log("in contractDetailController conntroller.....")
    var thisCtrl = this;
    console.log("Global User Name"+$rootScope.loginUserId);
    
    var reqJsonPromise = reqResponseService.getRequestJson('./app/json/reqGetContractInstances.json');
        //var userData = "loginUserName:" + thisCtrl.email + "," + "loginPassword:" + thisCtrl.password;
        reqJsonPromise.then(function (val) {
            console.log('Get json Success: ', val);

            var userData = $rootScope.loginUserId;

            var reqJsonData = reqResponseService.getQueryRequestToBlockchain(val,"getContractInstanceDetailsForTrader", userData);

            var promise = contractDetailService.getContractDetails(reqJsonData);

            promise.then(function (val) {
                console.log('Get Login Success: ', val);
                
                thisCtrl.contractDetailsList = JSON.parse(val.result.message);

                //thisCtrl.contractDetailsList = val;
            }, function (reason) {
                console.log('Login Failed: ', reason);
            });

        }, function (reason) {
            console.log('Get Json Failed: ', reason);

        });

        thisCtrl.editContract = function(poNumber){
                console.log("poNumber=="+poNumber);
                 //$rootScope.activeMenu = "editcontract";
                $location.path('/editcontract/'+poNumber);
        }

        thisCtrl.navigateToCreateContract = function(){
            $rootScope.activeMenu = "createcontract";
            $location.path('/createcontract');
        }

})