angular.module("user.factories",["firebase"])
	.value("fbURL", "https://blistering-inferno-6972.firebaseio.com/")
	.value("user_table", "user")
	.factory("Users", function($firebase, fbURL, user_table) {
		return {
			getAll : function() {
				return $firebase(new Firebase(fbURL + user_table));
			},
			getById : function(id) {
				return $firebase(new Firebase(fbURL + user_table + "/" + id));
			}
		}
		
	})
