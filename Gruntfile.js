/**
 * Team SkillCafe
 */
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		env: {
			options: {
				/* Shared Options Hash */
				//globalOption : 'foo'
			},
			dev: {
				NODE_ENV: 'DEVELOPMENT'
			},
			prod: {
				NODE_ENV: 'PRODUCTION'
			}
		},
		preprocess: {
			dev: {
				src: './index_template.html',
				dest: './index.html'

			},
			prod: {
				src: './index_template.html',
				dest: './index.html',
				options: {
					context: {
						name: '<%= pkg.name %>',
						version: '<%= pkg.version %>',
						now: '<%= now %>',
						ver: '<%= ver %>'
					}
				}
			}
		},

		clean: {
			build: ["build/"]
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dev: {
				//do nothing
			},
			prod: {
				src: [
					//"js/app.js", 'js/services/*.js', 'js/directives/*.js', 'js/controllers/*.js',  'js/filters/*.js', 'lib/*.js', 'lib/angular/*.js',

					"lib/ngdragdrop.js",
					"lib/angular/angular-translate.js",
					"lib/angular/ui-jq.js",
					"lib/angular/ui-load.js",
					"lib/angular/ui-validate.js",

					"js/app.js",


					"js/services/apiService.js",
					"js/services/cafeapi.js",
					"js/services/hobbies.js",
					"js/services/language.js",
					"js/services/skills.js",
					"js/services/userservice.js",
					"js/services/localStorageService.js",
					"js/services/dataMapService",
					"js/services/modalService.js",

					"js/controllers/analyticsHotSkillsController.js",
					"js/controllers/analyticsCareerStepsController.js",
					"js/controllers/analyticsWorldController.js",
					"js/controllers/democontrollers.js",
					"js/controllers/homeController.js",
					"js/controllers/jobSeekerDashboardController.js",
					"js/controllers/jobSeekerSearchController.js",
					"js/controllers/jobSeekerSettingsController.js",
					"js/controllers/loginController.js",
					"js/controllers/logoutController.js",

					"js/controllers/MapController.js",
					"js/controllers/navBarController.js",
					"js/controllers/profileController.js",
					"js/controllers/userProfileViewController.js",

					"js/controllers/recruiterhomeController.js",
					"js/controllers/recruiterLoginController.js",
					"js/controllers/jobPostController.js",

					"js/controllers/recruiterSearchController.js",
					"js/controllers/toptalentController.js",
					"js/controllers/homePageComponents/modalController.js",
					"js/controllers/homePageComponents/modalFilterController.js",

					"js/directives/addInListDirective.js",
					"js/directives/dashboardDirectives.js",

					"js/directives/filtersDirectives.js",
					'js/directives/ngRepeatReorder.js',

					"js/directives/profileDirectives.js",
					"js/directives/sideNestedDirective.js",

					"js/directives/thumbnailViewDirective.js",
					"js/directives/utilDirectives.js",
					"js/directives/socialSharingDirective.js",
					"js/directives/dataMapDirective.js",


					"js/filters/capitalize.js",
					"js/filters/searchFilters.js",


				],
				dest: 'build/app.min.js'
			},
			bower: {
				src: [
					// JQUERY Should be the first, before angular-->

					'bower_components/jquery/dist/jquery.min.js',
					'bower_components/jquery-ui/jquery-ui.js',

					//Lib-->
					'bower_components/hammerjs/hammer.min.js',
					'bower_components/angular/angular.js',
					'bower_components/angular-hammer/angular-hammer.js',
					'bower_components/angular-ui-sortable/sortable.js',
					'bower_components/angular-xeditable/dist/js/xeditable.js',
					//angular strap with animation-->
					"bower_components/angular-bootstrap/ui-bootstrap.min.js",
					"bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
					"bower_components/angular-strap/dist/angular-strap.min.js",
					"bower_components/angular-strap/dist/angular-strap.tpl.min.js",
					"bower_components/angular-animate/angular-animate.min.js",

					"bower_components/angular-animate/angular-animate.min.js",
					"bower_components/angular-cookies/angular-cookies.min.js",
					"bower_components/angular-local-storage/angular-local-storage.min.js",

					"bower_components/underscore/underscore-min.js",
					"bower_components/angular-underscore-module/angular-underscore-module.js",

					"bower_components/oauth-js/dist/oauth.min.js",
					"bower_components/angular-bootstrap-checkbox/angular-bootstrap-checkbox.js",
					//angular strap with animation-->

					"bower_components/angular-ui-router/release/angular-ui-router.min.js",

					"bower_components/angular-ui/build/angular-ui.min.js",

					"bower_components/angular-resource/angular-resource.min.js",
					"bower_components/ng-debounce/angular-debounce.js",
					"bower_components/angular-sanitize/angular-sanitize.min.js",

					"bower_components/angulartics/dist/angulartics.min.js",
					"bower_components/angulartics/dist/angulartics-ga.min.js",
					"bower_components/textAngular/src/textAngular.js",
					"bower_components/textAngular/src/textAngularSetup.js",
					"bower_components/ngmap/build/scripts/ng-map.js",
					"bower_components/ngmap/spec/lib/markerclusterer.js",
					"bower_components/angular-datamaps/dist/angular-datamaps.min.js"

				],
				dest: 'build/_bower.js'
			}
		},

		cssmin: {
			prod: {
				src: [
					"css/font-awesome.min.css",
					"css/bootstrap-social.css",
					"bower_components/bootstrap/dist/css/bootstrap.min.css",
					"bower_components/angular-motion/dist/angular-motion.min.css",
					"bower_components/bootstrap-additions/dist/bootstrap-additions.min.css",
					"css/common.css",

					//Custom Css Files
					"css/oapp.css",
					"css/style.css",

					//Login styleSheet
					"css/login/forgot_password.css",
					"css/login/form.css",
					"css/login/layout.css",
					"css/login/login.css",
					"css/login/signup.css",

					"css/side-panel.css",
					"css/dashboard-page.css",
					"css/settings.css",
					"css/home-page.css",
					"css/first-login.css",
					"css/jobseeker/dashboard.css",
					"css/jobseeker/search.css",
					'css/profile/default-theme.css',


					"css/output/app.widgets.less.css",
					"css/output/app.colors.less.css",
					"css/output/app.mixins.less.css",
					"css/output/app.components.less.css",
					"css/output/app.utilities.less.css",
					"css/output/app.reset.less.css",
					"css/output/app.layout.less.css",
					"css/output/app.plugin.less.css",
					"css/output/app.buttons.less.css",

					"css/wizard/style.css",
					"css/wizard/orange.css",
					"css/wizard/flaticon.css",

					//jobs Post Forms
					"css/postJobs.css"

				],
				dest: 'build/skillcafe.min.css'
			},
			dev: {
				//do nothing
			}
		},

		watch: {
			scripts: {
				files: ['!build/*'],
				tasks: ['default'],
				options: {
					spawn: false,
					livereload: false
				}
			}
		}


	});

	//https://github.com/gruntjs/grunt-contrib-cssmin
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-env');

	grunt.registerTask('dev', ['env:dev', 'clean', 'uglify:bower', 'preprocess:dev']);
	grunt.registerTask('prod', ['env:prod', 'clean', 'uglify:bower', 'uglify:prod', 'cssmin:prod', 'preprocess:prod']);

	// Default task(s).
	grunt.registerTask('default', ['dev']);


};