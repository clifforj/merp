(function (angular) {
    'use strict';

    angular.module('merp')
        .factory('sourceService', sourceService);

    function sourceService(promiseUtilService) {

        var sources = {};
        var getSourcePromises = {};

        return {
            addSource: addSource,
            getSource: getSource,
            getSources: getSources
        };

        /*****/

        function addSource(sourceName, source) {
            if(!sources[sourceName]) {
                sources[sourceName] = source;
            }

            promiseUtilService.resolvePromisesByKey(sourceName, source, getSourcePromises);

            return source;
        }

        function getSource(sourceName) {
            if(sourceName) {
                return promiseUtilService.getKeyFromCollectionObject(sourceName, sources, getSourcePromises);
            }
        }

        function getSources() {
            return sources;
        }
    }

})(window.angular);