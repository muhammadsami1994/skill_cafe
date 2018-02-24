/*
 * Created by kashif on 8/14/14.
 */
dashboard.factory('ApiService', ['CafeApi', '_', function(CafeApi, _) {

	var titleAutoComplete = function(filterBox) {

		console.log('TitleAutoComplete ++ ++++ ++ ');

		/*
		 // Autocomplete Search title api
		 var doSearchJobs = debounce(function(filterBox) {
		 query = filterBox.inputValue;
		 console.log(query);

		 CafeApi.jobsAutocomplete(query).then(function(resp) {
		 filterBox.callback_results = resp;
		 });
		 }, 500);

		 doSearchJobs(filterBox);*/

		var query = filterBox.inputValue;
		console.log(query);
		var promise = CafeApi.jobsAutocomplete(query);
		promise.then(function(resp) {
			filterBox.callback_results = resp;
			return filterBox.callback_results;
		});
		return promise;

	};

	var skillAutoComplete = function(filterBox) {

		console.log('TitleAutoComplete ++ ++++ ++ ');

		/*
		 // Autocomplete Search title api
		 var doSearchJobs = debounce(function(filterBox) {
		 query = filterBox.inputValue;
		 console.log(query);

		 CafeApi.jobsAutocomplete(query).then(function(resp) {
		 filterBox.callback_results = resp;
		 });
		 }, 500);

		 doSearchJobs(filterBox);*/

		var query = filterBox.inputValue;
		console.log(query);
		var promise = CafeApi.skillsAutocomplete(query);
		promise.then(function(resp) {

			filterBox.callback_results = [];
			resp.forEach(function(skill) {
				filterBox.callback_results.push({
					active: false,
					name: skill
				});
			});
			return filterBox.callback_results;
		});
		return promise;

	};



	/*var homeFilter = {
		// List of filters to be shown by default
		list: [{
			type: 'filter-location',
			name: "Location",
			active: true,
			placeHolder: "City, state, or country",
			isCollapsed: false,
			inputValue: "",
			location: {},
			defaultValue: "any",
			close: false
		}, {
			type: 'filter-title',
			callback: titleAutoComplete,
			callback_results: [],
			name: "Job Title",
			active: true,
			placeHolder: "Role/Title",
			isCollapsed: true,
			inputValue: "",
			defaultValue: "any",
			close: false
		}, ],

		skill: {
			name: "Skills",
			active: true,
			defaultValue: 'any',
			callback: titleAutoComplete,
			callback_results: [],
			close: false,
			list: [],
			callback: skillAutoComplete,
			callback_results: []
		}
	};*/

	var recruiterFilter = {
		list: [{
				name: "Location",
				active: true,
				placeHolder: "City, state, or country",
				isCollapsed: true,
				inputValue: "",
				location: {},
				defaultValue: "any"
			}, {
				name: "Job Title",
				active: true,
				placeHolder: "Job Title",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any"
			}, {
				name: "Connected to",
				active: false,
				placeHolder: "Connected to",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any"
			}, {
				name: "Starred by",
				active: false,
				placeHolder: "Starred by",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any"
			},
			/*{name:"Status is",active:false,placeHolder:"Status is",isCollapsed:true,inputValue:"",defaultValue:"is high profile"},*/
			{
				name: "Location is",
				active: false,
				placeHolder: "Location is",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any"
			}, {
				name: "Work at",
				active: false,
				placeHolder: "Work at",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any"
			}, {
				name: "Does not work at",
				active: false,
				placeHolder: "Does not work at",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any"
			}, {
				name: "Works at a top company",
				active: false,
				placeHolder: "Works at a top company",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any"
			}, {
				name: "Published a library",
				active: false,
				placeHolder: "Published a library",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any"
			}, {
				name: "Follows GitHub repo",
				active: false,
				placeHolder: "Follows GitHub repo",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any"
			}, {
				name: "Contributed to GitHub repo",
				active: false,
				placeHolder: "Contributed to GitHub repo",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any"
			}, {
				name: "Follows Twitter account",
				active: false,
				placeHolder: "Follows Twitter account",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any"
			}
		],
		skill: {
			name: "Skill",
			active: true,
			defaultValue: 'any',
			list: [

			]
		},
		addSkill: {
			name: "Soft Skills",
			defaultValue: 'any',
			active: false,
			list: [{
				name: "Team Player",
				active: false
			}, {
				name: "Organized",
				active: false
			}, {
				name: "Decisive",
				active: false
			}, {
				name: "Plays Guitar",
				active: false
			}, {
				name: "Opininated",
				active: false
			}]
		},
		status: {
			name: 'Status is',
			active: false,
			list: [{
				name: "Active"
			}, {
				name: "Passive"
			}, {
				name: "Not available"
			}],
			selectValue: "",
			isCollapsed: true,
			defaultValue: "any"
		},
		isHighProfile: {
			name: "Is High Profile",
			selectValue: false,
			isCollapsed: true,
			active: false
		},
		workAtTopCompany: {
			name: "Work At Top Company",
			selectValue: false,
			isCollapsed: true,
			active: false
		}
	};

	//    var analyticsFilter = {
	//        // List of filters to be shown by default
	//        list: [
	//            {type: 'filter-location', name: "Location", active: true, placeHolder: "City, state, or country", isCollapsed: true, inputValue: "", location: {}, defaultValue: "any", close: false},
	//            {type: 'filter-title', callback: titleAutoComplete, callback_results: [], name: "Job Title", active: true, placeHolder: "Role/Job Title", isCollapsed: true, inputValue: "", defaultValue: "", close: false},
	//        ]
	//    };

	var analyticsCareerFilter = {
		list: [{
			type: 'filter-title',
			callback: titleAutoComplete,
			callback_results: [],
			name: "Career Step",
			active: true,
			placeHolder: "Role/Job Title",
			isCollapsed: true,
			inputValue: "",
			defaultValue: "",
			close: false
		}]
	};

	var jobseeker_dashboard = {
		addSkill: {
			name: "Add Skill",
			active: true,
			list: [

			]
		},
		softSkill: {
			name: "Soft Skill",
			active: true,
			list: [{
					name: "Leadership",
					active: false,
					description: ""
				}, {
					name: "Team Player",
					active: false,
					description: ""
				}, {
					name: "Negotiations",
					active: false,
					description: ""
				}, {
					name: "Communication",
					active: false,
					description: ""
				},

			]
		}
	};

	var dummyUser = [],
		talent = [],
		activity = [],
		filterList = [],
		projectList = [],
		getUser = function() {
			dummyUser = [{
				id: 1,
				name: "Coty Beasley",
				subName: "Beasley Creative",
				profilePicture: "./img/person-avatar.png",
				company: "National Association of Insurance",
				bio: "UX Designer, Front-End Developer, Creative Coder, and Startup Guy. Oh, and i love my getgets",
				skill: {
					role: {
						description: "UX Designer, Front-End Developer, Creative Code...",
						status: "Top open source contributor"
					},
					plateform: {
						description: "JavaScript, Ruby",
						status: "Popular Developer"
					}
				},
				socialLinks: {
					github: "github.com/beacrea",
					twitter: "twitter.com/beacrea",
					chain: "github.com/beacrea",
					location: "Kansas City, MO,USA",
					linkedin: "linkedin.com/cbeasly0",
					email: "coty@cotybeasley.name"
				}
			}, {
				id: 2,
				name: "Jon Stuebe",
				subName: "Beasley Creative",
				profilePicture: "./img/person-avatar.png",
				company: "National Association of Insurance",
				bio: "UX Designer, Front-End Developer, Creative Coder, and Startup Guy. Oh, and i love my getgets",
				skill: {
					role: {
						description: "web developer and huge fan of laravel,ruby,an...",
						status: ""
					},
					plateform: {
						description: "Javascript, Ruby, PHP",
						status: ""
					}
				},
				socialLinks: {
					github: "github.com/jonstuebe",
					twitter: "twitter.com/jonstube",
					chain: "github.com/beacrea",
					location: "Tempe,AZ,USA",
					linkedin: "linkedin.com/pub/jon-stuebe/33/420/ab2",
					email: "jstuebe@gmail.com"
				}

			}, {
				id: 3,
				name: "Aanand Prasad",
				subName: "Aanand Prasad",
				profilePicture: "./img/person-avatar.png",
				company: "National Association of Insurance",
				bio: "UX Designer, Front-End Developer, Creative Coder, and Startup Guy. Oh, and i love my getgets",
				skill: {
					role: {
						description: "UX Designer, Front-End Developer, Creative Code...",
						status: "Top open source contributor"
					},
					plateform: {
						description: "UX Designer, Front-End Developer, Creative Code...",
						status: "Popular Developer"
					}
				},
				socialLinks: {
					github: "github.com/aanand",
					twitter: "twitter.com/aanand",
					chain: "github.com/aanand",
					location: "Kansas City, MO,USA",
					linkedin: "linkedin.com/aanand",
					email: "aanand@cotybeasley.name"
				}
			}];
			return dummyUser;
		},
		setUser = function() {
			return dummyUser;
		},

		getRecentSearch = function() {
			talent = [{
				name: "Microsoft",
				role: "C# developer",
				location: "Seattle, WA, US"
			}, {
				name: "Amazon",
				role: "Development Manager",
				location: "Bellevue, WA, US"
			}, {
				name: "Sumtotal",
				role: "Director of Support",
				location: "Seattle, WA, US"
			}];
			return talent;
		},
		getTalent = function() {
			talent = [{
				name: "Vitaly Tatarintsev",
				role: "Ruby developer",
				location: "Kharkiv, Kharkiv Oblast, Ukraine"
			}, {
				name: "Liangjun jiang",
				role: "Ruby developer",
				location: "Kharkiv, Kharkiv Oblast, Ukraine"
			}, {
				name: "Tejas",
				role: "Ruby developer",
				location: "Kharkiv, Kharkiv Oblast, Ukraine"
			}];
			return talent;
		},
		setTalent = function() {
			return talent;
		},
		getActivity = function() {
			activity = [{
				message: "James wrote a note on Long's profile",
				time: "3d"
			}, {
				message: "James wrote a note on Long's profile",
				time: "3d"
			}, {
				message: "James wrote a note on Long's profile",
				time: "3d"
			}, {
				message: "James wrote a note on Long's profile",
				time: "3d"
			}, {
				message: "James wrote a note on Long's profile",
				time: "3d"
			}];
			return activity;
		},
		setActivity = function() {
			return activity;
		},
		getDashBoardFilter = function() {
			var filter = {};
			filter.list = [{
				name: "",
				active: true,
				placeHolder: "City, state, or country",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "anywhere"
			}, {
				name: "Connected to",
				active: false,
				placeHolder: "Connected to",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any Connected to"
			}, {
				name: "Starred by",
				active: false,
				placeHolder: "Starred by",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any Starred by"
			}, {
				name: "Status is",
				active: false,
				placeHolder: "Status is",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "active is high profile"
			}, {
				name: "Location is",
				active: false,
				placeHolder: "Location is",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any Location is"
			}, {
				name: "Work at",
				active: false,
				placeHolder: "Work at",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any Work at"
			}, {
				name: "Does not work at",
				active: false,
				placeHolder: "Does not work at",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any Does not work at"
			}, {
				name: "Works at a top company",
				active: false,
				placeHolder: "Works at a top company",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any work at a top company"
			}, {
				name: "Is high profile",
				active: false,
				placeHolder: "Is high profile",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "Selected"
			}, {
				name: "Published a library",
				active: false,
				placeHolder: "Published a library",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any Publish library"
			}, {
				name: "Follows GitHub repo",
				active: false,
				placeHolder: "Follows GitHub repo",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any Follows GitHub repo"
			}, {
				name: "Contributed to GitHub repo",
				active: false,
				placeHolder: "Contributed to GitHub repo",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any Contributed to GitHub repo"
			}, {
				name: "Follows Twitter account",
				active: false,
				placeHolder: "Follows Twitter account",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any Follow Twitter account"
			}];
			filter.skill = {
				name: "Skill",
				active: true,
				list: [

				]
			};
			filter.hasSkill = {
				name: "Has Skill",
				active: false,
				list: [

				]
			};
			return filter;
		},
		setFilterList = function() {
			return filterList;
		},
		getProjects = function() {
			projectList = [{
					name: "AnglingTechnologiesVideoLightBox",
					description: "AnglingTechnologiesVideoLightBox",
					platform: "",
					assigned: []

				}, {
					name: "AnglingTechnologiesVideoLightBox",
					description: "AnglingTechnologiesVideoLightBox",
					platform: "",
					assigned: []

				}, {
					name: "AnglingTechnologiesVideoLightBox",
					description: "AnglingTechnologiesVideoLightBox",
					platform: "",
					assigned: []

				}, {
					name: "AnglingTechnologiesVideoLightBox",
					description: "AnglingTechnologiesVideoLightBox",
					platform: "",
					assigned: []

				}

			];
			return projectList;
		},
		getRecruiterFilters = function() {
			return recruiterFilter;
		},

		getHomeFilters = function() {
			return new appFilters();
		},
		getRecruiterSideLinks = function() {
			return [{
				name: "Learn more",
				children: [{
					name: "What is Piwik?",
					url: "#"
				}, {
					name: "Features",
					url: "#"
				}, {
					name: "Integrations",
					url: "#"
				}, {
					name: "Log Analytic",
					url: "#"
				}, {
					name: "Road map",
					url: "#"
				}, {
					name: "Changelog",
					url: "#"
				}, {
					name: "Enterprise",
					url: "#"
				}]

			}, {
				name: "Community",
				children: [{
						name: "Forums",
						url: "#"
					}, {
						name: "Get Involved",
						url: "#"
					}, {
						name: "Translators",
						url: "#"
					}, {
						name: "Developers",
						url: "#"
					}, {
						name: "Contact the team",
						url: "#"
					}

				]

			}]

		},
		getAnalyticsFilters = function() {
			return analyticsFilter;
		},
		getAnalyticsCareerFilter = function() {
			return analyticsCareerFilter;
		},
		getJobAnalytics = function() {
			var jobAnalytics = [{
				analyticsTitle: "What's missing",
				analyticsMessage: "Find your skill Gaps"
			}, {
				analyticsTitle: "What's hot",
				analyticsMessage: "Skill that are hot in the market"
			}, {
				analyticsTitle: "What's next",
				analyticsMessage: "What is next in my career"
			}];
			return jobAnalytics;
		},
		getProfileDetails = function() {
			var dummyProfile = {
				id: 1,
				template: {
					type: 'profile',
					properties: [{
						'key': 'jobtitle',
						'value': {
							text: ''
						}
					}, {
						'key': 'jobspec',
						'value': {
							text: 'Specification of job'
						}
					}, {
						'key': 'jobdesc',
						'value': {
							text: 'short Job description'
						}
					}, {
						'key': 'video',
						'value': {
							text: 'intro',
							url: 'https://www.youtube.com/embed/vhapRAwfGNQ'
						}
					}, {
						'key': 'requirement',
						'value': {
							text: 'Lorem ipsum cat in the box...'
						}
					}, {
						'key': 'skills',
						'value': {
							name: 'Photoshop',
							strength: 100
						}
					}, {
						'key': 'image',
						'value': {
							alt: 'Hello',
							url: 'http://helloworld.com/image/560.jpg'
						}
					}]

				}
			};

			return dummyProfile;
		},
		getSearchData = function() {
			var searchData = [

				{
					workingAt: "Developer at Great Company",
					location: "SANFRANCISCO,CALIFORNIA",
					Buttons: ['HTML', 'CSS', 'JAVASCRIPT'],
					type: "A"
				}, {
					workingAt: "Developer at Great Company",
					location: "SANFRANCISCO,CALIFORNIA",
					Buttons: ['HTML', 'CSS', 'JAVASCRIPT'],
					type: "A"
				}, {
					workingAt: "Developer at Great Company",
					location: "SANFRANCISCO,CALIFORNIA",
					Buttons: ['HTML', 'CSS', 'JAVASCRIPT'],
					type: "B"
				}, {
					workingAt: "Developer at Great Company",
					location: "SANFRANCISCO,CALIFORNIA",
					Buttons: ['HTML', 'CSS', 'JAVASCRIPT'],
					type: "B"
				}
			];
			return searchData;
		},

		getUserInfo = function() {
			var userInfo = [{
				userTitle: "Max CountryMan",
				userDescription: "Python Developer at Litl"
			}, {
				userTitle: "Dhamodaran Subramanian",
				userDescription: "Python developer"
			}, {
				userTitle: "Brad Oyler",
				userDescription: "Javascript developer"
			}];
			return userInfo;
		},
		getJobSeekerDashboard = function() {
			return jobseeker_dashboard;
		};


	function appFilters() {
		this.list = [{
				type: 'filter-location',
				name: "Location",
				active: true,
				placeHolder: "City, state, or country",
				isCollapsed: false,
				inputValue: "",
				location: {},
				defaultValue: "any",
				close: false
			}, {
				type: 'filter-title',
				callback: titleAutoComplete,
				callback_results: [],
				name: "Job Title",
				active: true,
				placeHolder: "Role/Title",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any",
				close: false
			}],

			this.skill = {
				name: "Skills",
				active: true,
				defaultValue: 'any',
				callback: titleAutoComplete,
				callback_results: [],
				close: false,
				list: [],
				callback: skillAutoComplete,
				callback_results: []
			}
	}


	var filterConstructor = function(type) {
		if (type == 'location') {
			this.location = {
				type: 'filter-location',
				name: "Location",
				active: true,
				placeHolder: "City, state, or country",
				isCollapsed: false,
				inputValue: "",
				location: {},
				defaultValue: "any",
				close: false
			}
		} else if (type == 'title') {
			this.title = {
				type: 'filter-title',
				callback: titleAutoComplete,
				callback_results: [],
				name: "Job Title",
				active: true,
				placeHolder: "Role/Title",
				isCollapsed: true,
				inputValue: "",
				defaultValue: "any",
				close: false
			}

		} else if (type == 'skills') {
			this.skills = {
				name: "Skills",
				active: true,
				defaultValue: 'any',
				callback: titleAutoComplete,
				callback_results: [],
				close: false,
				list: [],
				callback: skillAutoComplete,
				callback_results: []
			}
		}
	}

	return {
		getUser: getUser,
		setUser: setUser,
		getRecentSearch: getRecentSearch,
		getTalent: getTalent,
		setTalent: setTalent,
		getActivity: getActivity,
		setActivity: setActivity,
		getDashBoardFilter: getDashBoardFilter,
		setFilterList: setFilterList,
		getProjects: getProjects,
		getHomeFilters: getHomeFilters,
		getRecruiterFilters: getRecruiterFilters,
		getRecruiterSideLinks: getRecruiterSideLinks,
		getJobAnalytics: getJobAnalytics,
		getJobSeekerDashboard: getJobSeekerDashboard,
		getUserInfo: getUserInfo,
		getSearchData: getSearchData,
		getProfileDetails: getProfileDetails,
		getAnalyticsFilters: getAnalyticsFilters,
		getAnalyticsCareerFilter: getAnalyticsCareerFilter,
		filterConstructor: filterConstructor
	};

}]);