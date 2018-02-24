/**
 * Created by mohammad on 10-Feb-16.
 */
dashboard.controller('modalFilterController', [
    'ApiService', 'filterService', '$rootScope',
    function(ApiService, filterService, $rootScope) {
        console.log('modal filter controller loaded');
        var vm = this,
            activeSkills = [];

        vm.filterQuery = filterService.query.get() || new filterService.queryConstructor();

        vm.filters = ApiService.getHomeFilters();



        if (vm.filterQuery.filters['filter-location'][0].location) {
            vm.filters.list[0].location = vm.filterQuery.filters['filter-location'][0].location;
            vm.filters.list[0].inputValue = vm.filterQuery.locationName;
            angular.element('.pac-container:nth-child(2)').addClass('pac-container-dup');
        }

        if (vm.filterQuery.filters['filter-title'][0].title) {
            vm.filters.list[1].inputValue = vm.filterQuery.filters['filter-title'][0].title;
        }

        if (vm.filterQuery.filters['filter-skills'][0].skills) {
            vm.filters.skill.callback_results = vm.filterQuery.filters['filter-skills'][0].skills;
        }



        function _searchJob() {
            activeSkills = [];
            if (vm.filters.list[0].inputValue.length == 0) {
                vm.filters.list[0].location = {};
            }
            vm.filterQuery.filters['filter-location'][0].location = vm.filters.list[0].location;
            vm.filterQuery.filters['filter-title'][0].title = vm.filters.list[1].title = vm.filters.list[1].inputValue;


            vm.filters.skill.callback_results.forEach(function(_item) {
                if (_item.active) {
                    activeSkills.push(_item);
                }
            });


            vm.filterQuery.filters['filter-skills'][0].skills = activeSkills;

            vm.filterQuery.locationName = vm.filters.list[0].inputValue;
            filterService.query.set(vm.filterQuery);


            if ($rootScope.homeSearchView != "./partials/user/home/components/job-list-view.html") {
                $rootScope.homeSearchView = "./partials/user/home/components/job-list-view.html";
            } else {
                $rootScope.$emit('refreshJobsList');
            }



        }


        vm.searchJob = _searchJob;


    }
]);