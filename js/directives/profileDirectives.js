/**
 * Created by webashlar-ubuntu1 on 4/9/14.
 */
dashboard.directive("editDirective", function(){
    return {
        restrict: "EA",
        scope: {
            obj: "=",
            value: "@"
        },
        templateUrl: './template/profile-templates/entities-edit.html',
        link: function($scope, element, attrs) {
            $scope.strError = "";
            $scope.fnConfirmEdit = function(){
                $scope.strError = "";
                switch($scope.obj.key){
                    case "jobtitle":
                    case "jobspec":
                    case "jobdesc":
                    case "requirement":
                        if($scope.value == ""){
                            $scope.strError = "Required value cannot be empty";
                            return;
                        }
                        $scope.obj.value.text = $scope.value;
                        break;
                    case "video":
                        var linkId = $scope.fnconvertToEmbedded($scope.value);
                        if(linkId == "error"){
                            $scope.strError = "Please Enter a Valid Youtube URL";
                            return;
                        }
                        $scope.obj.value.url = "https://www.youtube.com/embed/" + linkId;
                        break;
                    case "image":
                        var testRegex = /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/;
                        if(!testRegex.test($scope.value)){
                            $scope.strError = "Please Enter a Valid Image URL";
                            return;
                        }
                        $scope.obj.value.url = $scope.value;
                        break;
                    default :
                        break;
                }
                $scope.obj.editable = false;
            };

            $scope.fnCancelEdit = function(){
                $scope.strError = "";
                switch($scope.obj.key){
                    case "jobtitle":
                    case "jobspec":
                    case "jobdesc":
                    case "requirement":
                        $scope.value = $scope.obj.value.text;
                        break;
                    case "image":
                    case "video":
                        $scope.value = $scope.obj.value.url;
                        break;
                    default :
                        break;
                }
                $scope.obj.editable = false;
            };

            $scope.fnconvertToEmbedded = function(url) {
                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                var match = url.match(regExp);

                if (match && match[2].length == 11) {
                    return match[2];
                } else {
                    return 'error';
                }
            }
        }
    };
});

dashboard.directive("skillsDirective", function(){
    return {
        restrict: "EA",
        scope: {
            obj: "=",
            name: "@",
            strength: "@"
        },
        templateUrl: './template/profile-templates/skills-edit.html',
        link: function($scope, element, attrs) {
            $scope.strError = "";
            $scope.fnConfirmEditSkill = function(){
                if($scope.name == ""){
                    $scope.strError = "Skill text cannot be left empty";
                    return;
                }
                if(isNaN($scope.strength)){
                    $scope.strError = "Skill should be a numeric value";
                    return;
                }
                if(parseInt($scope.strength,10) < 0 || parseInt($scope.strength,10) > 100){
                    $scope.strError = "Skill should be a numeric value between 0-100";
                    return;
                }
                $scope.strError = "";
                $scope.obj.value.name = $scope.name;
                $scope.obj.value.strength = $scope.strength;
                $scope.obj.editable = false;
            };

            $scope.fnCancelEditSkill = function(){
                $scope.strError = "";
                $scope.name = $scope.obj.value.name;
                $scope.strength = $scope.obj.value.strength;
                $scope.obj.editable = false;
            };
        }
    };
});