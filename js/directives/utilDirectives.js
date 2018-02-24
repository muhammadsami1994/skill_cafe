dashboard.directive('googleplace', function() {
    return {
        require: 'ngModel',
        scope:{
            searchInfo:"=info"
        },
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    var place = scope.gPlace.getPlace();
                    scope.searchInfo.location={name: place.name, lat: place.geometry.location.lat(), lon: place.geometry.location.lng() };
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});



dashboard.directive('googleplace1', function() {
    return {
        require: 'ngModel',
        scope:{
            searchInfo:"=info"
        },
        link: function(scope, element, attrs, model) {

            function getCountry(place)
            {
                var country = '';

                if (!place.address_components)
                    return country;

                for (var i = 0; i < place.address_components.length; i += 1) {
                    var addressObj = place.address_components[i];
                    for (var j = 0; j < addressObj.types.length; j += 1) {
                        if (addressObj.types[j] === 'country') {
                            country = {
                                'name': addressObj.long_name,
                                'country_code': addressObj.short_name
                            };
                        }
                    }
                }

                return country;
            }

            function getState(place)
            {
                var state = '';

                if (!place.address_components)
                    return state;

                for (var i = 0; i < place.address_components.length; i += 1) {
                    var addressObj = place.address_components[i];
                    for (var j = 0; j < addressObj.types.length; j += 1) {
                        if (addressObj.types[j] === 'administrative_area_level_1') {
                            state = {
                                'name': addressObj.long_name,
                                'state_code': addressObj.short_name
                            };
                        }
                    }
                }

                return state;
            }



            var options = {
                'types': ['(regions)'],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    var place = scope.gPlace.getPlace();
                    console.log('location from googleeeeee',place );
                    if (place.address_components) {
                        var country = getCountry(place);
                        var state = getState(place);
                        var location = {
                            name: place.name,
                            lat: place.geometry.location.lat(),
                            lon: place.geometry.location.lng(),
                            state: state,
                            country: country
                        };
                        scope.searchInfo.location = location;
                    } else {

                        // The user pressed enter in the input
                        // without selecting a result from the list
                        // Let's get the list from the Google API so that
                        // we can retrieve the details about the first result
                        // and use it (just as if the user had actually selected it)
                        var autocompleteService = new google.maps.places.AutocompleteService();
                        autocompleteService.getPlacePredictions(
                            {
                                'input': place.name,
                                'offset': place.name.length,
                                // I repeat the options for my AutoComplete here to get
                                // the same results from this query as I got in the
                                // AutoComplete widget
                                'types': ['(regions)']
                            },
                            function listentoresult(list, status) {
                                if (list == null || list.length == 0) {
                                    // There are no suggestions available.
                                    // The user saw an empty list and hit enter.
                                    console.log("No location results from google");
                                    scope.searchInfo.location = {};
                                } else {
                                    // Here's the first result that the user saw
                                    // in the list. We can use it and it'll be just
                                    // as if the user actually selected it
                                    // themselves. But first we need to get its details
                                    // to receive the result on the same format as we
                                    // do in the AutoComplete.
                                    var placesService = new google.maps.places.PlacesService(element[0]);
                                    placesService.getDetails({'reference': list[0].reference},

                                        function detailsresult(detailsResult, placesServiceStatus) {
                                            // Here's the first result in the AutoComplete with the exact
                                            // same data format as you get from the AutoComplete.

                                            place = detailsResult;

                                            var country = getCountry(place);
                                            var state = getState(place);
                                            var location = {
                                                name: place.name,
                                                lat: place.geometry.location.lat(),
                                                lon: place.geometry.location.lng(),
                                                state: state,
                                                country: country
                                            };

                                            scope.searchInfo.inputValue = place.name;
                                            scope.searchInfo.location = location;
                                        }
                                    );
                                }
                            });

                    }
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});