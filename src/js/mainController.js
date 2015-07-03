angular.module("mainApp", [])

/*.config(["$routeProvider", function($routeProvider) {
	$routeProvider.
		when("/userform", {
			templateUrl : 'templates/userform.tmpl.html',
			controller : 'userController'
		}).
		when("/userlist", {
			templateUrl : 'templates/userlist.tmpl.html'
		}).
		otherwise({ 
			redirectTo: '/userlist' 
		});

}])*/

/*app.service("PersonService", function(){
	var uid = 1;
	var personList = [
		{
			name : 'Ragesh Kumar',
			email : 'rageshkumarakb@gmail.com',
			address : 'Perambra, Koothali',
			nationality : 'India'
		}
	]

	this.save = function(person) {
		if(person.id == null) {
			person.id = uid++;
			personList.push(person);
		} else {
			for (i in personList) {
				if(personList[i].id == person.id) {
					personList[i] = person;
				}
			}
		}

	}

	this.delete =  function(id) {
		for(i in personList) {
			if (personList[i].id == id) {
				personList.splice(i,1);
			}
		}
	}
	this.get = function(id) {
		for (i in personList) {
			if (personList[i].id == id) {
				return personList[i];
			}
		}
	}
	this.list =  function() {
		return personList;
	}
});

app.controller("mainController", function($scope, PersonService){
	$scope.persons = PersonService.list();
	
	$scope.save = function() {
		PersonService.save($scope.person);
		$scope.person = {};
	}

	$scope.delete =  function(id) {
		PersonService.delete(id);
	}

	$scope.edit =  function(id) {
		$scope.person = angular.copy(PersonService.get(id));
	}
	/*$scope.person = {
		firstName : 'Rajeesh',
		lastName : 'AK'
	};*/
	/*$scope.firstName = "Ragesh";
	$scope.lastName = "Kumar";*/
	/*$scope.user1 = {
		firstName : 'Ragesh',
		lastName : 'Kumar'
	}

	$scope.user2 = {
		firstName : 'Rajeesh',
		lastName : 'Kumar'
	}
	$scope.reverseUser = function() {
		var user2original = $scope.user2;
		$scope.user2 = $scope.user1;
		$scope.user1 = user2original;
	}
	$scope.userheading1 = "User 1 Information";
	$scope.userheading2 = "User 2 Information";*/

/*.controller("userController", function($scope){
	$scope.showModal = true;

})*/

/*app.directive("user", function(){

	var directive = {};
	directive.restrict = 'E';
	directive.scope = {
		user : '=userinfo'
	}
	directive.transclude = true;
	directive.template = "<div><h2 ng-transclude></h2><div>Full name : {{user.firstName}}, " + "{{user.lastName}} </div><div>";
	directive.compile =  function(element, attrs) {
		element.css('color', 'red');
		var link =  function($scope, element, attrs) {			
			if ($scope.user.firstName == 'Ragesh') {
				element.css('color', 'blue');
			} else if ($scope.user.firstName == 'Rajeesh') {
				element.css('color', 'green');
			}
		}
		return link;
	}
	return directive;

});*/

/*.directive("modal", function() {
	return {
		templateUrl : 'templates/modal.html',
		restrict : 'E',
		transclude : true,
		scope : true,
		replace:true,
		link : function (scope, element, attrs) {
			scope.title = attrs.title;
			$(element).modal("show");
			
			/*scope.$watch(attrs.visible, function(value){
				if(value) {
					$(element).modal("show");
				} else {
					$(element).modal("hide");
				}
			});*/
		//}
	//};
//});*/