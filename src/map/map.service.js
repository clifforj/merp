(function (angular) {
    'use strict';

    angular.module('merp')
        .factory('mapService', mapService);

    function mapService(promiseUtilService) {

        var maps = {};
        var mapOrder = [];
        var getMapPromises = {};

        return {
            createMap: createMap,
            getMap: getMap
        };

        /*****/

        function createMap(mapName, defaultControls) {
            var map;

            if(defaultControls) {
                map = new ol.Map({
                    controls: ol.control.defaults(),
                    target: mapName
                });
            } else {
                map = new ol.Map({
                    target: mapName,
                    controls: []
                });
            }

            maps[mapName] = map;
            mapOrder.push(map);

            promiseUtilService.resolvePromisesByKey(mapName, map, getMapPromises);

            return map;
        }

        function getMap(mapName) {
            mapName = mapName || 'default';

            return promiseUtilService.getKeyFromCollectionObject(mapName, maps, getMapPromises);
        }
    }

})(window.angular);