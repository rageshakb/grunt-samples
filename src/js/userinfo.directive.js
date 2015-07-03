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