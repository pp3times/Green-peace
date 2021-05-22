import * as PIXI from 'pixi.js';

export function rectsIntersect(
    a: PIXI.DisplayObject,
    b: PIXI.DisplayObject
): boolean {
    let aBox = a.getBounds();
    let bBox = b.getBounds();
    return (
        aBox.x + aBox.width > bBox.x &&
        aBox.x < bBox.x + bBox.width &&
        aBox.y + aBox.height > bBox.y &&
        aBox.y < bBox.y + bBox.height
    );
}
