angular.module("controllers",['ui.bootstrap','user.factories','services','toaster'])
	.controller("UserListCtrl", function($scope, $location,$modal, Users) {
		$scope.user = {};
		$scope.users = Users.getAll();

		$scope.open =  function(user) {
			var modalInstance = $modal.open({
				templateUrl : "templates/userdetail.tmpl.html",
				controller : "UserCreationCtrl",
				resolve : {
					item : function(){
						return user;
					}
				}
			});
			modalInstance.result.then(function(selectedObject) {

			})
		}		

	})
	.controller("UserDetailCtrl", function($scope, $routeParams, $firebase, fbURL, user_table, Users) {
		$scope.id = $routeParams.id;

		fb.child('emails_to_ids/'+emailToKey(emailAddress)).once('value', function(snap) {
       callback( snap.val() );
   });
		var userURL = fbURL + user_table + "/" + $scope.id;
		//$scope.user = Users.getById($scope.id);
		//firebase( new Firebase(userURL) ).$bind($scope, 'user');
		//$scope.user = $firebase(new Firebase(userURL));		
		/*$scope.user = {
		"id" : 2,
		"firstName" : "Ragesh",
		"lastName": "Kumar",
		"nationality" : "Indian",
		"location" : "Calicut"
		};*/

		


	})
	.controller("UserCreationCtrl", function($scope,$modalInstance,$location, Users, item, IdGenerator, toaster) {
		$scope.user = angular.copy(item);

		$scope.cancel = function() {
			$modalInstance.dismiss("cancel");
		}

		$scope.createUser =  function(user) {
			user.id = IdGenerator.getId();
			var save = Users.getAll().$add(user);
			$modalInstance.dismiss("cancel");
			toaster.pop('success', "title", "text");
			$location.path("/users");
		}

	});
