/**
 * Created by webashlar-ubuntu1 on 4/9/14.
 */
dashboard.controller('profileController',['$scope','ApiService','$sce','UserService',function($scope,ApiService,$sce,UserService){
    $scope.arrProfileDetails = ApiService.getProfileDetails();
    $scope.arrprofilePageData = [];

    $scope.fnDataDropped = function($event,$data,array){
        $data.editable = false;
        array.push($data);
    };

    $scope.fnSuccessDropped = function($event,index,array){
        //array.splice(index,1); uncomment if you wanna remove from left side
    };

    $scope.fngetImage = function(src){
        if (src !== "") {
            return src;
        } else {
            return "//:0";
        }
    };

    $scope.fntrustSrc = function(src){
        return $sce.trustAsResourceUrl(src);
    };

    $scope.fnDeleteInstance = function(index){
        if(confirm("This Element will be removed. Are you sure you want to delete ?")){
            $scope.arrprofilePageData.splice(index,1);
        }
    };
}]);