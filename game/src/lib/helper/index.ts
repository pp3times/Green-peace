import * as PIXI from 'pixi.js';

export function rectsIntersect(
    a: PIXI.DisplayObject,
    b: PIXI.DisplayObject
): boolean {
    let aBox = a.getBounds();
    let bBox = b.getBounds();
    return (
        aBox.x + aBox.width/2 > bBox.x &&
        aBox.x < bBox.x + bBox.width/2 &&
        aBox.y + aBox.height/2 > bBox.y &&
        aBox.y < bBox.y + bBox.height/2
    );
}
