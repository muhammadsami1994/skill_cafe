dashboard.factory('usaMapDataService', [
	'UserService', 'filterService', '_',

	function(UserService, filterService, _) {

		var _data_default = {

			"AZ": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'AZ'
			},
			"CO": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'CO'
			},
			"DE": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'DE'
			},
			"FL": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'FL'
			},
			"GA": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'GA'
			},
			"HI": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'HI'
			},
			"ID": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'ID'
			},
			"IL": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'IL'
			},
			"IN": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'IN'
			},
			"IA": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'IA'
			},
			"KS": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'KS'
			},
			"KY": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'KY'
			},
			"LA": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'LA'
			},
			"MD": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'MD'
			},
			"ME": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'ME'
			},
			"MA": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'MA'
			},
			"MN": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'MN'
			},
			"MI": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'MI'
			},
			"MS": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'MS'
			},
			"MO": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'MO'
			},
			"MT": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'MT'
			},
			"NC": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'NC'
			},
			"NE": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'NE'
			},
			"NV": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'NV'
			},
			"NH": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'NH'
			},
			"NJ": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'NJ'

			},
			"NY": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'NY'
			},
			"ND": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'ND'
			},
			"NM": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'NM'
			},
			"OH": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'OH'
			},
			"OK": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'OK'
			},
			"OR": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'OR'
			},
			"PA": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'PA'
			},
			"RI": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'RI'
			},
			"SC": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'SC'
			},
			"SD": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'SD'
			},
			"TN": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'TN'
			},
			"TX": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'TX'
			},
			"UT": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'UT'
			},
			"WI": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'WI'
			},
			"VA": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'VA'
			},
			"VT": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'VT'
			},
			"WA": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'WA'
			},
			"WV": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'WV'
			},
			"WY": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'WY'
			},
			"CA": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'CA'
			},
			"CT": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'CT'
			},
			"AK": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'AK'
			},
			"AR": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'AR'
			},
			"AL": {
				'fillKey': 'defaultFill',
				jobs: NaN,
				id: 'AL'
			}

		};

		var _data = _data_default;

		var __query__ = new filterService.queryConstructor();

		// CoreStates  CA, WA, NY, TX, FL,IL
		var __coreColors = [
			'veryHigh',
			'high',
			'average',
			'considerable',
			'low',
			'veryLow'
		];

		var coreStates = [{
			id: 'CA',
			name: 'California',
			lat: 36.778259,
			lng: -119.417931
		}, {
			id: 'WA',
			name: 'Washington',
			lat: 38.889931,
			lng: -77.009003
		}, {
			id: 'NY',
			name: 'New York',
			lat: 40.792240,
			lng: -73.138260
		}, {
			id: 'TX',
			name: 'Texas',
			lat: 29.209684,
			lng: -99.786171
		}, {
			id: 'FL',
			name: 'Florida',
			lat: 25.858244,
			lng: -81.385071
		}, {
			id: 'IL',
			name: 'Illinois',
			lat: 41.882599,
			lng: -87.620514
		}];

		var _setCoreStateColors = function(stateArray, count) {

			/* -- Refresh Jobs accourding to nearJobs -- */
			__query__.filters['filter-location'][0].location = {
				name: stateArray[count].name,
				lat: stateArray[count].lat,
				lon: stateArray[count].lng,
				country: {
					country_code: "US",
					name: "United States"
				},
				state: {
					name: stateArray[count].name,
					state_code: stateArray[count].id
				}
			}

			UserService.refreshJobsNearBy(__query__.filters)
				.then(function(_jobs) {


					stateArray[count].jobs = _jobs.data.json.totalResults;


					if (count < stateArray.length - 1) {
						_setCoreStateColors(stateArray, ++count);
					} else {
						console.log(" ******************** ");

						var sortedStateName = _.pluck(_.sortBy(stateArray, 'jobs'), 'id');

						stateArray.forEach(function(__state_item__) {
							var _levelIndex = sortedStateName.indexOf(__state_item__.id);

							if (_levelIndex >= 0) {
								_data[__state_item__.id].jobs = __state_item__.jobs;
								_data[__state_item__.id]['fillKey'] = __coreColors[_levelIndex];
							}

						});


						console.log(" ******************** ");
					}
				});
		};


		return {
			get: function() {
				return _data;
			},
			set: function(id, key, value) {
				_data[id][key] = value;
			},
			reset: function() {
				_data = _data_default;
				return _data;
			},
			initilizeColoring: function() {
				_setCoreStateColors(coreStates, 0);
			}
		}
	}
])