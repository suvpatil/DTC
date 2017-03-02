mainApp.service('contractDetailService',function($http, $q){
    

    this.getContractDetails = function(reqJsonData){
        console.log("contractDetailService Called...");
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://192.168.99.100:7050/chaincode/',
            //method: 'GET',
            //url: './app/json/contractDetails.json',
            data:reqJsonData,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (data) {
            deferred.resolve(data.data);
            console.log("data.data==="+data.data);
        }, function (msg, code) {
            deferred.reject(msg);
        });
        return deferred.promise;
    }
   
})