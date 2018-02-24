/**
 * Created by kashif on 8/13/14.
 */

/*Memeber info Template*/
dashboard.directive('memberInfo', function() {
    return {
        restrict: "E",
        scope:{
            userInfo:"=info"
        },
        templateUrl: './template/member-info.html'
    };
});

dashboard.directive('rightSlider',function(){
    return{
        restrict: "E",

        templateUrl: './template/aside-slider.html'
    };
});

dashboard.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

dashboard.directive('cssEqualHeight', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attr) {
            $timeout(function(){
                var elementToCopyProperty = attr.cssEqualHeight,
                    source = document.getElementById(elementToCopyProperty.toString());
                //set height
                element[0].style.height = source.clientHeight+5+ 'px';
            },100);
        }
    };
}]);