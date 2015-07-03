var app = angular.module("mainApp", ['ngRoute','controllers']);

app.controller("MainCtrl", function($scope) {
	$scope.checked = true;
	$scope.toggleChecked =  function() {
		if($scope.checked) {
			return true;
		}
		return false;
	}
});

app.config(["$routeProvider", function($routeProvider) {

	$routeProvider.
		when("/users", {
			templateUrl : "templates/users.tmpl.html",
			controller : "UserListCtrl"
		}).
		when("/users/:id", {
			templateUrl : "templates/userdetail.tmpl.html",
			controller : "UserDetailCtrl"
		}).
		when("/createuser", {
			templateUrl : 'templates/userdetail.tmpl.html',
			controller : "UserCreationCtrl"
		}).
		otherwise({
			redirectTo : '/users'
		});

}]);