 //не используется
angular.module('stationApp')
    .controller('BlocksCtrl', function ($scope, $window, $timeout) {
    var mainModeSwitcherStates = {
        0: "off",
        1: "pc1",
        2: "pc2",
        3: "both"
    };

    $scope.mainModeSwitcherState = mainModeSwitcherStates[0];
    $scope.pc1ModeSwitcherState = 0;
    $scope.pc2ModeSwitcherState = 0;

});
