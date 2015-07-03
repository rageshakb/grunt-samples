var routerApp = angular.module("uirouterApp", ["ui.router"]);

routerApp.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/home");

	$stateProvider.
		state("home", {
			url : "/home",
			templateUrl : "partials/home.tmpl.html"
		}).
		state("home.location", {
			url : "/location",
			templateUrl : "partials/location.tmpl.html"
		}).
		state("home.services", {
			url : "/services",
			templateUrl : "partials/services.tmpl.html"
		}).
		state("about", {
			url : "/about",
			views : {
				"" : {templateUrl : "partials/about.tmpl.html"},
				"about1@about" : {
					templateUrl : "partials/location.tmpl.html"
				},
				"about2@about" : {
					templateUrl : "partials/services.tmpl.html"
				}
			}
			//templateUrl : "partials/about.tmpl.html"
		});

}]);