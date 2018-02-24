dashboard.controller('jobindexController',['$scope','UserService', 'ApiService', '$rootScope','$timeout','$state', function($scope,UserService,ApiService,$rootScope,$timeout,$state){
    $scope.user = UserService.get();

    $scope.data =
    {
        homePageFilter: ApiService.getHomeFilters(),
        jobindex: UserService.getJobindex()
    };

//    $scope.gotos = function()
//    {
//        console.log('in refreshCareerSteps');
////        var title_name = $scope.data.careerFilter.inputValue;
//        var title_name = '';
//        for (var i =0; i < $scope.data.homePageFilter.list.length; i++) {
//            var each = $scope.data.homePageFilter.list[i];
//            if (each.type == 'filter-title') {
//                title_name = each.inputValue;
//            }
//        }
//        if (title_name !== ''){
//            var filters = {
//                'filter-title': [{title: title_name}],
//                'pagination': {start: 0, max: 5}
//            };
//
//            UserService.getCareerSteps(filters);
//            $scope.data.homePageFilter.skill.list = [];
//            UserService.getHotSkills(filters);
//        }
//    };

    $scope.searchjob = function(title){
        console.log('injobindex', $scope.data)
        $scope.data.homePageFilter.title = [{name: title}];
        for (var i =0; i < $scope.data.homePageFilter.list.length; i++) {
            var each = $scope.data.homePageFilter.list[i];
            if (each.type == 'filter-title') {
                $scope.data.homePageFilter.list[i].inputValue = title;
            }
        }
        console.log('job title passed from jobindex controller', title)
        $state.go('user-panel.search');
    };

}]);
