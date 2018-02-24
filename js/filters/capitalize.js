/**
 * Created by webashlar-ubuntu1 on 4/9/14.
 */
dashboard.filter('capitalize', function() {
    return function(input, scope) {
        if (input!== null) {
            input = input.toLowerCase();
        }
        return input.substring(0,1).toUpperCase()+input.substring(1);
    };
});