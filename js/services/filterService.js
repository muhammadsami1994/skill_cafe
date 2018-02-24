dashboard.service('filterService', ['$localStorage', function($localStorage) {

	var query = {

	};

	return {
		query: {
			set: _setQuery,
			get: _getQuery,
			add: _addQuery
		},
		queryConstructor: _queryConstructor
	};


	/* --------------------------------------------- */
	/* -- All Function Decelaration & Defination -- */
	/* ------------------------------------------- */

	function _setQuery(data) {

		$localStorage.set('skill_cafe_query', data);

	};

	function _getQuery() {

		query = $localStorage.get('skill_cafe_query');
		return query;

	}

	function _addQuery() {

	}


	function _queryConstructor(location, title, skills) {
		this.filters = {
			'filter-title': [{
				title: title
			}],
			'filter-location': [{
				location: location,
				nearbydist: '100mi'
			}],
			'filter-skills': [{
				skills: skills
			}],
			"filter-salary": [{}],
			"pagination": {
				"start": 0,
				"max": 0
			},

		}
	};


}]);