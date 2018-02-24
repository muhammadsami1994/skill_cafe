/**
 * Created by Kashif on 8/28/2014.
 */

dashboard.controller('recruiterHomeController',['$scope','$rootScope','ApiService', 'UserService', 'debounce',function($scope,$rootScope,ApiService, UserService, debounce){

    /* Gets the user object from the location storage */
    $scope.user = UserService.get();

    $scope.data = {
        loading: false,
        jobs_search_results: [],
        homePageFilter: ApiService.getHomeFilters(),
        isCollapsedAddFields: true,
        filterSkillOutput: {
                                simple:[],
                                addSkill:[]
                           },
        isCollapsedSkill: true
    };

    var tabClasses;

    function initTabs() {
        tabClasses = ["","","",""];
    }

    function initialize()
    {
        $rootScope.$emit('LOAD-SPINNER');

        console.log('Initialize the home page');
        //Initialize
        initTabs();
        $scope.setActiveTab(1);
        $rootScope.$emit('UNLOAD-SPINNER');
    }

    $scope.addFilters = function(data){
        console.log(data);
        if(!data.active){
            data.active = true;
        }
    };


    $scope.refreshJobs = function() {

         /* params = {
        'location':{'zip_code':32605, 'country_code': 'US'},
        'skills':['java', 'SQL'],
        'type':'fulltime',
        'salary': '100000',
        'title': 'Software Engineer',
        'company': 'Amazon',
        'age': '30',
        'limit':10
    }*/

        for (var i =0; i < $scope.data.homePageFilter.list.length; i++) {
            var each = $scope.data.homePageFilter.list[i];
        }

        var filter = {
            title: $scope.user.lastquery.title,
            skills: $scope.user.lastquery.skills,
            locations: $scope.user.lastquery.locations
        };


        /*promise = CafeApi.refreshJobs(jobs, user, filter) // then() called when son gets back
            .then(function (data) {
                // promise fulfilled
                console.log('Got some jobs', data.data);

                jobs.results = data.data

            }, function (error) {
                // promise rejected, could log the error with: console.log('error', error);
                console.log('Oopsie error returned from server')
            });

        return promise;*/

    };

    $scope.logout = function() {
        console.log('logout');

        $scope.user.logout();

    };



    ///////////////////////////////
    // Tabs
    $scope.getTabClass = function (tabNum) {
        return tabClasses[tabNum];
    };
    $scope.getTabPaneClass = function (tabNum) {
        return "tab-pane " + tabClasses[tabNum];
    };
    $scope.setActiveTab = function (tabNum) {
        initTabs();
        tabClasses[tabNum] = "active";
    };

    // Tabs End
    /////////////////////////////

    initialize();

}]);

