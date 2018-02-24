var dashboard = angular.module('dashboard', [
	'ui.router',
	'ui.bootstrap',
	'mgcrea.ngStrap',
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'underscore',
	'ngRepeatReorder',


	'ngSanitize',
	'ngDragDrop',
	'ui.sortable',
	'xeditable',
	'debounce',

	'ui.load',
	'ui.jq',
	'app.controllers',

	'angulartics',
	'angulartics.google.analytics',
	'textAngular',
	'ui.checkbox',
	'datamaps'
]);

dashboard.run(
	['$rootScope', '$state', '$stateParams', '$location', 'editableOptions',
		function($rootScope, $state, $stateParams, $location, editableOptions) {

			// config
			$rootScope.app = {
				// for chart colors
				color: {
					primary: '#7266ba',
					info: '#23b7e5',
					success: '#27c24c',
					warning: '#fad733',
					danger: '#f05050',
					light: '#e8eff0',
					dark: '#3a3f51',
					black: '#1c2b36'
				},

				loading: false
			};

			$rootScope.go = function(path) {
				$state.go(path);
			};


			$rootScope.isNavActive = function(viewLocation) {
				//var active = (viewLocation === $location.path());
				var active = $location.path().indexOf(viewLocation) > 0;

				//                if (active)
				//                    console.log(viewLocation, active);

				return active;
			};

			$rootScope.$on('LOAD-SPINNER', function() {
				//                console.log('LOAD-SPINNNER');
				$rootScope.app.loading = true;
			});
			$rootScope.$on('UNLOAD-SPINNER', function() {
				//                console.log('UNLOAD-SPINNNER');
				$rootScope.app.loading = false;
			});
			editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'


		}
	]
);


dashboard.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

	//Enable the cookies to be sent, else server will have no clue of the session
	$httpProvider.defaults.withCredentials = true;
	// Enable cross domain calls
	$httpProvider.defaults.useXDomain = true;
	//Lets Django is_ajax() call work, although we dont use it as of now, but you never know.
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	//delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$urlRouterProvider.otherwise('home');

	// use the HTML5 History API
	$locationProvider.html5Mode(false);
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: './partials/user/home/home.html',
			controller: 'userHomeController'
		})
		.state('home.compareFilter', {
			url: '',
			templateUrl: './partials/user/home/components/compare-filter.html',
			controller: 'compareFilterController'
		})
		.state('recruiter-home', {
			url: '/recruiter',
			templateUrl: './partials/recruiter/home/home.html',
			controller: 'recruiterHomeController'
		})
		/* For User*/
		.state('user', {
			url: '/user',
			templateUrl: './partials/user/panel.html'
		})
		/* For User*/
		.state('jobs', {
			url: '/jobs',
			templateUrl: './partials/user/panel.html',
			controller: "loginController"
		})
		.state('jobs.analytics', {
			url: '/analytics',
			templateUrl: './partials/user/analytics.html',
			controller: 'jobSeekerDashboardController'
		})

	.state('user.login', {
			url: '/login',
			templateUrl: './partials/user/account/login.html',
			controller: "loginController"
		})
		.state('user.logout', {
			url: '/logout',
			templateUrl: './partials/user/account/login.html',
			controller: "logoutController"
		})
		.state('user.signUp', {
			url: '/signUp',
			templateUrl: './partials/user/account/site-signUp.html',
			controller: "loginController"
		})
		.state('user-panel', {
			url: "/user",
			templateUrl: "./partials/user/panel-components/user-panel.html"

		})
		.state('user-panel.getting-started', {
			url: "/getting-started",
			templateUrl: './partials/user/panel-components/getting-started.html',
			controller: "jobSeekerDashboardController"
		})
		.state('user-panel.search', {
			url: "/search",
			templateUrl: './partials/user/panel-components/search.html',
			controller: "jobSeekerSearchController"
		})
		.state('user-panel.dashboard', {
			url: '/dashboard',
			templateUrl: './partials/user/panel-components/dashboard.html',
			controller: 'jobSeekerDashboardController'
		})
		.state('user-panel.dashboard.skill', {
			url: '/skill',
			templateUrl: './partials/user/panel-components/dashboard/skills.html',
			controller: 'jobSeekerDashboardController'
		})
		.state('user-panel.dashboard.setting', {
			url: '/setting',
			templateUrl: './partials/user/panel-components/dashboard/settings.html',
			controller: "jobSeekerSettingsController"
		})

	.state('user-panel.analytics', {
			url: '/analytics',
			templateUrl: './partials/user/panel-components/analytics.html',
			controller: 'analyticsHotSkillsController'
		})
		.state('user-panel.analytics.nearme', {
			url: '/nearme',
			templateUrl: './partials/user/panel-components/analytics/nearme.html',
			controller: 'analyticsWorldController'
		})
		//        .state('user-panel.analytics.world',{
		//            url:'/world',
		//            templateUrl:'./partials/user/panel-components/analytics/world.html',
		//            controller:'analyticsWorldController'
		//        })
		.state('user-panel.analytics.trending', {
			url: '/trending',
			templateUrl: './partials/user/panel-components/analytics/trending.html',
			controller: 'analyticsHotSkillsController'
		})
		.state('user-panel.analytics.career', {
			url: '/career',
			templateUrl: './partials/user/panel-components/analytics/career.html',
			controller: 'analyticsCareerStepsController'
		})
		.state('user-panel.profile', {
			url: '/profile',
			templateUrl: './partials/user/panel-components/profile.html',
			controller: 'profileController'
		})
		.state("user-panel.profile-view", {
			url: '/viewProfile',
			templateUrl: './partials/user/profile/defaultView.html',
			controller: 'userProfileView'
		}).state("user.postJobs", {
			url: '/postJob',
			templateUrl: './partials/user/panel-components/postJobs/jobForm.html',
			controller: 'jobPostController'
		})


	/* For User*/

	/* For Recruiter*/
	.state('recruiter', {
		url: '/recruiter',
		templateUrl: './partials/recruiter/panel.html'
	})

	.state('recruiter.login', {
			url: '/login',
			templateUrl: './partials/recruiter/account/login.html',
			controller: 'recruiterLoginController'
		})
		.state('recruiter.signUp', {
			url: '/signup',
			templateUrl: './partials/recruiter/account/signUp.html'
		})
		.state('recruiter.reset', {
			url: '/reset',
			templateUrl: './partials/recruiter/account/forget-password.html'
		})
		.state('recruiter_panel', {
			url: "/recruiter",
			templateUrl: './partials/recruiter/panel-components/navBar.html'
		})
		.state('recruiter_panel.dashboard', {
			url: '/dashboard',
			templateUrl: './partials/recruiter/panel-components/dashboard.html',
			controller: 'topTalentController'
		})
		.state('recruiter_panel.search', {
			url: '/search',
			templateUrl: './partials/recruiter/panel-components/search.html',
			controller: 'recruiterSearch'
		})
		/* For Recruiter*/


	.state('aboutus', {
		url: '/partials/aboutus',
		templateUrl: './partials/about-us.html',
		controller: 'MapCtrl'
	})

	.state('contactus', {
			url: '/partials/contactus',
			templateUrl: './partials/contact-us.html'
		})
		.state('privacy', {
			url: '/partials/privacy',
			templateUrl: './partials/common/privacy.html'
		})
		.state('terms', {
			url: '/partials/terms',
			templateUrl: './partials/common/terms.html'
		})
		.state('jobindex', {
			url: '/partials/jobindex',
			templateUrl: './partials/common/jobindex.html',
			controller: 'jobindexController'
		})
		.state('example', {
			url: '/example',
			templateUrl: './partials/example.html'
		});
}]);


/**
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */


// TODO: Remove unnecessary components, like footable dataTable which we are not using.
dashboard.constant('JQ_CONFIG', {
	easyPieChart: ['lib/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
	sparkline: ['lib/jquery/charts/sparkline/jquery.sparkline.min.js'],
	plot: ['lib/jquery/charts/flot/jquery.flot.min.js',
		'lib/jquery/charts/flot/jquery.flot.resize.js',
		'lib/jquery/charts/flot/jquery.flot.tooltip.min.js',
		'lib/jquery/charts/flot/jquery.flot.spline.js',
		'lib/jquery/charts/flot/jquery.flot.orderBars.js',
		'lib/jquery/charts/flot/jquery.flot.pie.min.js'
	],

	slimScroll: ['lib/jquery/slimscroll/jquery.slimscroll.min.js'],
	sortable: ['lib/jquery/sortable/jquery.sortable.js'],
	slider: ['lib/jquery/slider/bootstrap-slider.js',
		'lib/jquery/slider/slider.css'
	],
	vectorMap: [
		'lib/jquery/jvectormap/jquery-jvectormap.min.js',
		'lib/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
		'lib/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
		'lib/jquery/jvectormap/jquery-jvectormap.css'
	]
});


dashboard.constant('MODULE_CONFIG', {

	/*
	 select2:        ['lib/jquery/select2/select2.css',
	 'lib/jquery/select2/select2-bootstrap.css',
	 'lib/jquery/select2/select2.min.js',
	 'js/modules/ui-select2.js']
	 */
});