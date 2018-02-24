dashboard.controller('jobSeekerSearchController',['$scope','ApiService','UserService','$timeout','$localStorage',function($scope,ApiService,UserService,$timeout,$localStorage){
    $scope.enableGoButton = false;
    $scope.enableSaveButton = false;
    $scope.navSkillDemandCollapse = true;
    $scope.data = {
        jobs: UserService.getJobs(),
        selected_city:0,
        homePageFilter: ApiService.getHomeFilters(),
        filterSkillOutput:{
            sample:[]
        },
        isCollapsedSkill:true,
        bigTotalItems: 100,
        bigCurrentPage:1,
        maxSize:10
    };

//    $scope.data.homePageFilter.list[0].location = $localStorage.get('filter-location').length>0?JSON.parse($localStorage.get('filter-location')):{};
//    $scope.data.homePageFilter.list[1].inputValue = $localStorage.get('filter-title');
    

    
    $scope.topJobsSetting={
        aroundMe : {
            isOpen:false,
            list:[
                {range:30,active:false},
                {range:75,active:true},
                {range:100,active:false},
                {range:125,active:false}
            ]
        },
        bestCity : {
          isOpen:false,
          list:[
            {value:"IN",active:true},
            {value:"US",active:false}
          ]
        },
        setSetting : function(index,collection){
            collection.forEach(function(data){
                data.active  = false;
            });
            collection[index].active = true;
            console.log(collection);
        }
    };

    $scope.getRecruiterSideLinks=ApiService.getRecruiterSideLinks();
    $scope.analyticsList=ApiService.getUserInfo();
    $scope.candidateList=ApiService.getSearchData();


    $scope.setPage = function (pageNo) {
        $scope.data.currentPage = pageNo;
    };

    $scope.pageChanged = function() {

    };
    $scope.saveQuery = function(){
        $scope.enableSaveButton = false;
    };
    $scope.getCityData = function() {
        var cities = $scope.getCities();

        if ($scope.data.selected_city < cities.length) {
            var jobs_hits = cities[$scope.data.selected_city].jobs.hits.hits;
            for (var v = 0; v<jobs_hits.length; ++v) {
                if (!jobs_hits[v]._source.skills_array) {
                    jobs_hits[v]._source.skills_array = jobs_hits[v]._source.skills.split(',')
                }
            }
            return jobs_hits;
        }

        return [];
    };
    $scope.getCities = function() {
        if ( $scope.data.jobs.match.results.json && $scope.data.jobs.match.results.json.aggregations &&
            $scope.data.jobs.match.results.json.aggregations.jobs_count &&
            $scope.data.jobs.match.results.json.aggregations.jobs_count.city_count &&
            $scope.data.jobs.match.results.json.aggregations.jobs_count.city_count.buckets) {
            return $scope.data.jobs.match.results.json.aggregations.jobs_count.city_count.buckets;
        }
        else {
            return false;
        }
    };
    $scope.refreshJobsNearBy = function(){
        var location_obj = {};
        var title_name = '';
        var nearbydistance = '35mi';
        $scope.enableGoButton = false;

        for (var i =0; i < $scope.data.homePageFilter.list.length; i++) {
            var each = $scope.data.homePageFilter.list[i];
            if (each.type == 'filter-location') {
                // {name: 'location_name', lat: 37.7848, lon: -122.7278, zip_code: ''}

                location_obj = each.location;
//                console.log("Location Save in LocalStorage");
                $localStorage.set('filter-location',JSON.stringify(location_obj));
            } else if (each.type == 'filter-title') {
                title_name = each.inputValue;
//                console.log("Title Save in LocalStorage");
                $localStorage.set('filter-title',title_name);
            }
        }

        $localStorage.set('filter_skill',JSON.stringify($scope.data.homePageFilter.skill));

        var skills = [];
        for (i =0; i < $scope.data.homePageFilter.skill.list.length; i++) {
            var skill = $scope.data.homePageFilter.skill.list[i];
            if (skill.active) {
                skills.push(skill);
            }
        }

        var filters = {
            'filter-title': [{title:title_name}],
            'filter-location': [{location: location_obj, nearbydist: nearbydistance}],
            'filter-skills': [{skills: skills}],
            'filter-age': [{age: 30}],
            'pagination': {start: 1, max: 25}
        };

        UserService.refreshJobsNearBy(filters);

    };

    $scope.assignSkillstoFilter = function(){
        for (i=0; i< $scope.data.jobs.hotskills.data.skills.length;i++){
            var sk = $scope.data.jobs.hotskills.data.skills[i];
            $scope.data.homePageFilter.skill.list.push({name: sk.name, active: false})
        }
    };
    $scope.refreshJobsNearBy();
    $scope.refreshJobforSkill = function(skill){
        console.log('in refresh job for skill', skill);
        $scope.navSkillDemandCollapse = true;
        $scope.data.homePageFilter.skill.list = [{name: skill, active: true}];
        for (i=0; i< $scope.data.jobs.hotskills.data.skills.length;i++){
            var sk = $scope.data.jobs.hotskills.data.skills[i]
            if(sk.name != skill){
                $scope.data.homePageFilter.skill.list.push({name: sk.name, active: false})
            }
        }
        $scope.refreshJobsNearBy();
    };
    $scope.refreshHotSkills =function(){
//        $scope.enableGoButton = false;
        var location_obj = {};
        var title_name = '';
        var nearbydistance = '100mi';

        console.log('in refreshHotSkills');

         for (var i =0; i < $scope.data.homePageFilter.list.length; i++) {
            var each = $scope.data.homePageFilter.list[i];
            if (each.type == 'filter-location') {
                // {name: 'location_name', lat: 37.7848, lon: -122.7278, zip_code: ''}
                location_obj = each.location
                console.log('Location Save in LocalStorage');
                $localStorage.set('filter-location',JSON.stringify(location_obj));

            } else if (each.type == 'filter-title') {
                title_name = each.inputValue;
                console.log('title save in LocalStorage');
                $localStorage.set('filter-title',title_name);
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
            UserService.getHotSkills(filters);
            $scope.data.homePageFilter.skill.list = [];
            $scope.refreshJobsNearBy();
//            $scope.assignSkillstoFilter();
        }

    };
    
    
    $scope.getImage = function(job) {
        return 'img/company.png';
        //return job._source.favicon;
    };
    $scope.thumb=true;

    $scope.filter = {
        isCollapsedAddFields:true,
        dashBoardFilter:ApiService.getDashBoardFilter(),
        filterSkillOutput:{
            simple:[],
            hasSkill:[]
        },
        isCollapsedSkill:true,
        isCollapsedHasSkill:true
    };
    $scope.getJobDay = function(dt) {
        var d = new Date(dt);
        return d.getDate();
    };
    $scope.getJobMonth = function(dt) {
        var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var d = new Date(dt );
        return month_names_short[d.getMonth()];
    };
    /*Here watches for go Button*/
    $timeout(function(){
        $scope.$watch('data.homePageFilter.skill.list',function(newValue,oldValue){
            if(oldValue!=newValue){
                $scope.enableGoButton = true;
            }
        },true);
        $scope.data.homePageFilter.list.forEach(function(value,index){
            $scope.$watch('data.homePageFilter.list['+index+'].inputValue',function(newValue,oldValue){
                console.log(newValue);
                console.log(oldValue);
                if(newValue!==oldValue){
                    $scope.enableGoButton = true;
                    console.log(index,"work");
                    $scope.refreshHotSkills();
                }
            },true)
        });
    },2000);


    $scope.collapseNavDemand_Skills = function(){
        $scope.navSkillDemandCollapse = !$scope.navSkillDemandCollapse;
    }

    $scope.$watch('data.bigCurrentPage',function(oldValue,newValue){
        var startFrom = newValue*$scope.data.maxSize;
        var endAt = startFrom+$scope.data.maxSize;
        if($scope.data.jobs.nearby.data.json && $scope.data.jobs.nearby.data.json.results){
            $scope.filteredJobs = $scope.data.jobs.nearby.data.json.results.slice(startFrom, endAt);
        }
    })

    $scope.$watch('data.jobs.nearby.data',function(oldValue,newValue){
        if($scope.data.jobs.nearby.data.json){
//            console.log("+++"+$scope.data.jobs.nearby.data.json.results+"+++")
            if($scope.data.jobs.nearby.data.json.results.length>$scope.data.maxSize){
                $scope.filteredJobs = $scope.data.jobs.nearby.data.json.results.slice(0, $scope.data.maxSize);    
            }else{
                $scope.filteredJobs=$scope.data.jobs.nearby.data.json.results;
            }
        }
    })
}]);