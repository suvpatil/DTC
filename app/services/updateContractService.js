mainApp.service('updateContractService', function ($http, $q) {

    this.updateContractPromise = function (reqJsonData) {
        console.log("reqJsonData Data =" + reqJsonData);
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://192.168.99.100:7050/chaincode/',
            //url: "./app/json/traderList.json",
            data: reqJsonData,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (data) {
            deferred.resolve(data.data);
        }, function (msg, code) {
            deferred.reject(msg);
        });
        return deferred.promise;
    }
});