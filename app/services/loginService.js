mainApp.service('loginService', function ($http, $q) {

    this.postLoginPromise = function (reqJson) {
       console.log("reqJson==="+reqJson);
       var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/todo',
            data: reqJson,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (data) {
            deferred.resolve(data.data);
        }, function (msg, code) {
            deferred.reject(msg);
        });
        return deferred.promise;
    }
})