/**
 * Created by kashif on 11/10/14.
 */
dashboard.controller('jobPostController',["$scope","UserService","$state",function($scope,UserService,$state){

    /*
        Contain default Object of postJob-Form
    */
    $scope.compaignObject = {
        aboutCompaign:{
            title:"",
            message:"",
            messageLink:"",
            photo:{},
            category:{
                selected:{},
                list:[
                    {name:"Art",select:true},
                    {name:"Charity",select:false},
                    {name:"Games",select:false},
                    {name:"Health",select:false},
                    {name:"Literature",select:false},
                    {name:"Music",select:false},
                    {name:"Other",select:false},
                    {name:"Technology",select:false}
                ]
            },
            story:"",
            numberOfSupporters:0
        },
        aboutUser:{
            whoAreYOu:"",
            email:"",
            twitterName:"",
            profilePicture:new Image()
        }
    };
    $scope.user = UserService.get();

    $scope.saveJob = function(){
        if($scope.user.isLoggedIn){
            console.log("JOB SAVE!");
        }else{
            $state.go('user.login');
        }

    }

}]);