/**
 * Created by Kashif Ahmed on 9/17/2014.
 */
dashboard.controller('jobSeekerSettingsController',['$scope','UserService',function($scope,UserService){
    /*New Setting*/
    $scope.data = {
    };

    // default values
    $scope.preferences = {
        company: {
            options:[
                { text: "Any", value: "any" },
                { text: "Startup", value: "startup" },
                { text: "Mid-Size (50-100 employees)", value: "midsize" },
                { text: "Large Corporation (>100 employees)", value: "bigsize" }],
            selected:'any'
        },

        salary: {
            negotiable: true,
            min:0,
            max:200000,
            currency:'$'
        },

        privacy: {
            'allow_chat': { text: "Allow chat with potential employers", 'checked': true },
            'allow_emails': { text: "Email address", 'checked': true },
            'phone_share': { text: "Phone number", 'checked': true },
            'share_profile': { text: "Profile (Except past employers)", 'checked': true },
            'allow_share_results': { text: "Test results", 'checked': true }
        },

        job_types: [
            {'text': 'Any', 'value':'any'},
            {'text': 'Full-time Job', 'value': 'fulltime' },
            {'text': 'Part-time Job', 'value': 'parttime'},
            {'text': 'Contract Job', value:'contract'},
            {'text': 'Internship', value:'intern'}
        ],

        job_types_value: 'any'
    };
    $scope.user = UserService.get();
    $scope.gPlace;
    var initialize = function() {
        if (!$scope.user.activestatus) {
            $scope.user.activestatus = true;
        }
        if (!$scope.user.preferences)
            $scope.user.preferences = {};

        if (!$scope.user.preferences.company)
            $scope.user.preferences.company = {};

        if (!$scope.user.preferences.company.selected)
            $scope.user.preferences.company.selected = 'any';

        if (!$scope.user.preferences.salary)
            $scope.user.preferences.salary = {};

        if (!$scope.user.preferences.salary.negotiable)
            $scope.user.preferences.salary.negotiable = true;

        if (!$scope.user.preferences.salary.min)
            $scope.user.preferences.salary.min = 50000;

        if (!$scope.user.preferences.salary.max)
            $scope.user.preferences.salary.max = 5000000;

        if (!$scope.user.preferences.privacy) {
            $scope.user.preferences.privacy = $scope.preferences.privacy;
        }
        if (!$scope.user.preferences.job_types_value)
            $scope.user.preferences.job_types_value = $scope.preferences.job_types_value;

        UserService.initLastQuery();
    };

    initialize();
    console.log($scope.user);
    $scope.save = function (field) {
        UserService.save(field);
        console.log($scope.user);
    };

    $scope.$on('$destroy', function() {
        console.log('Destroyed settings view...');
        UserService.saveState();
    });
    /*New Settings*/


}]);