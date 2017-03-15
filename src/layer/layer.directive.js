(function (angular) {
    'use strict';

    angular.module('merp')
        .directive('mLayer', mLayer);

    function mLayer() {
        return {
            restrict: 'E',
            scope: {
                name: '@',
                source: '@',
                style: '@'
            },
            controller: MLayerController
        };
    }

    function MLayerController($scope) {

    }

})(window.angular);