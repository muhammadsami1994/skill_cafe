dashboard.controller('analyticsCareerStepsController',['$scope','UserService', 'ApiService', '$rootScope','$timeout',function($scope,UserService,ApiService,$rootScope,$timeout){
    $scope.enableGoButton = true;
    $scope.user = UserService.get();
//    $scope.jobs = UserService.getJobs();

    $scope.data = {
        jobs: UserService.getJobs(),
        homePageFilter: ApiService.getHomeFilters(),
        //careerFilter: ApiService.getAnalyticsCareerFilter()
//        careerFilter: ApiService.getHomeFilters()
    };
    var title = '';
    var filter_title = _.findWhere($scope.data.homePageFilter.list, {'type': 'filter-title'});

    if ($scope.user.currentjob && $scope.user.currentjob !== ''){
        console.log('current job>>>', $scope.user.currentjob)
        filter_title.inputValue = $scope.user.currentjob;
        title = $scope.user.currentjob;
    }else{
//        filter_title.inputValue = title;
    };

//    var filters = {
//          'filter-title': [{title: title}],
//          'pagination': {start: 0, max: 5}
//    };

//    function initialize()
//    {
//        console.log('in career steps controller', $scope.data.jobs);
//
//        if ($scope.data.jobs.careersteps.data.length == 0) {
//            console.log('Calling getCareerSteps');
//            UserService.getCareerSteps(filters);
//        }
//    }

    $scope.refreshCareerSteps = function()
    {
        console.log('in refreshCareerSteps');
//        var title_name = $scope.data.careerFilter.inputValue;
        var title_name = '';
        for (var i =0; i < $scope.data.homePageFilter.list.length; i++) {
            var each = $scope.data.homePageFilter.list[i];
            if (each.type == 'filter-title') {
                title_name = each.inputValue;
            }
        }
        if (title_name !== ''){
            var filters = {
                'filter-title': [{title: title_name}],
                'pagination': {start: 0, max: 5}
            };

            UserService.getCareerSteps(filters);
            $scope.data.homePageFilter.skill.list = [];
            UserService.getHotSkills(filters);
        }
    };

    /*Here watches for go Button*/
    $timeout(function(){
        $scope.data.homePageFilter.list.forEach(function(value,index){
            $scope.$watch('data.homePageFilter.list['+index+'].inputValue',function(newValue,oldValue){
                console.log(newValue);
                console.log(oldValue);
                if(newValue!==oldValue){
                    $scope.enableGoButton = true;
                    console.log(index,"work")
                }
            });
        })
    },2000)

//    initialize();
}]);
