/**
 * Created by kashif on 8/18/14.
 */
dashboard.filter('selectedTags', function() {
    return function(tasks, tags) {
        return tasks.filter(function(task) {
            for (var i in task.Tags) {
                if (tags.indexOf(task.Tags[i]) !== -1) {
                    return true;
                }
            }
            return false;

        });
    };
});
