mainApp.controller('updateContractController', function ($rootScope, reqResponseService, $routeParams, contractDetailService, updateContractService, $location) {
    console.log("in updateContractController conntroller.....")
    console.log("Passed PONUmber" + $routeParams.poNumber);

    var thisCtrl = this;
    console.log("Global User Name" + $rootScope.loginUserId);

    getContractDetails("");



    thisCtrl.editContract = function (poNumber) {
        console.log("poNumber==" + poNumber);
        $location.path('/editcontract/' + poNumber);
    }

    function getContractDetails(updatedPONumber) {
        var reqJsonPromise = reqResponseService.getRequestJson('./app/json/reqGetContractInstances.json');
        //var userData = "loginUserName:" + thisCtrl.email + "," + "loginPassword:" + thisCtrl.password;
        reqJsonPromise.then(function (val) {
            console.log('Get json Success: ', val);
            var userData = "";

            if (updatedPONumber == "") {
                userData = $routeParams.poNumber;
            } else {
                userData = updatedPONumber;
            }

            var reqJsonData = reqResponseService.getQueryRequestToBlockchain(val, "getContractInstanceDetailsForTrader", userData);

            var promise = contractDetailService.getContractDetails(reqJsonData);

            promise.then(function (val) {
                console.log('Get Login Success: ', val);

                var result = JSON.parse(val.result.message)[0];
                //var result = val[0];

                if (updatedPONumber == "") {
                    thisCtrl.SELECTED_BUYER_NAME = result.SELECTED_BUYER_NAME;
                    thisCtrl.PURCHASE_ORDER = result.PURCHASE_ORDER;
                    thisCtrl.TOTAL_PRICE = result.TOTAL_PRICE;
                    thisCtrl.CURRENCY = result.CURRENCY;
                    thisCtrl.DELIVERY_DATE = result.DELIVERY_DATE;
                    thisCtrl.INCOTERM = result.INCOTERM;
                    thisCtrl.PAYMENT_CONDITIONS = result.PAYMENT_CONDITIONS;
                    thisCtrl.ARTICLE_ID1 = result.ARTICLE_ID1;
                    thisCtrl.ARTICLE_DESC1 = result.ARTICLE_DESC1;
                    thisCtrl.ARTICLE_QUANTITY1 = result.ARTICLE_QUANTITY1;
                    thisCtrl.ARTICLE_ID2 = result.ARTICLE_ID2;
                    thisCtrl.ARTICLE_DESC2 = result.ARTICLE_DESC2;
                    thisCtrl.ARTICLE_QUANTITY2 = result.ARTICLE_QUANTITY2;
                    thisCtrl.BUYER_PAYMENT_CONFIRNMATION = (result.BUYER_PAYMENT_CONFIRNMATION == "true");
                    thisCtrl.SELLER_INFO_COUNTER_PARTY = (result.SELLER_INFO_COUNTER_PARTY == "true");
                    thisCtrl.BUYER_BANK_COMMITMENT = (result.BUYER_BANK_COMMITMENT == "true");
                    thisCtrl.SELLER_FOR_FAIT_INVOICE = (result.SELLER_FOR_FAIT_INVOICE == "true");
                    thisCtrl.INVOICE_STATUS = result.INVOICE_STATUS;
                    thisCtrl.PAYMENT_STATUS = result.PAYMENT_STATUS;
                    thisCtrl.CONTRACT_STATUS = result.CONTRACT_STATUS;
                    thisCtrl.DELIVERY_STATUS = result.DELIVERY_STATUS;
                    thisCtrl.IS_ORDER_CONFIRM = (result.IS_ORDER_CONFIRM == "true");
                    thisCtrl.DELIVERY_TRACKING_ID = result.DELIVERY_TRACKING_ID;
                } else {
                    thisCtrl.INVOICE_STATUS = result.INVOICE_STATUS;
                    thisCtrl.PAYMENT_STATUS = result.PAYMENT_STATUS;
                    thisCtrl.CONTRACT_STATUS = result.CONTRACT_STATUS;
                    thisCtrl.DELIVERY_STATUS = result.DELIVERY_STATUS;
                    thisCtrl.IS_ORDER_CONFIRM = result.IS_ORDER_CONFIRM;
                    thisCtrl.DELIVERY_TRACKING_ID = result.DELIVERY_TRACKING_ID;
                }
            }, function (reason) {
                console.log('Login Failed: ', reason);
            });

        }, function (reason) {
            console.log('Get Json Failed: ', reason);

        });
    }

    thisCtrl.confirmContract = function (poNumber, eventClicked, eventStatus) {
        thisCtrl.commonUpdateFunction(poNumber, eventClicked, eventStatus);
    }

    thisCtrl.commonUpdateFunction = function (poNumber, eventClicked, eventStatus) {
        var reqJsonPromise = reqResponseService.getRequestJson('./app/json/blockchainRequest.json');
        //var userData = "loginUserName:" + thisCtrl.email + "," + "loginPassword:" + thisCtrl.password;
        reqJsonPromise.then(function (val) {
            console.log('Get json Success: ', val);

            //var userData = $routeParams.poNumber;

            var reqJsonData = reqResponseService.getUpdateRequestToBlockchain(val, "UpdateStatusDetails", $rootScope.loginUserId, poNumber, eventClicked, eventStatus);

            var promise = updateContractService.updateContractPromise(reqJsonData);

            promise.then(function (val) {
                console.log('Get Login Success: ', val);                
                //$location.path('/updatecontract/' + poNumber);
                getContractDetails(poNumber);

            }, function (reason) {

                console.log('Login Failed: ', reason);
                //$location.path('/updatecontract/' + poNumber);
                getContractDetails(poNumber);
            });

        }, function (reason) {
            console.log('Get Json Failed: ', reason);

        });
    }
    
});