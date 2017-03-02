mainApp.service('registerTraderService', function ($http, $q) {
    console.log('registerTraderService called..');

    this.registerTraderPromise = function (traderData) {
        console.log("traderData Data =" + traderData);
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/todo',
            data: traderData,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (data) {
            deferred.resolve(data.data);
        }, function (msg, code) {
            deferred.reject(msg);
        });
        return deferred.promise;
    }
})