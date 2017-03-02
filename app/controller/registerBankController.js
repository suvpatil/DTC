mainApp.controller('registerBankController',function(registerBankService,reqResponseService){
    console.log("in registerBankController conntroller.....")
    var thisCtrl = this;

    thisCtrl.registerBank = function(){
        //registerBankService.registerBankPromise({bankName:thisCtrl.bankName,bankAddress:thisCtrl.address,uniqueIdCode:thisCtrl.ifscCode});
        
        var reqJsonPromise = reqResponseService.getRequestJson('./app/json/blockchainRequest.json');
        var userData = "bankName:"+thisCtrl.bankName+",bankAddress:"+thisCtrl.address+",uniqueIdCode:"+thisCtrl.ifscCode;
        reqJsonPromise.then(function (val) {
            console.log('Get json Success: ', val);

            var reqJsonData = reqResponseService.getRequestToBlockchain(val, "registerBank",userData);

            var promise = registerBankService.registerBankPromise(reqJsonData);

            promise.then(function (val) {
                console.log('Register Bank Success: ', val);
            }, function (reason) {
                console.log('Register Bank Failed: ', reason);
            });

        }, function (reason) {
            console.log('Get Json Failed: ', reason);
        });
    }
})