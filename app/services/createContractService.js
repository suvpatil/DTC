mainApp.service('createContractService', function ($http, $q) {


    this.getTraderList = function () {
        console.log("getTraderList Called...");
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: './app/json/traderList.json',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (data) {
            deferred.resolve(data.data);
            console.log("data.data===" + data.data);
        }, function (msg, code) {
            deferred.reject(msg);
        });
        return deferred.promise;
    }

    this.getTraderDetails = function () {
        console.log("getTraderDetails Called...");
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: './app/json/traderList.json',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (data) {
            deferred.resolve(data.data);
            console.log("data.data===" + data.data);
        }, function (msg, code) {
            deferred.reject(msg);
        });
        return deferred.promise;
    }

    this.postCreateContractPromise = function (reqJsonData) {
        console.log("reqJsonData Data =" + reqJsonData);
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://192.168.99.100:7050/chaincode/',
            data: reqJsonData,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (data) {
            deferred.resolve(data.data);
        }, function (msg, code) {
            deferred.reject(msg);
        });
        return deferred.promise;
    }

})