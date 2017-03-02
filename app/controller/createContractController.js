mainApp.controller('createContractController', function (createContractService, $rootScope,reqResponseService,$location,$timeout) {
    console.log("in createContractController conntroller.....")
    var thisCtrl = this;
    console.log("Global User Name" + $rootScope.loginUserId);

    var promise = createContractService.getTraderList();

    promise.then(function (val) {
        console.log('Success: ', val);
        thisCtrl.traderList = val;
    }, function (reason) {
        console.log('Failed: ', reason);
    });

    thisCtrl.getTraderDetails = function () {
        console.log("Selected Name= " + thisCtrl.selecteTraderdName);

        var promise = createContractService.getTraderDetails();

        promise.then(function (traderDetailsList) {
            console.log('Success: ', traderDetailsList);

            var selectedTraderDetailsObj = traderDetailsList.filter(function (val) {
                return val.loginUserName === thisCtrl.selecteTraderdName;
            });

            console.log("selectedTraderDetailsObj==" + selectedTraderDetailsObj);

            thisCtrl.traderName = selectedTraderDetailsObj[0].traderName;
            thisCtrl.bank = selectedTraderDetailsObj[0].bank;
            thisCtrl.vat = selectedTraderDetailsObj[0].vat;
            thisCtrl.iban = selectedTraderDetailsObj[0].iban;
            thisCtrl.address_street = selectedTraderDetailsObj[0].addr_street;
            thisCtrl.address_street_number = selectedTraderDetailsObj[0].addr_streetNumber;
            thisCtrl.address_postalcode = selectedTraderDetailsObj[0].addr_postalCode;
            thisCtrl.address_city = selectedTraderDetailsObj[0].addr_city;
            thisCtrl.address_country = selectedTraderDetailsObj[0].addr_country;
            thisCtrl.address = selectedTraderDetailsObj[0].addr_streetNumber + "," + selectedTraderDetailsObj[0].addr_street + "," + selectedTraderDetailsObj[0].addr_postalCode + "," + selectedTraderDetailsObj[0].addr_city + "," + selectedTraderDetailsObj[0].addr_country;
            //thisCtrl.traderList = val;
        }, function (reason) {
            console.log('Failed: ', reason);
        });
    }

    thisCtrl.saveContract = function () {
        console.log("saveContract Selected Name= " + thisCtrl.selecteTraderdName);

        var reqJsonPromise = reqResponseService.getRequestJson('./app/json/blockchainRequest.json');
        //var userData = "loginUserName:" + thisCtrl.email + "," + "loginPassword:" + thisCtrl.password;
        reqJsonPromise.then(function (val) {
            console.log('Get json Success: ', val);

            //var reqJsonData = thisCtrl.getCreateContractReq(val, "createContract", thisCtrl,$rootScope.loginUserId);
            var userData = "traderLoginUserName:"+$rootScope.loginUserId+",isBuyer:"+false+",isSeller:"+true+",selectedBuyerName:"+thisCtrl.selecteTraderdName+
                            ",purchaseOrder:"+thisCtrl.purchaseOrder+",totalPrice:"+thisCtrl.totalPrice+",currency:"+thisCtrl.currency+
                            ",deliveryDate:"+thisCtrl.deliveryDate+",incoterm:"+thisCtrl.incoterm+",paymentConditions:"+thisCtrl.paymentConditions+
                            ",articleId1:"+thisCtrl.articleId1+",articleDesc1:"+thisCtrl.articleDesc1+",articleQuantity1:"+thisCtrl.articleQuantity1+
                            ",articleId2:"+thisCtrl.articleId2+",articleDesc2:"+thisCtrl.articleDesc2+",articleQuantity1:"+thisCtrl.articleQuantity2+
                            ",buyerPaymentConfrimation:"+thisCtrl.buyerPaymentConfrimation+",sellerInfoCounterParty:"+thisCtrl.sellerInfoCounterParty+
                            ",buyerBankCommitment:"+thisCtrl.buyerBankCommitment+",sellerForfaitInvoice:"+thisCtrl.sellerForfaitInvoice+
                            ",invoiceStatus:Not Send,paymentStatus:Not confirmed, contractStatus:Started, deliveryStatus:Point not reached,"+ 
                            "isOrderConfirmed:false, deliveryTrackingId:123";

            var reqJsonData = reqResponseService.getRequestToBlockchain(val,"createContract", userData);

            var promise = createContractService.postCreateContractPromise(reqJsonData);

            promise.then(function (val) {
                console.log('Login Success: ', val);
                if(val.result.status == "OK"){
                     $timeout(callAtTimeout, 15000);
                    //$rootScope.activeMenu = "contractDetails"
                    //$location.path('/contractdetails');
                }
                
            }, function (reason) {
                console.log('Login Failed: ', reason);
                //$rootScope.activeMenu = "contractDetails"
               // $location.path('/contractdetails');
            });

        }, function (reason) {
            console.log('Get Json Failed: ', reason);

        });
    }

    function callAtTimeout(){
        $rootScope.activeMenu = "contractDetails"
        $location.path('/contractdetails');
    }

     thisCtrl.getCreateContractReq = function (reqJsonData, functionaName,thisCtrl,loginUserId) {
        console.log("getCreateContractReq Called...");
        console.log("reqJsonData Data =" + reqJsonData);
       
        reqJsonData.params.ctorMsg.args[0] = functionaName;
        reqJsonData.params.ctorMsg.args[1] = loginUserId;
        reqJsonData.params.ctorMsg.args[2] = true;
        reqJsonData.params.ctorMsg.args[3] = false;
        reqJsonData.params.ctorMsg.args[4] = thisCtrl.selecteTraderdName;
        reqJsonData.params.ctorMsg.args[5] = thisCtrl.purchaseOrder;
        reqJsonData.params.ctorMsg.args[6] = thisCtrl.totalPrice;
        reqJsonData.params.ctorMsg.args[7] = thisCtrl.currency;
        reqJsonData.params.ctorMsg.args[8] = thisCtrl.deliveryDate;
        reqJsonData.params.ctorMsg.args[9] = thisCtrl.incoterm;
        reqJsonData.params.ctorMsg.args[10] = thisCtrl.paymentConditions;
        reqJsonData.params.ctorMsg.args[11] = thisCtrl.articleId1;
        reqJsonData.params.ctorMsg.args[12] = thisCtrl.articleDesc1;
        reqJsonData.params.ctorMsg.args[13] = thisCtrl.articleQuantity1;
        reqJsonData.params.ctorMsg.args[14] = thisCtrl.articleId2;
        reqJsonData.params.ctorMsg.args[15] = thisCtrl.articleDesc2;
        reqJsonData.params.ctorMsg.args[16] = thisCtrl.articleQuantity2;
        reqJsonData.params.ctorMsg.args[17] = thisCtrl.buyerPaymentConfrimation;
        reqJsonData.params.ctorMsg.args[18] = thisCtrl.sellerInfoCounterParty;
        reqJsonData.params.ctorMsg.args[19] = thisCtrl.buyerBankCommitment;
        reqJsonData.params.ctorMsg.args[20] = thisCtrl.sellerForfaitInvoice;

        return reqJsonData;

    }

})