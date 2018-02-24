/**
 * Created by kashif on 8/14/14.
 */
dashboard.controller('topTalentController',['$scope','ApiService',function($scope,ApiService){
    $scope.talentedMembers = ApiService.getTalent();
    $scope.activityList = ApiService.getActivity();
    $scope.aside = {
        "title": "Title",
        "content": "Hello Aside<br />This is a multiline message!"
    };

    $scope.isActive = function (viewLocation) {
         var active = (viewLocation === $location.path());
         return active;
    };
}]);