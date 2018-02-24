dashboard.factory('$localStorage', function() {
	var _set = function(key, value) {

		value = JSON.stringify(value);
		localStorage.setItem(key, value);
	}
	var _get = function(key) {

		return JSON.parse(localStorage.getItem(key)) || "";
	}

	return {
		set: _set,
		get: _get
	}
});