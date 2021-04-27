class Walls extends PIXI.Container{
    constructor() {
        super()
        this.pool = new WallSpritesPool();
        this.borrowWallSpriteLookup = [];
        this.returnWallSpriteLookup = [];

        this.slices = [];

        this.createLookupTables = function() {
            this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
            this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
            this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
            this.borrowWallSpriteLookup[SliceType.DECORATION] = this.pool.borrowDecoration;
            this.borrowWallSpriteLookup[SliceType.WINDOW] = this.pool.borrowWindow;

            this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
            this.returnWallSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
            this.returnWallSpriteLookup[SliceType.STEP] = this.pool.returnStep;
            this.returnWallSpriteLookup[SliceType.DECORATION] = this.pool.returnDecoration;
            this.returnWallSpriteLookup[SliceType.WINDOW] = this.pool.returnWindow;
        };

        this.createLookupTables();

        this.borrowWallSprite = function(sliceType) {
            return this.borrowWallSpriteLookup[sliceType].call(this.pool);
        };
        this.returnWallSprite = function(sliceType, sliceSprite) {
            return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite);
        };

        this.addSlice = function(sliceType, y) {
            let slice = new WallSlice(sliceType, y);
            this.slices.push(slice);
        };

        this.createTestWallSpan = function() {
            this.addSlice(SliceType.FRONT, 192);
            this.addSlice(SliceType.WINDOW, 192);
            this.addSlice(SliceType.DECORATION, 192);
            this.addSlice(SliceType.WINDOW, 192);
            this.addSlice(SliceType.DECORATION, 192);
            this.addSlice(SliceType.WINDOW, 192);
            this.addSlice(SliceType.DECORATION, 192);
            this.addSlice(SliceType.WINDOW, 192);
            this.addSlice(SliceType.BACK, 192);
        };

        this.createTestGap = function() {
            this.addSlice(SliceType.GAP);
        };

        this.createTestSteppedWallSpan = function() {
            this.addSlice(SliceType.FRONT, 192);
            this.addSlice(SliceType.WINDOW, 192);
            this.addSlice(SliceType.DECORATION, 192);
            this.addSlice(SliceType.STEP, 256);
            this.addSlice(SliceType.WINDOW, 256);
            this.addSlice(SliceType.BACK, 256);
        };

        this.createTestMap = function() {
            for (var i = 0; i < 10; i++)
            {
                this.createTestWallSpan();
                this.createTestGap();
                this.createTestSteppedWallSpan();
                this.createTestGap();
            }
        };

        this.createTestMap();

        this.VIEWPORT_WIDTH = 1920;
        this.VIEWPORT_NUM_SLICES = Math.ceil(this.VIEWPORT_WIDTH/WallSlice.WIDTH) + 1;
        this.viewportX = 0;
        this.viewportSliceX = 0;

        this.setViewportX = function(viewportX) {
            this.viewportX = this.checkViewportXBounds(viewportX);
            let prevViewportSliceX = this.viewportSliceX;
            this.viewportSliceX = Math.floor(this.viewportX/WallSlice.WIDTH);

            this.removeOldSlices(prevViewportSliceX);
            this.addNewSlices();
        };
        this.checkViewportXBounds = function(viewportX) {
            let maxViewportX = (this.slices.length - this.VIEWPORT_NUM_SLICES) *
                WallSlice.WIDTH;
            if (viewportX < 0)
            {
                viewportX = 0;
            }
            else if (viewportX > maxViewportX)
            {
                viewportX = maxViewportX;
            }

            return viewportX;
        };

        this.addNewSlices = function() {
            let firstX = -(this.viewportX % WallSlice.WIDTH);
            for (let i = this.viewportSliceX, sliceIndex = 0;
                 i < this.viewportSliceX + this.VIEWPORT_NUM_SLICES;
                 i++, sliceIndex++)
            {
                let slice = this.slices[i];
                if (slice.sprite == null && slice.type !== SliceType.GAP)
                {
                    slice.sprite = this.borrowWallSprite(slice.type);

                    slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
                    slice.sprite.position.y = slice.y;

                    this.addChild(slice.sprite);
                }
                else if (slice.sprite != null)
                {
                    slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
                }
            }
        };

        this.removeOldSlices = function(prevViewportSliceX) {
            let numOldSlices = this.viewportSliceX - prevViewportSliceX;
            if (numOldSlices > this.VIEWPORT_NUM_SLICES)
            {
                numOldSlices = this.VIEWPORT_NUM_SLICES;
            }

            for (let i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; i++)
            {
                let slice = this.slices[i];
                if (slice.sprite != null)
                {
                    this.returnWallSprite(slice.type, slice.sprite);
                    this.removeChild(slice.sprite);
                    slice.sprite = null;
                }
            }
        };
    }
}