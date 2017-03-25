describe('source service', function() {
    var scope, sourceService, source;

    beforeEach(inject(function($rootScope, _sourceService_) {
        sourceService = _sourceService_;
        scope = $rootScope.$new();

        source = new ol.source.OSM();
    }));

    describe('addSource', function () {
        it('should add sources to a collection', function () {
            sourceService.addSource('mySource', source);

            scope.$digest();

            expect(sourceService.getSources().mySource).toBeDefined();
        });

        it('should only allow unique source names', function () {
            sourceService.addSource('mySource', source);
            sourceService.addSource('mySource', source);

            scope.$digest();

            expect(sourceService.getSources().mySource).toBeDefined();
        });
    });

    describe('getSource', function () {
        it('should return a promise, resolved when the source exists', function () {
            var mySource;
            sourceService.getSource('potato').then(function (result) {
                mySource = result;
            });

            sourceService.addSource('potato', source);

            scope.$digest();

            expect(mySource).toBeDefined();
        });

        it('should return undefined when no layerName is specified', function () {
           expect(sourceService.getSource()).toBeUndefined();
        });
    });
});