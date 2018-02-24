/**
 * Created by Kashif on 8/28/2014.
 */

dashboard.controller('userHomeController', [
	'$modal',
	'$log',
	'$scope',
	'$rootScope',
	'ApiService',
	'UserService',
	'CafeApi',
	'debounce',
	'$timeout',
	'$state',
	'$localStorage',
	'$window',
	'modalService',
	function(
		$modal,
		$log,
		$scope,
		$rootScope,
		ApiService,
		UserService,
		CafeApi,
		debounce,
		$timeout,
		$state,
		$localStorage,
		$window,
		modalService) {

		console.log(window.innerWidth)



		/*
		    -- Compare Skills & Title page

		*/



		$scope.addSkillFromFilter1Array = [];
		$scope.addSkillFromFilter2Array = [];
		$scope.compareTitle = {
			filter1: '',
			filter2: ''

		};
		/* 

		    --Adding skills for compare location
		    @params targetArray: Array which is pass for api call.
		            skill: object which will change.

		     */

		$scope.addCompareSkill = function(skill, targetArray) {

			var existIntex = targetArray.map(function(item) {
				return item.name;
			}).indexOf(skill.name);

			// Check if it already exist
			console.log("Perform adding !")
			if (existIntex < 0) {
				skill.active = true;
				targetArray.push(skill)
			}
		}


		$scope.removeCompareSkill = function(skill, targetArray) {

			var existIntex = targetArray.map(function(item) {
				return item.name;
			}).indexOf(skill.name);

			// Check if it already exist
			console.log("Perform adding !")
			if (existIntex >= 0) {
				skill.active = false;
				targetArray.splice(existIntex, 1)
			}
		}


		$scope.addCompareTitle = function(title, targetCompareSection) {
			$scope.compareTitle[targetCompareSection] = title;
		}

		$scope.removeCompareTitle = function(targetCompareSection) {
			$scope.compareTitle[targetCompareSection] = "";
		}



		/*to show new window icon*/
		$scope.hoveredIndex = null

		/*Local Variables*/
		//var election = new Datamap({element: document.getElementById('container')});



		var map,
			filters = {},
			loadJobsInProcess = false,
			compareFilterQuery = {
				filter_1: {},
				filter_2: {}
			};
		/* Gets the user object from the location storage */
		$scope.user = UserService.get();
		$scope.enableGoButton = false;
		$scope.data = {
			loading: false,
			jobs: UserService.getJobs(),
			homePageFilter: ApiService.getHomeFilters(),
			isCollapsedAddFields: true,
			filterSkillOutput: {
				simple: [],
				addSkill: []
			},
			isCollapsedSkill: true,
			selected_city: 0,
			cityData: false
		};

		$scope.templateView = {

			jobListView: "../../template/homepage/job-list.html",
			jobMapView: "../../template/homepage/job-google-map.html",
			howItWork: "../../template/homepage/how-it-work.html",
			chartUSAMap: "../../template/homepage/chart-usa-map.html",
			topSkillsTitle: '../../template/homepage/top-skills-title.html',
			jobsCountAndCountry: '../../template/homepage/jobs-count-and-country.html',
			compareFilter: './partials/user/home/components/compare-filter.html',
			defaultFilter: './partials/user/home/components/default-filter.html'

		};



		$rootScope.homeSearchView = $scope.templateView.howItWork;
		$rootScope.filterView = $scope.templateView.defaultFilter;

		$scope.clusterMarkers = [];



		$scope.jobsListCard = null;


		$rootScope.allFilters = $scope.data.homePageFilter;

		$scope.refreshHotSkills = function() {
			//$scope.enableGoButton = false;

			var location_obj = {};
			var title_name = '';
			var nearbydistance = '100mi';

			console.log('in refreshHotSkills', $scope.data.homePageFilter);

			for (var i = 0; i < $scope.data.homePageFilter.list.length; i++) {
				var each = $scope.data.homePageFilter.list[i];
				if (each.type == 'filter-location') {
					// {name: 'location_name', lat: 37.7848, lon: -122.7278, zip_code: ''}
					location_obj = each.location
					$localStorage.set('filter-location', JSON.stringify(location_obj));

				} else if (each.type == 'filter-title') {
					title_name = each.inputValue;
					$localStorage.set('filter-title', title_name);
				}
			}

			var skills = [];
			for (i = 0; i < $scope.data.homePageFilter.skill.callback_results.length; i++) {
				var skill = $scope.data.homePageFilter.skill.callback_results[i];
				if (skill.active) {
					skills.push(skill);
				}
			}

			filters = {
				'filter-title': [{
					title: title_name
				}],
				'filter-location': [{
					location: location_obj,
					nearbydist: nearbydistance
				}],
				'filter-skills': [{
					skills: skills
				}],
				'filter-age': [],
				'pagination': {
					start: 0,
					max: 15
				},
				'filter-salary': [{
					salary: $scope.salary
				}]
			};
			UserService.getHotSkills(filters)
				.then(function(result_hit) {
					$scope.data.jobs.hotskills.data.skills = result_hit.data.skills;
				});
			$scope.loadJobs(true);
			$scope.refreshHotTitles();

		};

		$scope.refreshHotTitles = function() {
			//$scope.enableGoButton = false;

			var location_obj = {};
			var title_name = '';
			var nearbydistance = '25mi';

			console.log('in refreshHotTitles', $scope.data.homePageFilter);

			for (var i = 0; i < $scope.data.homePageFilter.list.length; i++) {
				var each = $scope.data.homePageFilter.list[i];
				if (each.type == 'filter-location') {
					// {name: 'location_name', lat: 37.7848, lon: -122.7278, zip_code: ''}
					location_obj = each.location
					$localStorage.set('filter-location', JSON.stringify(location_obj));

				}
			}



			UserService.getHotTitles(filters)
				.then(function(result_hit) {
					$scope.data.jobs.hottitles.data.titles = result_hit.data.titles;
				});
		};

		/*---------------------------------------*/
		/*-------------- Load Jobs --------------*/
		/*---------------------------------------*/

		$scope.loadJobs = function(isNewFilter) {

			if (!loadJobsInProcess) {
				if ($scope.jobsListCard) {
					filters.pagination.start = $scope.jobsListCard.data.json.results.length;
				}
				loadJobsInProcess = true;
				UserService.refreshJobsNearBy(filters)
					.then(function(results) {
						loadJobsInProcess = false;


						if ($scope.jobsListCard && !isNewFilter) {
							/*Load More*/
							$scope.jobsListCard.data.json.results = $scope.jobsListCard.data.json.results.concat(results.data.json.results)
						} else {
							/*For First Time Load*/
							if ($scope.jobsListCard) {
								$scope.jobsListCard = null;
								$scope.$apply($scope.jobsListCard);
							}

							$scope.jobsListCard = results;
							console.log(results)
							if (!$scope.data.homePageFilter.list[0].inputValue) {
								$scope.homeSearchView = $scope.templateView.chartUSAMap;
							} else {
								$scope.homeSearchView = $scope.templateView.jobListView;

							}

						}

					});
			}

		}

		/*---------------------------------------*/
		/*-------------- Load Jobs --------------*/
		/*---------------------------------------*/

		/* --------------------------------------------------- */
		/* ------ Adding skills to respective filters -------- */
		/* --------------------------------------------------- */
		$scope.addSkill = function(skill, targetArray) {
			skill.active = true;
			//$scope.data.homePageFilter.skill.callback_results.push(skill);


			var existIntex = targetArray.map(function(item) {
				return item.name;
			}).indexOf(skill.name);

			// Check if it already exist

			if (existIntex < 0) {
				targetArray.push(skill);

				filters['filter-skills'][0].skills = targetArray;
				$scope.loadJobs(true);
			}

		}

		/* --------------------------------------------------- */
		/* ------ Adding skills to respective filters -------- */
		/* --------------------------------------------------- */

		$scope.changeResultViewStyle = function(_template) {
			$scope.homeSearchView = _template;
		}

		/*----------------- Add Salary to filter jobs*/
		$scope.addSalary = function(salary) {
			$scope.salary = salary;
			filters['filter-salary'][0].salary = salary;
			$scope.loadJobs(true);
		}
		$scope.removeSalary = function() {
			$scope.salary = ''
		}


		/*
		 @param Title
		 Change the title of Filter
		 */

		$scope.changeFilterTitle = function(title) {
			$scope.data.homePageFilter.list[1].inputValue = title
			filters['filter-title'][0].title = title;
			$scope.loadJobs(true);
		}
		$scope.changeFilterState = function(state) {
			$scope.data.homePageFilter.list[0].inputValue = state;
		}


		$scope.loadJobsOnScroll = function() {
			if ($scope.jobsListCard.data.json.results.length <= $scope.jobsListCard.data.json.totalResults) {
				$scope.loadJobs();
			}
			console.log('scrolled')

		}


		$scope.initilizeComparision = function() {
			$rootScope.filterView = $scope.templateView.compareFilter;
			$scope.comparisionFilters = ApiService.getHomeFilters();
		}

		/* ---------------------------------------------------- */
		/* --------------- Call Comparision ------------------- */
		/* ---------------------------------------------------- */

		$scope.letsCompareFilters = function() {
			$scope.addSkillFromFilter1Array = [];
			$scope.addSkillFromFilter2Array = [];
			console.log($scope.data.homePageFilter);
			var filter1_skills = [],
				filter2_skills = [];

			$scope.compare_filter_result = {
				filter_1: {},
				filter_2: {}
			}
			$scope.data.homePageFilter.skill.list.forEach(function(skill) {
				if (skill.active) {
					filter1_skills.push(skill);
				}
			});

			$scope.comparisionFilters.skill.list.forEach(function(skill) {
				if (skill.active) {
					filter2_skills.push(skill);
				}
			});


			/* -Filter No 1*/
			var filter_1 = {
				'filter-title': [{
					title: $scope.comparisionFilters.list[1].inputValue
				}],
				'filter-location': [{
					location: $scope.data.homePageFilter.list[0].location,
					nearbydist: '100mi'
				}],
				'filter-skills': [{
					skills: filter1_skills
				}]
			}
			UserService.getHotSkills(filter_1)
				.then(function(suggestion_filter_1) {
					console.log("******Suggest FIlter 1******");
					$scope.compare_filter_result.filter_1.hotSkills = suggestion_filter_1.data.skills;



					/*For Getting Number of jobs*/
					UserService.refreshJobsNearBy(filter_1)
						.then(function(filter_1_jobs) {
							$scope.compare_filter_result.filter_1.numberOfJobs = filter_1_jobs.data.json.totalResults;


							/*For getting titles*/

							if ($scope.comparisionFilters.list[1].inputValue.length < 1) {
								UserService.getHotTitles(filter_1)
									.then(function(filter_1_title) {

										$scope.compare_filter_result.filter_1.hotTitles = filter_1_title.data.titles;

									});
							}


						});



				});



			/* -Fiter No 2*/
			var filter_2 = {
				'filter-title': [{
					title: $scope.comparisionFilters.list[1].inputValue
						//title: $scope.data.homePageFilter.list[1].inputValue
				}],
				'filter-location': [{
					location: $scope.comparisionFilters.list[0].location,
					nearbydist: '100mi'
				}],
				'filter-skills': [{
					skills: $scope.comparisionFilters
				}]
			}
			UserService.getHotSkills(filter_2)
				.then(function(suggestion_filter_2) {
					console.log("****** Suggest FIlter 2******");
					console.log(suggestion_filter_2)
					$scope.compare_filter_result.filter_2.hotSkills = suggestion_filter_2.data.skills;

					/*For Getting Number of jobs*/
					UserService.refreshJobsNearBy(filter_2)
						.then(function(filter_2_jobs) {
							$scope.compare_filter_result.filter_2.numberOfJobs = filter_2_jobs.data.json.totalResults;


							/*For getting titles*/
							if ($scope.comparisionFilters.list[1].inputValue.length < 1) {
								UserService.getHotTitles(filter_2)
									.then(function(filter_2_title) {

										$scope.compare_filter_result.filter_2.hotTitles = filter_2_title.data.titles;

									});
							}

						});


				});


			$scope.homeSearchView = $scope.templateView.compairFilters;
		}



		/* ------------------------------------------------------ */
		/* -------------- Refresh Filter 1 Result --------------- */
		/* ------------------------------------------------------ */

		/*
		    $params: selectedFilter is either filter_1 / filter_2
		    Description: This will tell you exact Number of jobs & accourding skills

		*/

		$scope.refreshCompare1Result = function(selectedFilter) {

			UserService.getHotSkills(filter_1)
				.then(function(suggestion_filter_1) {
					console.log("******Suggest FIlter 1******");
					$scope.compare_filter_result.selectedFilter.hotSkills = suggestion_filter_1.data.skills;



					/*For Getting Number of jobs*/
					UserService.refreshJobsNearBy(filter_1)
						.then(function(filter_1_jobs) {
							$scope.compare_filter_result.selectedFilter.numberOfJobs = filter_1_jobs.data.json.totalResults;


							/*For getting titles*/

							if ($scope.comparisionFilters.list[1].inputValue.length < 1) {
								UserService.getHotTitles(filter_1)
									.then(function(filter_1_title) {

										$scope.compare_filter_result.selectedFilter.hotTitles = filter_1_title.data.titles;

									});
							}


						});



				});

		}



		/* ---------------------------------------------------- */
		/* --------------- Call Comparision ------------------- */
		/* ---------------------------------------------------- */

		/*----------------------------------------------------------*/
		/*------------- Disable Compare Functionality --------------*/
		/*----------------------------------------------------------*/

		$scope.hideComparisionFilters = function() {
			console.log($scope.hidedComponet);
			$scope.data.homePageFilter.list[1] = $scope.hidedComponet[0];
			$scope.comparisionFilters = undefined;
			$scope.compare_filter_result = {
				fitler1: null,
				filter2: null
			}
			$scope.compare_filter_result = null;
			$scope.homeSearchView = $scope.templateView.howItWork;
			console.log($scope.comparisionFilters)
		}

		/*----------------------------------------------------------*/
		/*------------- Disable Compare Functionality --------------*/
		/*----------------------------------------------------------*/

		/* ----------------------------------------------------------- */
		/* -----------Google Map Home Page New Version---------------- */
		/* ----------------------------------------------------------- */

		/*$scope.$on('mapInitialized', function(event, evmap) {
			map = evmap;
			var position = {
				latitude: $scope.jobsListCard.data.location.lat || 47,
				longitude: $scope.jobsListCard.data.location.lon || -87
			};
			var myLatLng = new google.maps.LatLng(position.latitude, position.longitude);

			map.setCenter(myLatLng)


			var contentString = '<div class="col-lg-12 google-map-info-window">' +
				'<div class = "col-lg-11" >' +
				'<h3 class = "inline-block" > Analysis </h3>' +
				'<div class = "margin-left-20 inline-block tag" >Tableau </div>' +
				'</div > ' +
				'<div class = "col-lg-1 month-date text-center" >' +
				'<div class = "col-lg-12 no-padding date" > 12 </div>' +
				'<div class = "col-lg-12 no-padding month" > OCT </div >' +
				'</div>' +
				'<div class = "col-lg-11" >' +
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' +
				'</div>' +
				'</div >';

			$scope.jobsListCard.data.json.results.forEach(function(jobList) {

				var infowindow = new google.maps.InfoWindow({
					content: contentString,
					maxWidth: 500
				});

				var latLng = new google.maps.LatLng(jobList.latitude, jobList.longitude);


				var marker = new google.maps.Marker({
					position: latLng
				});

				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map, marker);
				});

				$scope.clusterMarkers.push(marker);

			});

			$scope.clusters = new MarkerClusterer(map, $scope.clusterMarkers, {});

			google.maps.event.addListener($scope.clusters, 'clusterclick', function(cluster) {
				console.log(cluster);
			})


		});*/

		$scope.setLocationAndSearch = function(filter, name) {
				if (filter == 'forCampareFilter2') {
					for (var i = 0; i < $scope.addSkillFromFilter2Array.length; i++) {
						$scope.addSkill($scope.addSkillFromFilter2Array[i], $scope.data.homePageFilter.skill.callback_results)
					}
					/*$scope.changeFilterState(name)*/
					$scope.data.homePageFilter = $scope.comparisionFilters
					$scope.hideComparisionFilters()
					$scope.refreshHotSkills();
				} else {
					for (var i = 0; i < $scope.addSkillFromFilter1Array.length; i++) {
						$scope.addSkill($scope.addSkillFromFilter1Array[i], $scope.data.homePageFilter.skill.callback_results)
					}
					/*$scope.changeFilterState(name);
					$scope.hideComparisionFilters()
					//$scope.data.homePageFilter.list[1].inputValue = $scope.comparisionFilters.list[1].inputValue;
					$scope.refreshHotSkills();*/
					$scope.data.homePageFilter = $scope.comparisionFilters
					$scope.hideComparisionFilters()
					$scope.refreshHotSkills();
					$scope.refreshHotTitles();

				}

			}
			/* ----------------------------------------------------------- */
			/* -----------Google Map Home Page New Version---------------- */
			/* ----------------------------------------------------------- */


		/* ------------------------------------------------------------ */
		/* --------------------- Remove Skills ------------------------ */
		/* ------------------------------------------------------------ */


		$scope.removeSkill = function(skill) {

			var targetIndex = $scope.data.homePageFilter.skill.callback_results.map(function(item) {
				return item.name;
			}).indexOf(skill.name);


			if (targetIndex >= 0) {
				skill.active = false;
				$scope.data.homePageFilter.skill.callback_results.splice(targetIndex, 1);
			}


		}

		$rootScope.$on('fix-search-bar-event', function(event, __boolean__) {
			$scope.fixedSearchBar = __boolean__;
		});

		$rootScope.$on('home-view-position-event', function(event, __count__) {

			var __positions__ = [
				'home-view-position-none',
				'home-view-position-one',
				'home-view-position-two',
				'home-view-position-three',
				'home-view-position-four',
				'home-view-position-five'
			];

			$scope.homeViewPosition = __positions__[__count__];


		});

		$scope.openFindSkillsetModal = function (size) {
			var modalInstance = $modal({
				template: '../../template/homepage/modal.html',
				controller: 'modalCtrl',
				size: 'sm',
				show: true,
				resolve: {}
			});
			modalInstance.$promise.then(modalService.set(modalInstance,'skillset'));
		};
		
		$scope.openFindLocationModal = function (size) {
			var modalInstance = $modal({
				template: '../../template/homepage/modal.html',
				controller: 'modalCtrl',
				size: 'sm',
				show: true,
				resolve: {}
			});
			modalInstance.$promise.then(modalService.set(modalInstance,'location'));
		};
	}

]);