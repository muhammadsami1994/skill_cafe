/**
 * Created by Kashif on 8/29/2014.
 */
dashboard.controller('logoutController',['$scope', 'UserService','$state',function($scope, UserService,$state){

    $scope.user = UserService.get();
    $scope.steps={
        percent:0,
        step1:true,
        step2:false,
        step3:false
    };
    function initialize()
    {
        console.log('Calling iniitalize of LogoutController');
        console.log($scope.user);
    }

    initialize();

    $scope.logout = function() {
        UserService.logout();
        $state.go('user.login');
    };

    $scope.getTitle = function() {
        if (!$scope.user.isLoggedIn){
            return "Log In";
        }

        return "Log out";
    };
}]);