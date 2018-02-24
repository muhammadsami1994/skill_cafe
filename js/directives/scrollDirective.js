dashboard.directive("scroll", function($window) {
	return function(scope, element, attrs) {
		angular.element($window).bind("scroll", function() {
			console.log(this.pageYOffset);
			if (this.pageYOffset >= Number(attrs.scroll)) {
				scope.enableScrollClass = true;
				console.log('Scrolled below header.');
			} else {
				scope.enableScrollClass = false;
				console.log('Header is in view.');
			}
			scope.$apply();
		});
	};
}).directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];

        var funCheckBounds = function(evt) {
            var scrollDiv = document.getElementById('job-list-div')
            if(scrollDiv.scrollTop+scrollDiv.offsetHeight>=scrollDiv.scrollHeight){
                console.log('scroll ended')
                scope.$apply(attr.whenScrolled);
            }
        };
        angular.element('#job-list-div').bind('scroll', funCheckBounds);
    };
});