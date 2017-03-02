mainApp.service('reqResponseService', function ($http, $q) {

    this.getRequestJson = function (reqUrl) {
        console.log("getRequestJson Called...");
        var deferred = $q.defer();
        $http({
            method: 'GET',
            // url: './app/json/blockchainRequest.json',
            url: reqUrl,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (data) {
            deferred.resolve(data.data);
            console.log("data.data===" + data.data);

        }, function (msg, code) {
            deferred.reject(msg);
        });
        return deferred.promise;
    }

    this.getRequestToBlockchain = function (reqJsonData, functionaName, userData) {
        console.log("getRequestToBlockchain Called...");
        console.log("reqJsonData Data =" + reqJsonData);
        console.log("User Data =" + userData);

        reqJsonData.params.ctorMsg.args[0] = functionaName;
        reqJsonData.params.ctorMsg.args[1] = userData;

        return reqJsonData;

    }

    this.getQueryRequestToBlockchain = function (reqJsonData, functionaName, userData) {
        console.log("getRequestToBlockchain Called...");
        console.log("reqJsonData Data =" + reqJsonData);
        console.log("User Data =" + userData);

        reqJsonData.params.ctorMsg.function = functionaName;
        reqJsonData.params.ctorMsg.args[0] = userData;

        return reqJsonData;

    }

    this.getUpdateRequestToBlockchain = function (reqJsonData, functionaName, loginName, poNumber, statusTobeUpdated, currentStatus) {
        console.log("getRequestToBlockchain Called...");
        console.log("reqJsonData Data =" + reqJsonData);

        reqJsonData.params.ctorMsg.args[0] = functionaName;
        reqJsonData.params.ctorMsg.args[1] = loginName;
        reqJsonData.params.ctorMsg.args[2] = poNumber;
        reqJsonData.params.ctorMsg.args[3] = statusTobeUpdated;
        //reqJsonData.params.ctorMsg.args[4] = currentStatus;

        return reqJsonData;

    }


})