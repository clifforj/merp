describe('source directive', function() {
    var $compile, source, sourceController, scope, sourceService;

    beforeEach(inject(function($rootScope, _$compile_, _sourceService_) {
        sourceService = _sourceService_;

        $compile = _$compile_;
        spyOn(sourceService, 'addSource');

        scope = $rootScope.$new();

        source = $compile(angular.element('<m-source source-name="mySource"></m-source>'))(scope);
        scope.$digest();

        sourceController = source.controller('mSource');
    }));

    it('should attempt to add a named source', function () {
        expect(sourceService.addSource).toHaveBeenCalledTimes(1);
        expect(sourceService.addSource.calls.mostRecent().args[0]).toMatch('mySource');
    });

    it('should attempt to add a vector source if a url is specified', function () {
        source = $compile(angular.element('<m-source source-name="mySource" source-type="vector"></m-source>'))(scope);
        scope.$digest();

        expect(sourceService.addSource.calls.mostRecent().args[1]).toBeUndefined();

        source = $compile(angular.element('<m-source source-name="mySource" source-type="vector" source-url="blah"></m-source>'))(scope);
        scope.$digest();

        expect(sourceService.addSource.calls.mostRecent().args[1] instanceof ol.source.Vector).toBeTruthy();
    });

    it('should not attempt to add a layer with no name', function () {
        $compile(angular.element('<m-source></m-source>'))(scope);
        scope.$digest();
        
        expect(sourceService.addSource).toHaveBeenCalledTimes(1); // called once from the 'beforeEach'
    });
});