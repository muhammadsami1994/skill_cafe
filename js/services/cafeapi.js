dashboard.factory('CafeApi', ['$resource', '$http', '$state', '_', '$cookieStore', function($resource, $http, $state, _, $cookieStore) {

    //    var base_url = "http://localhost:8000/api/v1";
    var base_url = "http://52.11.57.232/api/v1";
    //

    /**
     * Retrieve nested item from object/array
     * @param {Object|Array} obj
     * @param {String} path dot separated
     * @param {*} def default value ( if result undefined )
     * @returns {*}
     */
    function createDiff(obj, path, def, destobj) {

        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {

            if (!obj || typeof obj !== 'object') {
                return def;
            }
            obj = obj[path[i]];

            if (i == path.length - 1) {
                destobj[path[i]] = obj;
            } else {
                var newobj;
                if (destobj[path[i]]) {
                    newobj = destobj[path[i]];
                } else {
                    newobj = {};
                }
                destobj[path[i]] = newobj;
                destobj = newobj;
            }
        }

        if (obj === undefined) {
            return def;
        }
        destobj[path[i - 1]] = obj;
        return obj;
    }

    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess(response) {

        return (response.data);

    }


    // I transform the error response, unwrapping the application dta from
    // the API response payload.
    function handleError(response) {

        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.

        //Do something

    }

    //    var location = function (user) {
    //
    //        var token = 'Token ' + user.token;
    //
    //        var headers = {};
    //        if (user.token) {
    //            headers = {'Authorization': token};
    //        }
    //
    //        var promise = $http({
    //            method: 'GET',
    //            url: base_url + '/location/',
    //            headers: headers});
    //
    //        promise.success(function (result) {
    //            angular.extend(user, result);
    //            window.localStorage['skillcafe.user'] = angular.toJson(user);
    //            return result;
    //        });
    //        promise.error(function (result) {
    //            console.log('error from our server ');
    //            user.isLoggedIn = false;
    //        });
    //
    //
    //    };

    //------------------
    // Login Logout
    // -----------------

    var login = function(provider, user) {

        console.log('Login called for: ' + provider);
        user.isLoggedIn = false;
        var promise = OAuth.popup(provider);

        promise.done(function(result) {
            // make API calls
            //use result.access_token in your API request

            var token = 'Token ' + result.access_token;

            if (provider == 'linkedin2') {
                provider = 'linkedin-oauth2';
            } else if (provider == 'google') {
                provider = 'google-oauth2';
            }

            console.log("Success from : " + provider + token);
            var loginPromise = $http({
                method: 'POST',
                url: base_url + '/login/' + provider + '/',
                headers: {
                    'Authorization': token
                }
            });

            loginPromise.success(function(result) {
                console.log('token ' + result.token);
                angular.extend(user, result);
                user.isLoggedIn = true;
                user.experience.positions = angular.fromJson(user.experience.positions);
                window.localStorage['skillcafe.user'] = angular.toJson(user);

                console.log(user);

                //$state.go('app.home');
            });
            loginPromise.error(function(result) {
                console.log('error from our server ');
                user.isLoggedIn = false;
            });

        });

        promise.fail(function(error) {
            // handle errors
            user.isLoggedIn = false;
            console.log('promise failed ' + error);
        });

        return promise;
    };


    var logout = function(user) {
        //TODO: do the real logout

    };

    var getUserInfo = function(user) {

        var token = 'Token ' + user.token;

        var promise = $http({
            method: 'GET',
            url: base_url + '/user/',
            headers: {
                'Authorization': token
            }
        });

        promise.success(function(result) {
            user.isLoggedIn = true;

            console.log('result for user');
            console.log(result);

            result = angular.fromJson(result);
            angular.extend(user, result);
            console.log(user);
        });

        promise.error(function(result) {
            console.log('error from our server for getUserInfo');
            user.isLoggedIn = false;
        });

        return promise;
    };

    var saveUserInfo = function(user, changed_fields) {
        var token = 'Token ' + user.token;

        var data = {};
        for (var key in changed_fields) {
            console.log('Create diff for ' + key);
            if (changed_fields.hasOwnProperty(key)) {
                var value = createDiff(user, key, null, data);
                if (!value) {
                    console.log('ooops, the fantastic routine diff failed for: ' + key);
                }
            }
        }

        console.log('diff data, making the PUT call >> ', data);
        //var data = _.pick(user, _.keys(changed_fields));

        var promise = $http({
            method: 'PUT',
            url: base_url + '/user' + '?partial=' + 'true',
            headers: {
                'Authorization': token
            },
            data: data
        });

        promise.success(function(result) {
            console.log('saved result:', result);
        });
        promise.error(function(result) {
            //Todo: OnError: Broadcast something to retry.
            console.log('error from our server for savingUser');
        });
    };


    //------------------
    // Autocomplete
    // -----------------
    var jobsAutocomplete = function(query) {

        var v = base_url + "/career/autocomplete/?q=" + query;
        var headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };

        var request = $http({
            method: "GET",
            url: v,
            withCredentials: false,
            headers: headers,

            data: {

            }
        });

        return (request.then(handleSuccess, handleError));
    };

    var skillsAutocomplete = function(query) {

        var v = base_url + "/skill/autocomplete/?q=" + query;

        var headers = {
            'Content-Type': 'application/json; charset=utf-8'
        }

        var request = $http({
            method: "GET",
            url: v,
            //withCredentials: true,
            headers: headers,

            data: {

            }
        });

        return (request.then(handleSuccess, handleError));
    };

    var matchJobs = function(user, filters) {

        var v = base_url + "/jobs/match/";

        var headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };

        if (user != null && user.token != null) {
            headers['Authorization'] = user.token
        }

        var data = {
            filters: filters
        };

        var promise = $http({
            method: "POST",
            url: v,
            //withCredentials: true,
            headers: headers,
            data: data
        });

        promise.then(handleSuccess, handleError)
        return promise;
    };

    var getJobsNearBy = function(user, filters) {
        console.log('in getJobsNearBy service');
        var token = 'Token ' + user.token;
        var data = {
            filters: filters
        };
        var promise = $http({
            method: 'POST',
            url: base_url + '/jobs/nearby/',
            data: data,
            headers: {
                'Authorization': token
            }
        });

        promise.success(function(data) {
            console.log('result for jobsNearBy');
            console.log(data);
            data = angular.fromJson(data);
            return data

        });

        promise.error(function(result) {
            console.log('error from our server for getJobsNearBy');
        });

        return promise;
    };

    var getJobsWorld = function(user, filters) {
        console.log('in getJobsWorld service');
        var token = 'Token ' + user.token;
        var data = {
            filters: filters
        };

        var promise = $http({
            method: 'POST',
            url: base_url + '/jobs/world/',
            data: data,
            headers: {
                'Authorization': token
            }
        });

        promise.success(function(data) {
            console.log('result for getJobsWorld');
            //            console.log(data);
            data = angular.fromJson(data);
            return data

        });

        promise.error(function(result) {
            console.log('error from our server for getJobsWorld');
        });

        return promise;
    };

    var getHotSkills = function(user, filters) {
        console.log('in getHotSkills service', filters);
        var token = 'Token ' + user.token;
        var data = {
            filters: filters
        };
        var promise = $http({
            method: 'POST',
            url: base_url + '/jobs/hotskills/',
            data: data,
            headers: {
                'Authorization': token
            }
        });

        promise.success(function(data) {
            console.log('result for jobsHotSkills');
            //            console.log(data);
            data = angular.fromJson(data);
            return data
        });

        promise.error(function(result) {
            console.log('error from our server for getHotSkills');
        });

        return promise;
    };

    var getHotTitles = function(user, filters) {
        console.log('in getHotTitles service', filters);
        var token = 'Token ' + user.token;
        var data = {
            filters: filters
        };
        var promise = $http({
            method: 'POST',
            url: base_url + '/jobs/hottitles/',
            data: data,
            headers: {
                'Authorization': token
            }
        });

        promise.success(function(data) {
            data = angular.fromJson(data);
            return data
        });

        promise.error(function(result) {
            console.log('error from our server for getHotTitles');
        });

        return promise;
    };

    var getCareerSteps = function(user, filters) {
        console.log('in getCareerSteps service', filters);
        var token = 'Token ' + user.token;
        var data = {
            filters: filters
        };
        var promise = $http({
            method: 'POST',
            url: base_url + '/career/nextsteps/',
            data: data,
            headers: {
                'Authorization': token
            }
        });

        promise.success(function(data) {
            console.log('result for getCareerSteps');
            //            console.log(data);
            data = angular.fromJson(data);
            return data

        });

        promise.error(function(result) {
            console.log('error from our server for getHotSkills');
        });

        return promise;
    };


    var getTopCities = function(user, filters) {
        console.log("Getting Top Cites")
        filters['filter-location'][0].location = filters['filter-location'][0].location.state;
        var token = 'Token ' + user.token,
            data = {
                filters: filters
            },
            promise = $http({
                method: 'POST',
                url: base_url + '/jobs/world/',
                data: data,
                headers: {
                    'Authorization': token
                }
            });

        promise.success(function(data) {
            data = angular.fromJson(data);
            return data
        });

        promise.error(function(result) {
            console.log("Error In Getting top cities", result);
        });

        return promise;
    };

    return {
        skillsAutocomplete: skillsAutocomplete,
        jobsAutocomplete: jobsAutocomplete,
        //        location: location,
        login: login,
        logout: logout,
        getUserInfo: getUserInfo,
        saveUserInfo: saveUserInfo,
        matchJobs: matchJobs,
        getJobsNearBy: getJobsNearBy,
        getJobsWorld: getJobsWorld,
        getHotSkills: getHotSkills,
        getHotTitles: getHotTitles,
        getCareerSteps: getCareerSteps,
        getTopCities: getTopCities
    }
}]);