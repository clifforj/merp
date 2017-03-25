describe('promiseUtil service', function () {
    var promiseUtilService, scope, objectCollection, objectPromises;

    beforeEach(inject(function (_promiseUtilService_, $rootScope) {
        promiseUtilService = _promiseUtilService_;
        scope = $rootScope.$new();
        objectCollection = {
            keyOne: 'boop',
            keyTwo: 'floop'
        };
        objectPromises = {};
    }));

    it('should return objects for a given key if it exists', function () {
        var promiseResult;
        promiseUtilService.getKeyFromCollectionObject('keyOne', objectCollection, objectPromises).then(function (result) {
            promiseResult = result;
        });

        scope.$digest();

        expect(promiseResult).toBe(objectCollection.keyOne);
    });

    it('should resolve outstanding promises when instructed to', function () {
        var promiseResult;
        promiseUtilService.getKeyFromCollectionObject('keyThree', objectCollection, objectPromises).then(function (result) {
            promiseResult = result;
        });

        scope.$digest();

        expect(promiseResult).toBeUndefined();

        objectCollection.keyThree = 'floop';
        promiseUtilService.resolvePromisesByKey('keyThree', objectCollection.keyThree, objectPromises);

        scope.$digest();

        expect(promiseResult).toBe('floop');
    });

    it('should resolve multiple outstanding promises when instructed to', function () {
        var promiseResultOne, promiseResultTwo;
        promiseUtilService.getKeyFromCollectionObject('keyThree', objectCollection, objectPromises).then(function (result) {
            promiseResultOne = result;
        });
        promiseUtilService.getKeyFromCollectionObject('keyThree', objectCollection, objectPromises).then(function (result) {
            promiseResultTwo = result;
        });

        objectCollection.keyThree = 'floop';
        promiseUtilService.resolvePromisesByKey('keyThree', objectCollection.keyThree, objectPromises);

        scope.$digest();

        expect(promiseResultOne).toBe('floop');
        expect(promiseResultTwo).toBe('floop');
    });

});