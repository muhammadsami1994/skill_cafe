dashboard.service('compareFilterService', [
	function() {
		var filterResult = {
				c_1: {},
				c_2: {}
			},
			filterQuery = {
				query1: {},
				query2: {}
			};

		return {
			filterResult: {
				get: _getFilterResult,
				set: _setFilterResult
			},
			filterQuery: {
				get: _getFilterQuery,
				set: _setFilterQuery
			}
		}


		function _getFilterResult() {
			return filterResult;
		};


		function _setFilterResult(data) {
			filterResult = data;
		}

		function _getFilterQuery() {
			return filterQuery;
		}

		function _setFilterQuery(data) {
			filterQuery = data;
		}

	}

])