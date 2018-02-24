dashboard.controller('NavBarController', ['$scope', '$rootScope', '$location', 'UserService', function($scope, $rootScope, $location, UserService) {
    $scope.user = UserService.get();
    $scope.testing = false;

    //    $scope.isNavActive = function (viewLocation) {
    //        //var active = (viewLocation === $location.path());
    //        var active = $location.path().indexOf(viewLocation) > 0;
    //        return active;
    //    };
    $('.home-top-nav-link').click(function() {
        $('body').scrollTop(0);
    });

    $('.dashboard').css('width', window.innerWidth);


    $(window).scroll(function() {
        if (!$scope.jobsListCard) {
            var header = $('.navBaar');
            var scrollUp = $(window).scrollTop();
            console.log(scrollUp);
            if (scrollUp >= 322) {
                $scope.testing = true;
                header.addClass('changeBG');
                console.log('hello');
            } else if (scrollUp <= 0) {
                header.removeClass('changeBG');
                $scope.testing = false;
                console.log('hello world', scrollUp);
            }
        }
    });
}]);

/*for change nav color*/



/*
 window.onscroll = function() {myFunction()};

 function myFunction() {
 if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
 console.log('helo')
 }
 else {
 console.log('hello world')
 }
 }*/