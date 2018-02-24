dashboard.controller('jobListController', [
	'filterService', 'UserService', '$q', '$rootScope', '_', 'usaMapDataService',

	function(filterService, UserService, $q, $rootScope, _, usaMapDataService) {


		var vm = this;
		$rootScope.filterView = './partials/user/home/components/default-filter.html';


		vm.query = filterService.query.get();
		vm.queryResults = {
			topSkills: [],
			topTitles: [],
			topCities: [],
			numberOfJobs: 0,

			jobs: [],
		}

		vm.activeSkill = [];
		vm.activeTitle = "";
		vm.activeSalary = "";
		vm.activeLocation = vm.query.filters['filter-location'][0].location.name;

		vm.jobViewTypes = {
			listView: '../../template/homepage/job-list.html',
			mapView: '../../template/homepage/job-map.html'
		}

		vm.activeJobView = vm.jobViewTypes.listView;


		/*Initilize Result*/

		refreshResult(vm.query.filters);



		vm.topSkillsAndTitles = '../../template/homepage/top-skills-title.html';
		vm.jobsCountAndCountry = '../../template/homepage/jobs-count-and-country.html';

		/* --------------------- */
		/* -- Initilizing Map --*/
		/* ------------------- */

		var __mapApiCallEnable = true;
		var __mapChartData = usaMapDataService.get();
		vm.stateNoOfJobs = 0;
		usaMapDataService.initilizeColoring();



		function __initilizeUSAMAP__(data) {
			vm.mapObject = {
				scope: 'usa',
				responsive: true,
				options: {
					width: 1110,
					legendHeight: 60 // optionally set the padding for the legend
				},
				geographyConfig: {
					highlighBorderColor: '#EAA9A8',
					highlighBorderWidth: 2,
					popupTemplate: function(geography, data) {

						var __coordinates__flatten = _.flatten(geography.geometry.coordinates);
						if (__mapApiCallEnable && !data.jobs) {
							__mapApiCallEnable = false;

							_getPopUpTemplateForMap_(
								[
									__coordinates__flatten[0],
									__coordinates__flatten[1]
								], {
									name: geography.properties.name,
									state_code: geography.id
								}
							).then(function(numberOfJobs) {
								__mapChartData[data.id]['jobs'] = numberOfJobs;
								vm.stateNoOfJobs = numberOfJobs;
								__mapApiCallEnable = true;
							});
						} else {
							vm.stateNoOfJobs = data.jobs;
						}

						return '<div class="hoverinfo">' + geography.properties.name + ': ' + (vm.stateNoOfJobs || 0) + '</div>';

					}
				},
				fills: {
					'defaultFill': '#eaeaea',
					'veryHigh': '#1d7a61',
					'high': '#32a084',
					'average': '#6bdca1',
					'considerable': '#a2d7c3',
					'low': '#c3e4d7',
					'veryLow': '#eaeaea'
				},
				data: data,
			};
		}



		var _viewStateInfo = function(geography) {
			console.log(geography);
		}


		function _getPopUpTemplateForMap_(latLong, state) {
			var __locationData__ = {
					name: state.name,
					lat: latLong[1],
					lon: latLong[0],
					country: {
						country_code: "US",
						name: "United States"
					},
					state: state
				}
				/*Get Number Of Jobs*/
			var __query__for__noOfJobs = new filterService.queryConstructor(__locationData__);

			return $q(function(resolve, reject) {
				refreshJobs(__query__for__noOfJobs.filters)
					.then(function(data) {
						resolve(data.numberOfJobs);
					})
			})


		}

		__initilizeUSAMAP__(__mapChartData);

		/* --------------------- */
		/* -- Initilizing Map --*/
		/* ------------------- */



		function refreshResult(query) {

			query.pagination.max = 15;
			query.pagination.start = vm.queryResults.jobs.length;
			vm.activeLocation = vm.query.filters['filter-location'][0].location.name;
			UserService.refreshJobsNearBy(query)
				.then(function(_jobs) {

					vm.queryResults.numberOfJobs = _jobs.data.json.totalResults;
					vm.queryResults.jobs = _jobs.data.json.results;

					$rootScope.$emit('fix-search-bar-event', true);

					/* --Emit Number of skills so that adjust the height of results-- */
					$rootScope.$emit('home-view-position-event', query['filter-skills'][0].skills.length);

					if (query['filter-skills'][0].skills.length > 0) {
						return {
							data: {
								skills: []
							}
						}
					} else {
						return UserService.getHotSkills(query);
					}

				})
				.then(function(_hotSkills) {

					vm.queryResults.topSkills = _hotSkills.data.skills.slice(0, 5);

					if (vm.queryResults.topSkills.length > 0) {
						/* ---/ Mark skills which are active \--- */
						query['filter-skills'][0].skills.forEach(function(__query_skills__) {
							var __skillIndex = vm.queryResults.topSkills.map(function(__top_skills__) {
								return __top_skills__.name;
							}).indexOf(__query_skills__.name);

							if (__skillIndex >= 0) {
								vm.queryResults.topSkills[__skillIndex].active = true;
							}
						});
					}



					if (query['filter-title'][0].title) {
						return {
							data: {
								titles: []
							}
						};
					} else {
						return UserService.getHotTitles(query);
					}

				})
				.then(function(_hotTitles) {

					vm.queryResults.topTitles = _hotTitles.data.titles;

					if (query['filter-location'][0].location.name == undefined) {
						return {
							data: []
						};
					} else {
						return UserService.getTopCities(query);
					}
				})
				.then(function(_topCities) {
					vm.queryResults.topCities = _topCities.data;
				});
		}

		function refreshJobs(_query) {

			return $q(function(resolve, reject) {
				UserService.refreshJobsNearBy(_query)
					.then(function(_jobs) {

						resolve({
							numberOfJobs: _jobs.data.json.totalResults,
							list: _jobs.data.json.results
						})
					});
			})


		}

		function refreshSkills(_query) {

			return $q(function(resolve, reject) {

				UserService.getHotSkills(_query)
					.then(function(_hotSkills) {

						resolve(_hotSkills.data.skills.slice(0, 5));
					});

			})



		}


		var _letActiveSkill = function(skill) {
			skill.active = true;

			var _itemIndex = vm.activeSkill.map(function(item) {
				return item.name;
			}).indexOf(skill.name)

			if (_itemIndex < 0) {
				vm.activeSkill.push(skill);
				vm.query.filters['filter-skills'][0].skills = vm.activeSkill;
				vm.queryResults.jobs = [];

				refreshJobs(vm.query.filters)
					.then(function(_jobs) {
						vm.queryResults.numberOfJobs = _jobs.numberOfJobs;

						vm.queryResults.jobs = _jobs.list;
					});
			}
		};

		var _letRemoveSkill = function(skill) {
			skill.active = false;


			var _itemIndex = vm.activeSkill.map(function(item) {
				return item.name;
			}).indexOf(skill.name);


			if (_itemIndex >= 0) {
				vm.activeSkill.splice(_itemIndex, 1);
				vm.query.filters['filter-skills'][0].skills = vm.activeSkill;
				vm.queryResults.jobs = [];

				refreshJobs(vm.query.filters)
					.then(function(_jobs) {
						vm.queryResults.numberOfJobs = _jobs.numberOfJobs;

						vm.queryResults.jobs = _jobs.list;
					});
			}

		};

		var _setTitle = function(title) {
			vm.activeTitle = title;
			vm.query.filters['filter-title'][0].title = vm.activeTitle;

			refreshSkills(vm.query.filters)
				.then(function(_skills) {
					vm.queryResults.topSkills = _skills;

					vm.query.filters['filter-skills'][0].skills.forEach(function(_last_skill_) {

						if (_last_skill_.active) {
							var newSkillIndex = vm.queryResults.topSkills.map(function(newSkill) {
								return newSkill.name;
							}).indexOf(_last_skill_.name);

							if (newSkillIndex >= 0) {
								vm.queryResults.topSkills[newSkillIndex].active = true;
							}
						}
					});


					vm.queryResults.jobs = [];

					return refreshJobs(vm.query.filters);

				})
				.then(function(_jobs) {
					vm.queryResults.numberOfJobs = _jobs.numberOfJobs;

					vm.queryResults.jobs = _jobs.list;
				});
		}

		var _setSalary = function(salary) {
			vm.activeSalary = salary;
			vm.query.filters['filter-salary'][0].salary = vm.activeSalary;
			vm.queryResults.jobs = [];

			refreshJobs(vm.query.filters)
				.then(function(_jobs) {
					vm.queryResults.numberOfJobs = _jobs.numberOfJobs;

					vm.queryResults.jobs = _jobs.list;
				});
		}


		var _loadMoreJobs = function() {
			if (vm.queryResults.numberOfJobs > vm.queryResults.jobs.length) {

				vm.query.filters.pagination.max = 15;
				vm.query.filters.pagination.start = vm.queryResults.jobs.length;

				refreshJobs(vm.query.filters)
					.then(function(_jobs) {
						vm.queryResults.jobs = vm.queryResults.jobs.concat(_jobs.list);
						console.log(vm.queryResults.jobs);
					});
			}
		}

		var _changeJobViewStyle = function(view) {
			vm.activeJobView = view;

		}


		/* -- Map View functionalities --*/



		/* -- Map View functionalities --*/


		$rootScope.$on('refreshJobsList', function() {
			vm.query = filterService.query.get();
			refreshResult(vm.query.filters);
		});


		/*Function Decelaration*/

		vm.letActiveSkill = _letActiveSkill;
		vm.letRemoveSkill = _letRemoveSkill;
		vm.setTitle = _setTitle;
		vm.loadMoreJobs = _loadMoreJobs;
		vm.setSalary = _setSalary;
		vm.changeJobViewStyle = _changeJobViewStyle;
		vm.viewStateInfo = _viewStateInfo;


	}
]);