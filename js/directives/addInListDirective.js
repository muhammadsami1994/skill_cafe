dashboard.directive('addInList',function(){
    return{
        restrict: "E",
        scope:{

            list:"=listArray",
            searchInfo:"=info",
            isCollapsed:"=isCollapsed"

        },
        link:function($scope, element, attrs){
            console.log($scope.searchInfo)
            $scope.didNotSelectSkill = true;
            $scope.checkAndPush = function(variable){
                console.log($scope.searchInfo)
                if(!variable.active){
                    $scope.list.push({
                        name:variable.name,
                        description:variable.description
                    });
                }else{
                    $scope.list.splice([$scope.list.indexOf(variable.name)],1);
                }
                variable.active = !variable.active;
                $scope.didNotSelectSkill = $scope.list.length<1?true:false;
            };
            $scope.closeFilter = function(check){
                console.log($scope.searchInfo)
                console.log(check);
                check.active = !check.active;
            };
            $scope.addNewSkills = function(skillList){
                console.log($scope.searchInfo)
                console.log($scope.newSkill);
                skillList.push({name:$scope.newSkill,active:false});
                $scope.newSkill = "";
            };


        },
        templateUrl: './template/add-in-list.html'
    }
});
