var mainApp = angular.module('mainApp',["ngRoute"]);

mainApp.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/edit/:ID/:Name', {
        templateUrl : './app/templates/templateform.html'
    })
    .when('/login', {
        templateUrl : './app/templates/login.html'
    })
    .when('/registerbank', {
        templateUrl : './app/templates/registerBank.html'
    })
    .when('/', {
        templateUrl : './app/templates/login.html'
    })
    .when('/contractdetails', {
        templateUrl : './app/templates/contractDetails.html'
    })
    .when('/createcontract', {
        templateUrl : './app/templates/createContract.html'
    })
    .when('/editcontract/:poNumber', {
        templateUrl : './app/templates/updateContract.html'
    })
    .when('/updatecontract/:poNumber', {
        templateUrl : './app/templates/updateContract.html'
    })
    .when('/registerTrader', {
        templateUrl : './app/templates/registerTrader.html'
    })
    
});


mainApp.controller('mainController',function(){
    console.log("in conntroller.....")
    console.log('dfdjfj');
})