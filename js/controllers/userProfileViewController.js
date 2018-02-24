/**
 * Created by Kashif Ahmed on 9/30/2014.
 */
dashboard.controller('userProfileView',['$scope','$interval','UserService',function($scope,$interval,UserService){
    $scope.user = UserService.get();
    $scope.styling = {
        toggle:true,
        color:"#fdb020"
    };
    $scope.skinColors = [
        {color:"#fdb020"},
        {color:"#1abc9c"},
        {color:"#8e44ad"},
        {color:"#2c3e50"},
        {color:"#3498db"},
        {color:"#bdc3c7"},
        {color:"#e1e100"}

    ];
    $scope.openSkinSelector = function(){
        $scope.styling.toggle = !$scope.styling.toggle;
    };
    $scope.changeActiveColor = function(index){
        $scope.styling.color = $scope.skinColors[index].color;
        var temp = $scope.user.skills;
        $scope.user.skills = [];
        $interval(function(){
            $scope.user.skills = temp;
        },5);
        $('.employment-date').hover(function(){
            $(this).css('background-color',$scope.styling.color);
        },function(){
            $(this).css("background-color",'#b1b1b1');
        });
    };
    $scope.save = function(field) {
        console.log('SAVE ME', field);
        UserService.save(field);
    };

}]);