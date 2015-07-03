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

/*global angular */
/*
 jQuery UI Datepicker plugin wrapper

 @note If ≤ IE8 make sure you have a polyfill for Date.toISOString()
 @param [ui-date] {object} Options to pass to $.fn.datepicker() merged onto uiDateConfig
 */

angular.module('ui.date', [])

.constant('uiDateConfig', {})

.directive('uiDate', ['uiDateConfig', 'uiDateConverter', function (uiDateConfig, uiDateConverter) {
  'use strict';
  var options;
  options = {};
  angular.extend(options, uiDateConfig);
  return {
    require:'?ngModel',
    link:function (scope, element, attrs, controller) {
      var getOptions = function () {
        return angular.extend({}, uiDateConfig, scope.$eval(attrs.uiDate));
      };
      var initDateWidget = function () {
        var showing = false;
        var opts = getOptions();

        // If we have a controller (i.e. ngModelController) then wire it up
        if (controller) {

          // Set the view value in a $apply block when users selects
          // (calling directive user's function too if provided)
          var _onSelect = opts.onSelect || angular.noop;
          opts.onSelect = function (value, picker) {
            scope.$apply(function() {
              showing = true;
              controller.$setViewValue(element.datepicker('getDate'));
              _onSelect(value, picker);
              element.blur();
            });
          };

          var _beforeShow = opts.beforeShow || angular.noop;
          opts.beforeShow = function(input, picker) {
            showing = true;
            _beforeShow(input, picker);
          };

          var _onClose = opts.onClose || angular.noop;
          opts.onClose = function(value, picker) {
            showing = false;
            _onClose(value, picker);
          };
          element.off('blur.datepicker').on('blur.datepicker', function() {
            if ( !showing ) {
              scope.$apply(function() {
                element.datepicker('setDate', element.datepicker('getDate'));
                controller.$setViewValue(element.datepicker('getDate'));
              });
            }
          });

          // Update the date picker when the model changes
          controller.$render = function () {
            var date = controller.$modelValue;
            if ( angular.isDefined(date) && date !== null && !angular.isDate(date) ) {
                if ( angular.isString(controller.$modelValue) ) {
                    date = uiDateConverter.stringToDate(attrs.uiDateFormat, controller.$modelValue);
                } else {
                    throw new Error('ng-Model value must be a Date, or a String object with a date formatter - currently it is a ' + typeof date + ' - use ui-date-format to convert it from a string');
                }
            }
            element.datepicker('setDate', date);
          };
        }
        // Check if the element already has a datepicker.
        if (element.data('datepicker')) {
            // Updates the datepicker options
            element.datepicker('option', opts);
            element.datepicker('refresh');
        } else {
            // Creates the new datepicker widget
            element.datepicker(opts);

            //Cleanup on destroy, prevent memory leaking
            element.on('$destroy', function () {
               element.datepicker('destroy');
            });
        }

        if ( controller ) {
          // Force a render to override whatever is in the input text box
          controller.$render();
        }
      };
      // Watch for changes to the directives options
      scope.$watch(getOptions, initDateWidget, true);
    }
  };
}
])
.factory('uiDateConverter', ['uiDateFormatConfig', function(uiDateFormatConfig){

    function dateToString(dateFormat, value){
        dateFormat = dateFormat || uiDateFormatConfig;
        if (value) {
            if (dateFormat) {
                return jQuery.datepicker.formatDate(dateFormat, value);
            }

            if (value.toISOString) {
                return value.toISOString();
            }
        }
        return null;
    }

    function stringToDate(dateFormat, value) {
        dateFormat = dateFormat || uiDateFormatConfig;
        if ( angular.isString(value) ) {
            if (dateFormat) {
                return jQuery.datepicker.parseDate(dateFormat, value);
            }

            var isoDate = new Date(value);
            return isNaN(isoDate.getTime()) ? null : isoDate;
        }
        return null;
    }

    return {
        stringToDate: stringToDate,
        dateToString: dateToString
    };

}])
.constant('uiDateFormatConfig', '')
.directive('uiDateFormat', ['uiDateConverter', function(uiDateConverter) {
  var directive = {
    require:'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
        var dateFormat = attrs.uiDateFormat;

        // Use the datepicker with the attribute value as the dateFormat string to convert to and from a string
        modelCtrl.$formatters.unshift(function(value) {
            return uiDateConverter.stringToDate(dateFormat, value);
        });

        modelCtrl.$parsers.push(function(value){
            return uiDateConverter.dateToString(dateFormat, value);
        });

    }
  };

  return directive;
}]);

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
angular.module("directives",[])
	.directive('userinfo', function () {
		/*return {
			restrict: 'A',
			link: function (scope, iElement, iAttrs) {
				
			}
		};*/
		var directive = {};

		directive.restrict = 'E';
		directive.templateUrl = "templates/userinfo.tmpl.html";
		directive.scope = {
			user : "="
		}
		directive.transclude = true;
		/*directive.compile = function(element, attrs) {
			var link =  function($scope, element, attrs) {

			}
			return link;
		}*/

		return directive;
	})