dashboard.service('UserService', ['$q', '$http', '$state', 'CafeApi', 'ApiService', '_', function($q, $http, $state, CafeApi, ApiService, _) {
	OAuth.initialize('lT6DXQhDmah0XLr7inBZWHHjUhc');

	var loadJobsFromStorage = function() {
		var jobs_storage = {};
		if (window.localStorage['skillcafe.jobs']) {
			jobs_storage = window.localStorage['skillcafe.jobs'];
			jobs_storage = angular.fromJson(jobs_storage);
		}

		var jobs = {
			match: {
				filters: [],
				results: {
					/*json result that came from our server*/
					response: 'success',
					json: {
						'total': 0,
						'hits': {
							'hits': []
						},
						'aggregations': []
					}
				}
			},

			nearby: {
				data: [],
				nearby_marks: [],
				user_skills: '',
				skills_filter: ''
			},
			world: {
				data: [],
				world_marks: [],
				user_skills: '',
				skills_filter: ''
			},
			hotskills: {
				data: {
					jobs: [],
					skills: []
				}
			},
			hottitles: {
				data: {
					jobs: [],
					titles: []
				}
			},
			careersteps: {
				data: []
			}
		};

		angular.extend(jobs, jobs_storage);
		return jobs;
	};

	var loadFromStorage = function() {
		if (window.localStorage['skillcafe.user']) {
			user = window.localStorage['skillcafe.user'];
			user = angular.fromJson(user);

			console.log('Found user in localstorage', user);
			return user;
		}

		return {
			isLoggedIn: false
		};
	};

	var changed_fields = {};
	var user = {
		isLoggedIn: false
	};
	var jobs = {};

	var initLastQuery = function initLastQuery() {
		if (!user.lastquery) {
			user.lastquery = {
				title: user.currentjob,
				locations: [{
					'name': user.location
				}],
				skills: user.skills
			};
		}

		if (!user.lastquery.skills) {
			user.lastquery.skills = user.skills;
		}

		if (!user.lastquery.title) {
			user.lastquery.title = user.currentjob;
		}

		if (!user.lastquery.locations) {
			user.lastquery.locations = [user.location];
		}

		console.log('init last query', user.lastquery);
	};



	var login = function(provider) {

		if (user.isLoggedIn) {
			console.log('User is already logged in, check the token and return');
		}

		CafeApi.login(provider, user);
	};

	var logout = function() {
		user.isLoggedIn = false;
		console.log('user.isloggedIn', user.isLoggedIn);

		CafeApi.logout(user);
		saveState();
	};

	var get = function() {
		return user;
	};


	/* Fire after a second, hopefully things will collate*/
	var doSave = function() {
		// reset changed_fields
		var true_changed_fields = changed_fields;
		console.log('true changed fields: ', true_changed_fields);
		changed_fields = {};
		CafeApi.saveUserInfo(user, true_changed_fields);
	};


	var saveState = function() {
		window.localStorage['skillcafe.user'] = angular.toJson(user);
		window.localStorage['skillcafe.jobs'] = angular.toJson(jobs);
	};

	var save = function(field) {

		changed_fields[field] = field;
		console.log(changed_fields);

		//todo send to server is a best effort strategy.
		//if it fails, we try again from localstorage.
		//keep stuff in localstorage as well.
		window.localStorage['skillcafe.user'] = angular.toJson(user);

		doSave();
	};

	var getJobs = function() {
		return jobs;
	};

	var refreshJobsNearBy = function(filters) {
		console.log('filters in refreshjobnearby......', filters)

		var promise = CafeApi.getJobsNearBy(user, filters);
		promise.success(function(data) {

			data = angular.fromJson(data);
			var i = 0;
			var nearby_marks = [];
			for (; i < data.length;) {
				var loc = data[i];
				nearby_marks[i] = {
					latLng: [loc.lat, loc.lon],
					name: loc.city
				};
				i = i + 1;
			}
			jobs.nearby.data = data;
			jobs.nearby.nearby_marks = nearby_marks;

		});

		return promise;

	};

	var refreshJobsWorld = function(filters) {

		var promise = CafeApi.getJobsWorld(user, filters);
		promise.success(function(data) {

			data = angular.fromJson(data);
			var i = 0;
			var world_marks = [];
			for (; i < data.length;) {
				var loc = data[i];
				world_marks[i] = {
					latLng: [loc.lat, loc.lon],
					name: loc.city
				};
				i = i + 1;
			}
			jobs.world.data = data;
			jobs.world.world_marks = world_marks;

			console.log('world cities to work', jobs.world);

		});

	};

	var getHotSkills = function(filters) {

		var promise = CafeApi.getHotSkills(user, filters);
		promise.success(function(data) {
			data = angular.fromJson(data);
			return data;
		});

		return promise;

	};

	var getHotTitles = function(filters) {

		var promise = CafeApi.getHotTitles(user, filters);
		promise.success(function(data) {
			data = angular.fromJson(data);
			return data;
		});

		return promise;

	};
	var getTopCities = function(filters) {

		var promise = CafeApi.getTopCities(user, filters);
		promise.success(function(data) {
			data = angular.fromJson(data);
			return data;
		});

		return promise;

	};


	var getCareerSteps = function(filters) {

		var promise = CafeApi.getCareerSteps(user, filters);
		promise.success(function(data) {

			data = angular.fromJson(data);
			jobs.careersteps.data = data;
			console.log('career steps ', jobs.careersteps);
		});

	};

	var matchJobs = function(filters) {

		jobs.match.filters = filters;
		/*jobs.match.results = [];*/

		var promise = CafeApi.matchJobs(user, filters) // then() called when son gets back
			.then(function(data) {
				// promise fulfilled
				var results = data.data;
				console.log('Got some jobs', results);

				if (results && results.json && results.json.hits && results.json.hits.hits) {
					//console.log('Convert csv to skills');
					for (var k = 0; k < results.json.hits.hits.length; ++k) {
						var one = results.json.hits.hits[k];

						if (one && one._source && one._source.skills)
							one._source.skills = one._source.skills.split(',');
					}
				}

				jobs.match.results = data.data;

			}, function(error) {
				// promise rejected, could log the error with: console.log('error', error);
				console.log('Oopsie error returned from server');
			});

		return promise;
	};

	var titleAutoComplete = function(query) {

		var promise = CafeApi.jobsAutocomplete(query);
		promise.then(function(resp) {
			return resp;
		});
		return promise;
	};
	var skillAutoComplete = function(query) {

		var promise = CafeApi.skillsAutocomplete(query);
		promise.then(function(resp) {
			return resp;
		});
		return promise;
	};
	var softSkillAutoComplete = function(query) {

		var promise = CafeApi.skillsAutocomplete(query);
		promise.then(function(resp) {
			return resp;
		});
		return promise;
	};

	var getJobindex = function() {
		//        var promise = CafeApi.getJobindex(user);
		//        promise.success(function (data) {
		//
		//            data = angular.fromJson(data);
		//            jobs.jobindex = data;
		//            console.log('job index ', jobs.jobindex);
		//        });
		//        return promise;
		results = ["Account Executive", "Account Manager", "Application Architect",
			"Application Developer", "Art Director", "Artist", "BI Architect",
			"Biologist", "BPO Pre Sales", "BPO Process Analyst", "BPO Team Member", "Business Analyst",
			"Business Consultant", "Business Manager", "Caretaker", "Chief Medical Officer", "Cloud Architect",
			"Coach", "Computer Engineer", "Cook", "Costume Designer", "Dance Instructor", "Data Architect", "Data Entry Operator",
			"Data Scientist", "Database Administrator", "Database Developer", "Dentist", "Development Manager", "Economist",
			"Electrical Engineer", "Electrician", "English Teacher", "Events Coordinator", "Finance Director", "Food Scientist",
			"GIS Analyst", "Information Architect", "Legal Counsel", "Marketing Associate", "Medical Assistant", "Metallurgical Engineer",
			"Microbiologist", "Music Composer", "Music Teacher", "Musician", "Network Architect", "Network Engineer", "Network Manager",
			"Nuclear Engineer", "Nurse", "Operations Analyst", "Orthodontist", "Packaging Engineer", "Pathologist", "Payroll Administrator",
			"Performance Analyst", "Periodontist", "Product Manager", "Professor", "Project Engineer", "Project Manager", "Property Manager", "Psychologist",
			"Psychometrist", "Quality Analyst", "Receptionist", "Reporter", "Risk Analyst", "Sales Engineer", "SAP Consultant", "School Counselor",
			"Scientist", "Security Manager", "Software Architect", "Software Development Manager", "Software Engineer", "Software Test Engineer",
			"Software Trainer", "Solution Consultant", "Statistical Analyst", "Supply Chain Analyst", "Supply Chain Manager", "System Analyst",
			"Systems Analyst", "Systems Engineer", "Tax Accountant", "Technical Analyst", "Technical Consultant", "Technical Recruiter",
			"Technical Writer", "Test Engineer", "Training Consultant", "Web Designer", "Web Developer", "Web Producer"
		]
		return results;

	}

	//    var location = function() {
	//        return CafeApi.location(user);
	//    };

	//
	// Constructors
	//
	function attempt_login() {
		console.log('Constructor attempt_login');

		if (user.isLoggedIn) {
			var defer = $q.defer();
			console.log('user is already loggedIn', user);
			defer.resolve(true);
			return defer.promise;
		} else {
			//            return location();
		}

	}

	function match_jobs_constructor() {
		console.log('Constructor match_jobs_constructor');
		var titles = [];
		if (user.isLoggedIn) {
			if (user.currentjob != '') {
				var title = {
					title: user.currentjob
				};
				titles.push(title);
			}
		}
		//        titles.push({title: 'Software Engineer'});

		var empty_filters = {
			'filter-title': titles,
			'filter-location': [],
			'filter-skills': [],
			'filter-age': [{
				age: 30
			}],
			'pagination': {
				start: 0,
				max: 3
			}
		};
		var promise = matchJobs(empty_filters)

		return promise;
	}

	function toString() {
		console.log('UserService::jobs', jobs);
		console.log('UserService::user', user);
	}

	function constructor() {
		console.log('Constructor init');
		return $q.all([
			attempt_login(),
			//                match_jobs_constructor()
		]).then(function(results) {

			// Do stuff after constructor finishes.
			console.log('Constructor finished all constructors calls.');
			var userFiltersOnHomePage = ApiService.getHomeFilters();

			if (user.location && user.location.name !== '') {
				var filter_location = _.findWhere(userFiltersOnHomePage.list, {
					'type': 'filter-location'
				});

				if (filter_location && !filter_location.inputValue) {
					filter_location.inputValue = user.location.name;
					filter_location.location = user.location;
				}
			} else {
				console.log('DAMN LOCATION IS NULL');
			}
			var filter_title = _.findWhere(userFiltersOnHomePage.list, {
				'type': 'filter-title'
			});
			if (user.isLoggedIn && user.currentjob !== '') {
				filter_title.inputValue = user.currentjob;
			} else {
				filter_title.inputValue = '';
			}
			//                filter_title.inputValue = 'Software Engineer';

			//console.log
			toString();

		});
	}

	function initialize() {
		user = loadFromStorage();
		jobs = loadJobsFromStorage();

		initLastQuery();

		//call the constructor
		constructor();
	}

	initialize();

	return {
		save: save,
		location: location,
		login: login,
		logout: logout,
		get: get,
		initLastQuery: initLastQuery,
		saveState: saveState,
		getJobs: getJobs,
		refreshJobsNearBy: refreshJobsNearBy,
		refreshJobsWorld: refreshJobsWorld,
		matchJobs: matchJobs,
		getHotSkills: getHotSkills,
		getHotTitles: getHotTitles,
		getTopCities: getTopCities,
		getCareerSteps: getCareerSteps,
		titleAutoComplete: titleAutoComplete,
		skillAutoComplete: skillAutoComplete,
		softSkillAutoComplete: softSkillAutoComplete,
		getJobindex: getJobindex
	};

}]);