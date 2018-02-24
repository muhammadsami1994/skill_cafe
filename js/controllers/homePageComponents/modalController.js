dashboard.controller('modalCtrl', [
    '$scope','modalService','$timeout',
    function($scope,modalService,$timeout) {
        console.log('modal controller loaded');
        var modalData = modalService.get();
        $scope.modalInstance = modalData.modal;
        $scope.modalType = modalData.type;


        $scope.ok = function () {
            debugger;
            /*$modalInstance.close($scope.selected.item);*/
                $scope.modalInstance.hide();
        };
        /*$timeout(function(){
         modalInstance.destroy()
         },10000);*/
        /*$scope.items = items;
         $scope.selected = {
         item: $scope.items[0]
         };

         $scope.ok = function () {
         $modalInstance.close($scope.selected.item);
         };

         $scope.cancel = function () {
         $modalInstance.dismiss('cancel');
         };*/
    }
]);