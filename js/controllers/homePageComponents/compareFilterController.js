dashboard.controller('compareFilterController', [
	'ApiService', 'UserService', '$rootScope', 'compareFilterService', 'filterService',
	function(ApiService, UserService, $rootScope, compareFilterService, filterService) {

		var vm = this,
			filterQuery = compareFilterService.filterQuery.get(),
			activeSkills = {
				c_1: [],
				c_2: []
			};


		vm.filters = {
			location1: new ApiService.filterConstructor('location'),
			location2: new ApiService.filterConstructor('location'),
			title: new ApiService.filterConstructor('title')
		};

		vm.filterResults = compareFilterService.filterResult.get();
		vm.activeTitle = {
			c_1: "",
			c_2: ""
		}



		var letsCompare = function() {


			filterQuery.query1 = new filterService.queryConstructor(vm.filters.location1.location.location, vm.filters.title.title.inputValue, []);
			filterQuery.query2 = new filterService.queryConstructor(vm.filters.location2.location.location, vm.filters.title.title.inputValue, []);



			filterQuery.query1.filters['filter-title'][0].title = vm.filters.title.title.inputValue;
			filterQuery.query2.filters['filter-title'][0].title = vm.filters.title.title.inputValue;
			filterQuery.query1.filters['filter-location'][0].location = vm.filters.location1.location.location

			compareFilterService.filterQuery.set(filterQuery);


			/* -- Getting 1st filter Result -- */
			getContainerResult(filterQuery.query1, function(_filterResults) {

				_filterResults.locationName = filterQuery.query1.filters['filter-location'][0].location.name
				vm.filterResults.c_1 = _filterResults;

				filterQuery.query2.filters['filter-location'][0].location = vm.filters.location2.location.location;

				/* -- Getting 2nd Filter Result -- */
				getContainerResult(filterQuery.query2, function(_filterResults) {
					_filterResults.locationName = filterQuery.query2.filters['filter-location'][0].location.name
					vm.filterResults.c_2 = _filterResults;

					compareFilterService.filterResult.set(vm.filterResults);
					$rootScope.$emit('fix-search-bar-event', true);

					if ($rootScope.homeSearchView != "./partials/user/home/components/compare-filters-result.html") {
						$rootScope.homeSearchView = "./partials/user/home/components/compare-filters-result.html";
					}
				});

			});



		};



		/* Function Defination*/
		var getContainerResult = function(_query, _callBack) {
			var hotSkills = [],
				hotTitles = [],
				numberOfJobs = 0;



			UserService.getHotSkills(_query.filters)
				.then(function(_hotSkills) {

					hotSkills = _hotSkills.data.skills.slice(0, 5);

					return UserService.refreshJobsNearBy(_query.filters);

				}).then(function(_jobs) {
					numberOfJobs = _jobs.data.json.totalResults;

					if (vm.filters.title.title.inputValue.length <= 0) {
						return UserService.getHotTitles(_query.filters)
					} else {
						_callBack({
							hotSkills: hotSkills,
							hotTitles: [],
							numberOfJobs: numberOfJobs
						});
					}

				}).then(function(_hotTitle) {

					hotTitles = _hotTitle.data.titles;

					_callBack({
						hotSkills: hotSkills,
						hotTitles: hotTitles,
						numberOfJobs: numberOfJobs
					});

				});;
		};



		var setFilterAndRefresh = function(containerID, updateField) {
			var queryID = containerID == 'c_1' ? 'query1' : 'query2';
			if (updateField == "skill") {
				filterQuery[queryID].filters['filter-skills'][0].skills = activeSkills[containerID];

				UserService.refreshJobsNearBy(filterQuery[queryID].filters)
					.then(function(_jobs) {
						vm.filterResults[containerID].numberOfJobs = _jobs.data.json.totalResults;


						if (vm.filters.title.title.inputValue.length <= 0) {
							return UserService.getHotTitles(filterQuery[queryID].filters)
						}
					}).then(function(_hotTitle) {
						vm.filterResults[containerID].hotTitle = _hotTitle.data.titles;
					})

			} else if (updateField == 'title') {


				filterQuery[queryID].filters['filter-skills'][0].skills = [];
				filterQuery[queryID].filters["filter-title"][0].title = vm.activeTitle[containerID];
				UserService.getHotSkills(filterQuery[queryID].filters)
					.then(function(_hotSkills) {

						vm.filterResults[containerID].hotSkills = _hotSkills.data.skills.slice(0, 5);

						return UserService.refreshJobsNearBy(filterQuery[queryID].filters);
					})
					.then(function(_jobs) {
						vm.filterResults[containerID].numberOfJobs = _jobs.data.json.totalResults;
					})
			}
		}

		var letActiveSkill = function(containerID, skill) {

			skill.active = true;
			activeSkills[containerID].push(skill);


			setFilterAndRefresh(containerID, 'skill');



		};

		var letDeactiveSkill = function(containerID, skill) {
			skill.active = false;
			var _deactiveIndex = activeSkills[containerID].map(function(item) {
				return item.name;
			}).indexOf(skill.name);

			if (_deactiveIndex >= 0) {
				activeSkills[containerID].splice(_deactiveIndex, 1);
				setFilterAndRefresh(containerID, 'skill');
			}

		}


		var setTitle = function(containerID, title) {
			vm.activeTitle[containerID] = title;
			setFilterAndRefresh(containerID, 'title');
		}



		/* -- For Change view & Search Job -- */

		var searchJobs = function(containerID) {
			var queryID = containerID == 'c_1' ? 'query1' : 'query2';
			var locationInputID = containerID == 'c_1' ? 'location1' : 'location2';

			filterQuery[queryID].locationName = filterQuery[queryID].filters['filter-location'][0].location.name;
			filterQuery[queryID].locationName += ", " + filterQuery[queryID].filters['filter-location'][0].location.state.state_code;
			filterQuery[queryID].locationName += ", " + filterQuery[queryID].filters['filter-location'][0].location.country.name;


			filterService.query.set(filterQuery[queryID]);

			$rootScope.homeSearchView = "./partials/user/home/components/job-list-view.html";

		};

		_hideCompareFilter = {
			isShow: true,
			letHide: function() {
				_hideCompareFilter.isShow = false;
				$rootScope.filterView = './partials/user/home/components/default-filter.html';
			}
		}


		/*All the functions initilization for Angular USE*/
		vm.letsCompare = letsCompare;
		vm.letActiveSkill = letActiveSkill;
		vm.letDeactiveSkill = letDeactiveSkill;
		vm.setTitle = setTitle;
		vm.searchJobs = searchJobs;
		vm.hideCompareFilter = _hideCompareFilter

	}
]);;