(function (angular) {
    'use strict';

    angular.module('merp')
        .directive('mSource', mSource);

    function mSource() {
        return {
            restrict: 'E',
            scope: {
                sourceName: '@'
            },
            controller: MSourceController
        };
    }

    function MSourceController($scope, sourceService, ol) {
        if($scope.sourceName) {
            sourceService.addSource($scope.sourceName, new ol.source.OSM());
        }
    }

})(window.angular);