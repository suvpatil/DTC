mainApp.service('registerBankService', function ($http, $q) {
    console.log('registerBankService called..');
    this.registerBankPromise = function (bankData) {
        console.log("bankData Data =" + bankData);
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/todo',
            data: bankData,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (data) {
            deferred.resolve(data.data);
        }, function (msg, code) {
            deferred.reject(msg);
        });
        return deferred.promise;
    }
})