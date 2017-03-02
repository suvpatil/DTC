mainApp.controller('registerTraderController',function(registerTraderService,reqResponseService){
    console.log("in registerTraderController conntroller.....")
    var thisCtrl = this;
  
    thisCtrl.registerTrader = function(){
        // registerTraderService.registerTraderPromise(
        //     {traderName:thisCtrl.traderName,addr_street:thisCtrl.street,
        //         addr_streetNumber:thisCtrl.streetNumber,addr_postalCode:thisCtrl.postalCode,addr_city:thisCtrl.city,
        //         addr_country:thisCtrl.country,
        //         vat:thisCtrl.vat,iban:thisCtrl.iban,bank:thisCtrl.selectedBankName,
        //         loginUserName:thisCtrl.email,loginPassword:thisCtrl.password});
        
        var reqJsonPromise = reqResponseService.getRequestJson('./app/json/blockchainRequest.json');
        var userData = "traderName:"+thisCtrl.traderName+",addr_street:"+thisCtrl.street+",addr_streetNumber:"+
                        thisCtrl.streetNumber+",addr_postalCode:"+thisCtrl.postalCode+",addr_city:"+thisCtrl.city+",addr_country:"+
                        thisCtrl.country+",vat:"+thisCtrl.vat+",iban:"+thisCtrl.iban+",bank:"+thisCtrl.selectedBankName+",loginUserName:"+
                        thisCtrl.email+",loginPassword:"+thisCtrl.password;
        reqJsonPromise.then(function (val) {
            console.log('Get json Success: ', val);

            var reqJsonData = reqResponseService.getRequestToBlockchain(val, "registerTrader",userData);

            var promise = registerTraderService.registerTraderPromise(reqJsonData);

            promise.then(function (val) {
                console.log('Register Trader Success: ', val);
            }, function (reason) {
                console.log('Register Trader Failed: ', reason);
            });

        }, function (reason) {
            console.log('Get Json Failed: ', reason);
        });
    }
})