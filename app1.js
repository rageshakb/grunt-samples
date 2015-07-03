var app = angular.module("mainApp", ['ui.router']);

app.controller("HomeCtrl", function($scope) {

});

app.controller("NavBarCtrl", function($scope, $state) {

	$scope.isStateActive = function(state) {
		var currState = $state.$current.name;
		console.log("Current state : " + currState);
		return currState.match(state);
	}

})

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/home/home1");

	$stateProvider.
		state("home", {
			url : "/home",
			templateUrl : "partials/home.tmpl.html",
			controller : "HomeCtrl"
		}).
		state("home.home1", {
			url : "/home1",
			templateUrl : "partials/home1.tmpl.html"
			
		}).
		state("home.about1", {
			url : "/about1",
			templateUrl : "partials/about1.tmpl.html"
		}).
		state("about", {
			url : "/about",
			templateUrl : "partials/about.tmpl.html"
		}).
		state("about.home1", {
			url : "/home1",
			templateUrl : "partials/home1.tmpl.html"
		}).
		state("about.about1", {
			url : "/about1",
			templateUrl : "partials/about1.tmpl.html"
		});

}]);