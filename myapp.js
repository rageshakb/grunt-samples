var app = angular.module("mainApp",[]);

app.directive("addBtnDataList", function() {

	var template = "<button ng-click='addItem()'>Add Item</button>" +
					"<ul><li ng-repeat='user in users track by $index'>{{user}}</li></ul>";

	return {
		restrict : "EA",
		scope : {
			datasource : "=",
			add : "&"
		},
		template : template,
		controller : function($scope) {
			$scope.users = angular.copy($scope.datasource);

			$scope.addItem =  function() {
				$scope.add();
				$scope.users.push("Ragesh");
			}
		}
	}

});

app.controller("mainCtrl", function($scope){

	$scope.users = ["Jose","Liz","John"];
	$scope.count = $scope.users.length;
	$scope.updateCount = function(){
		($scope.count)++;
	}

});