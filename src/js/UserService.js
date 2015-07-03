angular.module("services", [])
	.service("UserServiceAPI", function($http){
		var id = 11;
		this.listAll = function() {
			return $http.get("data/users.json");
		}
		this.getUserById = function(id) {
			return $http.get("data/user.json");
		}
		
	})
	.service("IdGenerator", function(){
		var id = 1;

		this.getId =  function() {
			return id++;
		}
	})
