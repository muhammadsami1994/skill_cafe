//dashboard.controller('analyticsController',['$scope','UserService','$rootScope','$state','ApiService',function($scope,UserService,$rootScope,$state,ApiService){
//
//    $scope.user = UserService.get();
////    $scope.homePageFilter = ApiService.getHomeFilters();
////    $scope.jobs = UserService.getJobs();
//    var filters = {
//        'filter-title': [{title: ''}],
//        'filter-location': [{nearbydist: '100mi'}],
//        'filter-skills': [{skills: ['Java']}],
//        'filter-age': [{age: 30}],
//        'pagination': {start: 0, max: 3}
//     };
//
//    $scope.data = {
//        homePageFilter: ApiService.getHomeFilters(),
//        jobs: UserService.getJobs()
//
//    };
//
//    function initialize()
//    {
//        console.log('in getJobsNearby controller');
////        $scope.data.user_skills = '';
////        $scope.data.skills_filter = '';
//        if($scope.user.isLoggedIn){
//            if( $scope.user.skills && $scope.user.skills.length > 0){
//                $scope.data.jobs.nearby.user_skills = $scope.user.skills[0];
//                filters['filter-skills'] = [{'skills': [$scope.user.skills[0].name]}];
//            }else{
////                $scope.data.jobs.nearby.skills_filter = 'Java';
////                filters['filter-skills'] = [{'skills': ['java']}];
//            };
//        };
//
////        if ($scope.data.jobs.nearby.data.length === 0) {
////            console.log('Calling getJobsNearby ');
////            UserService.refreshJobsNearBy(filters);
////        };
//    };
//
//    $scope.refreshJobsNearBy = function(type){
//        var skills = '';
//        if (type == 'userskill'){
//            skills = $scope.data.jobs.nearby.user_skills;
//        }
//        else if (type == 'txtskill'){
//            skills = $scope.data.jobs.nearby.skills_filter;
//        }
//        console.log('skills filter in nearby ===', skills)
//        var filters = {
//            'filter-title': [{title: ''}],
//            'filter-location': [{nearbydist: '100mi'}],
//            'filter-skills': [{skills: [skills]}],
//            'filter-age': [{age: 30}],
//            'pagination': {start: 0, max: 3}
//        };
//
//        if (skills !== ''){
//            UserService.refreshJobsNearBy(filters);
//        }
//    };
//
//    $scope.searchSkill = function(skill){
//        var skillMatch = false;
//        $scope.data.homePageFilter.skill.list.forEach(function(skillList){
//            if(skill==skillList.name){
//                skillMatch = true;
//                skillList.active = true;
//            }
//        });
//        if(!skillMatch && skill!=""){
//            $scope.data.homePageFilter.skill.list.push({
//                name:skill,
//                active:true
//            });
//        }
//        //$state.go('user-panel.search');
//    };
//    initialize();
//}]);
//
//
//
//
//
