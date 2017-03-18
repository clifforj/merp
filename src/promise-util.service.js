(function (angular) {
    'use strict';

    angular.module('merp')
        .factory('promiseUtilService', promiseUtilService);

    function promiseUtilService($q) {

        return {
            getKeyFromCollectionObject: getKeyFromCollectionObject,
            resolvePromisesByKey: resolvePromisesByKey
        };

        /*****/

        function getKeyFromCollectionObject(key, collectionObject, deferredQueue) {
            var deferred = $q.defer();

            if(collectionObject[key]) {
                deferred.resolve(collectionObject[key]);
            } else {
                if(angular.isArray(deferredQueue[key])) {
                    deferredQueue[key].push(deferred);
                } else {
                    deferredQueue[key] = [deferred];
                }
            }

            return deferred.promise;
        }

        function resolvePromisesByKey(key, resolutionObject, deferredQueue) {
            if(deferredQueue[key]) {
                for(var i = 0; i < deferredQueue[key].length; i++) {
                    deferredQueue[key][i].resolve(resolutionObject);
                }

                delete deferredQueue[key];
            }
        }
    }

})(window.angular);