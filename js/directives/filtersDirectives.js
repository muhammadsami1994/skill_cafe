/*filter buttons*/

dashboard.directive('filterSkills', function() {
	return {
		restrict: "E",
		scope: {
			searchInfo: "=info",
			isCollapsed: "=isCollapsed"
		},
		link: function($scope, element, attrs) {
			$scope.didNotSelectSkill = true;
			$scope.isNoActiveList = true;
			$scope.showSkills = false;
			$scope.searchInfo.list = [{
				name: "Javascript",
				active: true
			}, {
				name: "NodeJS",
				active: false
			}];

			$scope.$watch('searchInfo.callback_results', function(newValue, oldValue) {
				var __NoOfActiveSkill = 0;
				newValue.forEach(function(__skill__) {
					if (__skill__.active) {
						__NoOfActiveSkill++;
					}
				});

				$scope.$emit('home-view-position-event', __NoOfActiveSkill);


			}, true);
			/*$scope.checkAndPush = function(variable){
			    if(!variable.active){
			        $scope.list.push(variable.name);
			    }else{
			        $scope.list.splice([$scope.list.indexOf(variable.name)],1);
			    }
			    variable.active = !variable.active;
			    $scope.didNotSelectSkill = $scope.list.length<1?true:false;
			};*/
			$scope.closeFilter = function(check) {
				check.active = !check.active;
			};
			$scope.addNewSkills = function(skillList, newskill) {
				skillList.push({
					name: newskill,
					active: false
				});
			};

			/*Initial State if no skill Checked*/
			/*$scope.$watch($scope.list,function(e){
			    console.log($scope.list)
			},true)*/
		},
		templateUrl: './template/filters/filter-by-skills.html'
	}
});

dashboard.directive('filterLocation', ['$localStorage', function($localStorage) {
	return {
		restrict: "E",
		transclude: true,
		scope: {
			searchInfo: "=info",
			isCollapsed: "=isCollapsed",
			nextIndex: "=nextIndex",
			callGo: "=callGo",
			hideComparision: '=hideComparision'
		},
		templateUrl: './template/filters/filter-by-location.html',
		link: function($scope, element, attrs) {

			$scope.closeFilter = function(check) {
				console.log("CHECK !!!!" + check);
				check.active = !check.active;
			};


			$scope.watchErrorMessage = function(inputValue) {
				if (inputValue.length > 0 && $scope.$root.filterErrorMessage && $scope.$root.filterErrorMessage.length > 0) {
					$scope.$root.filterErrorMessage = "";
				};
			}

			$scope.closeCollapse = function() {
				console.log("++++++" + "Closed isCollapsed" + "++++++")
				console.log("+++++++++++", $scope.searchInfo, "+++++++++++");
				console.log("+++++++++++" + $scope.searchInfo + "+++++++++++");
				$scope.isCollapsed = true;
				if ($scope.nextIndex < $scope.$root.allFilters.list.length - 1) {
					$scope.$root.allFilters.list[$scope.nextIndex + 1].isCollapsed = false;
				} else {
					//$scope.callGo()
				}

			}

		}
	};
}]);

dashboard.directive('filterStatus', function() {
	return {
		restrict: "E",
		scope: {
			status: '=status'
		},
		templateUrl: './template/filters/filter-by-status.html',
		link: function($scope, element, attrs) {
			$scope.closeFilter = function(check) {
				console.log(check);
				check.active = !check.active;
			};
		}
	};
});

dashboard.directive('offClick', ['$document', function($document) {

	function targetInFilter(target, filter) {
		if (!target || !filter) {
			return false;
		}
		var elms = angular.element(filter);
		var elmsLen = elms.length;
		for (var i = 0; i < elmsLen; ++i) {
			if (elms[i].contains(target)) {
				return true;
			}
		}
		return false;
	}

	return {
		restrict: 'A',
		scope: {
			offClick: '&',
			offClickIf: '&'
		},
		link: function(scope, elm, attr) {

			if (attr.offClickIf) {
				scope.$watch(scope.offClickIf, function(newVal, oldVal) {
					if (newVal && !oldVal) {
						$document.on('click', handler);
					} else if (!newVal) {
						$document.off('click', handler);
					}
				});
			} else {
				$document.on('click', handler);
			}

			function handler(event) {
				var target = event.target || event.srcElement;
				if (!(elm[0].contains(target) || targetInFilter(target, attr.offClickFilter))) {
					scope.$apply(scope.offClick());
				}
			}
		}
	};
}]);
dashboard.directive('filterBoolean', function() {
	return {
		restrict: "E",
		scope: {
			status: '=status'
		},
		templateUrl: './template/filters/filter-checkbox.html',
		link: function($scope, element, attrs) {
			$scope.closeFilter = function(check) {
				console.log(check);
				check.active = !check.active;
			};
		}
	};
});