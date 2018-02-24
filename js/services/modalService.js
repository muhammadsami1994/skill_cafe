dashboard.factory('modalService', function() {
    console.log('modal service loaded');
    var modalType = '';
    var modal = {};
    var _set = function(set,type){
        modalType = type;
        modal = set
   };
    var _get = function () {
        return {
            modal : modal,
            type : modalType
        }
    };
    return {
        set : _set,
        get : _get
    }
});