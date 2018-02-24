dashboard.controller('analyticsWorldController',['$scope','UserService','ApiService','$rootScope','$state','$timeout',function($scope,UserService,ApiService,$rootScope,$state,$timeout){
    $scope.user = UserService.get();
    $scope.enableMap = true;

//    $scope.data.homePageFilter = ApiService.getHomeFilters();
//    $scope.jobs = UserService.getJobs();
//    var filters = {
//        'filter-title': [{title: ''}],
//        'filter-location': [{location: {}, nearbydist: ''}],
//        'filter-skills': [{skills: []}],
//        'filter-age': [{age: 30}],
//        'pagination': {start: 0, max: 3}
//    };
    $scope.data = {
        homePageFilter: ApiService.getHomeFilters(),
        jobs: UserService.getJobs()

    };
    
//    $setTimeout(function() {
//        $scope.enableMap = true;
//    }, 10);


  


//    function initialize()
//    {
//        console.log('in getJobsWorld controller');
//
//        if($scope.user.isLoggedIn){
//            if($scope.user.skills && $scope.user.skills.length > 0){
//                $scope.data.jobs.world.user_skills = $scope.user.skills[0];
//                filters['filter-skills'] = [{'skills': [$scope.user.skills[0].name]}];
//            }
//            else{
//                $scope.data.jobs.world.skills_filter = 'Java';
//                filters['filter-skills'] = [{'skills': ['java']}];
//            };
//        }
//
//        if ($scope.data.jobs.world.data.length === 0) {
//            console.log('Calling initialize getJobsWorld');
//            UserService.refreshJobsWorld(filters);
//        };
//    }

    $scope.refreshJobsWorld = function(state){
        var skills = $scope.data.jobs.world.skills_filter;
//        if (type == 'userskill'){
//            skills = $scope.data.jobs.world.user_skills;
//            $scope.data.jobs.world.skills_filter = "";
//        }
//        else if (type == 'txtskill'){
//            skills = $scope.data.jobs.world.skills_filter;
//        }
        console.log('Calling refresh getJobsWorld', skills);
        if (skills !== ''){
            var filters = {
                'filter-title': [{title: ''}],
                'filter-location': [{location: {'state': state}, nearbydist: ''}],
                'filter-skills': [{skills: [{name: skills, active: true}]}],
                'filter-age': [{age: 30}],
                'pagination': {start: 0, max: 3}
            };
            UserService.refreshJobsWorld(filters);
        }
    };
    $scope.refreshJobsWorld('');

    $scope.getTopCities = function(geography){
        $scope.refreshJobsWorld(geography.properties.name);
    }

    $scope.searchSkill = function(skill){
        var skillMatch = false;
        $scope.data.homePageFilter.skill.list.forEach(function(skillList){
            if(skill==skillList.name){
                skillMatch = true;
                skillList.active = true;
            }else{
                skillList.active = false;
            }
        });
        if(!skillMatch && skill!=""){
            $scope.data.homePageFilter.skill.list.push({
                name:skill,
                active:true
            });
        }
    };

    $scope.searchByCity = function(city){
        console.log('searchByCity ..city', city)

        if($scope.data.jobs.world.skills_filter!=""){
            $scope.searchSkill($scope.data.jobs.world.skills_filter);
        }else{
            $scope.searchSkill($scope.data.jobs.world.user_skills.name);
        }

        for (var i =0; i < $scope.data.homePageFilter.list.length; i++) {
            var each = $scope.data.homePageFilter.list[i];
            if (each.type == 'filter-title') {
                $scope.data.homePageFilter.list[i].inputValue = "";
            }else if(each.type == 'filter-location'){
                $scope.data.homePageFilter.list[i].location.name = city.city;
                $scope.data.homePageFilter.list[i].location.state_name = '';
                $scope.data.homePageFilter.list[i].location.state = {};
                $scope.data.homePageFilter.list[i].location.zip_code = '';
                $scope.data.homePageFilter.list[i].location.lat = city.lat;
                $scope.data.homePageFilter.list[i].location.lon = city.lon;
                $scope.data.homePageFilter.list[i].inputValue = city.city;
            }
        }
        $state.go('user-panel.search');
    };



//    initialize();
}]);
