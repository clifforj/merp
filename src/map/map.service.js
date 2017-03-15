(function (angular) {
    'use strict';

    angular.module('merp')
        .factory('mapService', mapService);

    function mapService() {

        var maps = {};
        var mapOrder = [];

        return {
            createMap: createMap
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

            return map;
        }
    }

})(window.angular);