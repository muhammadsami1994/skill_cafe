dashboard.controller('analyticsHotSkillsController',['$scope','UserService', 'ApiService', '$rootScope','$timeout','$state','$localStorage', function($scope,UserService,ApiService,$rootScope,$timeout,$state,$localStorage){
    $scope.enableGoButton = true;
    $scope.navSkillDemandCollapse = true;
    $scope.user = UserService.get();
//    $scope.jobs = UserService.getJobs();

    $scope.data = {
        jobs: UserService.getJobs(),
        homePageFilter: ApiService.getHomeFilters()

    };

//    function initialize()
//    {
//        console.log('in getHotSkills controller', $scope.data.jobs);
//        var location_obj = {};
//        var title = '';
//        if ($scope.user.location && $scope.user.location.name !== '') {
//            location_obj = $scope.user.location;
//            var filter_location = _.findWhere($scope.data.homePageFilter.list, {'type': 'filter-location'});
//            console.log('ANALYICS LOCATION > ', filter_location);
//            if (filter_location) {
//                filter_location.inputValue = $scope.user.location.name;
//            }
//        }
//        var filter_title = _.findWhere($scope.data.homePageFilter.list, {'type': 'filter-title'});
//        if ($scope.user.currentjob && $scope.user.currentjob !== ''){
//            filter_title.inputValue = $scope.user.currentjob;
//            title = $scope.user.currentjob;
//        }else{
//            filter_title.inputValue = title;
//        };
//
//        var filters = {
//            'filter-title': [{title: title}],
//            'filter-location': [{location: location_obj, nearbydist: '100mi'}],
//            'filter-skills': [],
//            'filter-age': [],
//            'pagination': {start: 0, max: 5}
//        };
//
//        if ($scope.data.jobs.hotskills.data.jobs.length === 0) {
//            console.log('Calling getHotSkills');
//            UserService.getHotSkills(filters);
//        }
//
//    }
    
    $scope.refreshJobforSkill = function(skill){
        $scope.navSkillDemandCollapse = true;  
        $scope.searchjob({name:skill});
    }
    $scope.refreshHotSkills =function(){
        $scope.enableGoButton = false;
        var location_obj = {};
        var title_name = '';
        var nearbydistance = '100mi';

        console.log('in refreshHotSkills');

        for (var i =0; i < $scope.data.homePageFilter.list.length; i++) {
            var each = $scope.data.homePageFilter.list[i];
            if (each.type == 'filter-location') {
                // {name: 'location_name', lat: 37.7848, lon: -122.7278, zip_code: ''}
                location_obj = each.location;
                $localStorage.set('filter-location',JSON.stringify(location_obj));

            } else if (each.type == 'filter-title') {
                title_name = each.inputValue;
                $localStorage.set('title_name',title_name);
            }
        }

        if (title_name !== ''){
            var filters = {
                'filter-title': [{title: title_name}],
                'filter-location': [{location: location_obj, nearbydist: nearbydistance}],
                'filter-skills': [],
                'filter-age': [],
                'pagination': {start: 0, max: 5}
            };
            $scope.data.homePageFilter.skill.list = [];
            UserService.getHotSkills(filters);
        }
    };

    $scope.searchjob = function(skill){
        $scope.data.homePageFilter.skill.list = [{name: skill.name, active: true}];
        for (i=0; i< $scope.data.jobs.hotskills.data.skills.length;i++){
            var sk = $scope.data.jobs.hotskills.data.skills[i]
            if(sk.name == skill){
                $scope.data.jobs.hotskills.data.skills[i] = {name: skill.name, active: true};
            }else{
                $scope.data.homePageFilter.skill.list.push({name: sk.name, active: false});
            }
        }
        console.log('skill passed from analytics controller', skill.name)
            $state.go('user-panel.search');
    };

    $scope.collapseNavDemand_Skills = function(){
        $scope.navSkillDemandCollapse = !$scope.navSkillDemandCollapse;
    }

//    initialize();


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
}]);
