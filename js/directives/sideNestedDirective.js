/**
 * Created by Kashif Ahmed on 9/7/2014.
 */
dashboard.directive('sideNestedNav',function(){
    return{
        restrict: "E",
        scope:{
            linksArray:'=linksArray'
        },
        templateUrl: './template/sideMenu/left-side-panel.html',
        link:function($scope,element,attrs){
            $scope.parentState = [];
            $scope.stateMaintainIndex = 0;
            $scope.goForChildState = function(index){
                if($scope.linksArray[index].children){
                    $scope.parentState[$scope.stateMaintainIndex++] = $scope.linksArray;
                    $scope.linksArray = $scope.linksArray[index].children;
                }
            };
            $scope.goParentState = function(){
                $scope.linksArray = $scope.parentState.pop();
                $scope.stateMaintainIndex--;
            };
        }
    };
});