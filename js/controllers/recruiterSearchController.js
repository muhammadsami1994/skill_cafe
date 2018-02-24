dashboard.controller('recruiterSearch',['$scope','ApiService','$compile',function($scope,ApiService,$compile){
    $scope.skill="any";
    $scope.memberLocation = "Any Where";
    $scope.isCollapsedAddFields = true;
    $scope.isCollapsedSkill = true;
    $scope.filterSkillOutput = {
        simple:[],
        hasSkill:[]
    };


    $scope.addFilters = function(data){
        console.log(data);
        if(!data.active){
            data.active = true;
        }
    };
    $scope.dashBoardFilter = ApiService.getDashBoardFilter();
    $scope.getRecruiterSideLinks = ApiService.getRecruiterSideLinks();
    console.log($scope.getRecruiterSideLinks);
    /*User Dummy Data*/
    $scope.members = ApiService.getUser();
        $scope.projects = ApiService.getProjects();
    $scope.enableEdit = function() {
        $scope.edit = true;
    };
    $scope.disableEdit = function() {
        $scope.edit = false;
    };

    $scope.aside = {
        "title": "Title",
        "content": "Hello Aside<br />This is a multiline message!"
    };
}]);