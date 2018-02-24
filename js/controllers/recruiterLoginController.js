/**
 * Created by Kashif on 9/4/2014.
 */
dashboard.controller("recruiterLoginController",['$scope',function($scope){
    $scope.tooltip = {
         signUp:{
             "title": "Create new account",
             "checked": false
         },
        forgetPass:{
            "title": "Reset Your Password",
            "checked": false
        }
    };
}])