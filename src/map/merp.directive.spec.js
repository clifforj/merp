describe('merp directive', function() {
    var $compile;
    var merp;
    var merpController;
    var scope;

    beforeEach(inject(function($rootScope, _$compile_) {
        $compile = _$compile_;
        scope = $rootScope.$new();

        merp = $compile(angular.element('<merp></merp>'))(scope);
        scope.$digest();

        merpController = merp.controller('merp');
    }));

    it('should set a default map name', function () {
        expect(merp.isolateScope().mapName).toBe('default');
    });

    it('should set take in a map name', function () {
        var myMap = $compile(angular.element('<merp map-name="myMap"></merp>'))(scope.$new());
        scope.$digest();

        expect(myMap.isolateScope().mapName).toBe('myMap');
    });
});