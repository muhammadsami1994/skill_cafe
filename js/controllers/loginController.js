/**
 * Created by Kashif on 8/29/2014.
 */
dashboard.controller('loginController',['$scope', 'UserService','$state',function($scope, UserService,$state){

    $scope.user = UserService.get();
    $scope.steps={
        percent:0,
        step1:true,
        step2:false,
        step3:false
    };
    function initialize()
    {
        console.log('Calling iniitalize of login');
        console.log($scope.user);
    }

    initialize();

    $scope.facebookLogin = function() {
        UserService.login('facebook');
    };

    $scope.linkedinLogin = function() {
        UserService.login('linkedin2');

    };

    $scope.googleLogin = function() {
        UserService.login('google');
    };

    $scope.logout = function() {
        UserService.logout();
    };

    $scope.getTitle = function() {
        if (!$scope.user.isLoggedIn){
            return "Log In";
        }

        return "Log out";
    };
    $scope.$watch('user.isLoggedIn',function(){

        if ($scope.user.isLoggedIn) {
            console.log("User Login Successfully: User:", $scope.user);
            //if ($scope.user.created)  << TODO: BUGBUG Not working.
                $state.go('user-panel.getting-started');
        }
    });


}]);