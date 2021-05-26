export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 540;
export const GAME_SIZE = () => {
    let aspect = 16 / 9;
    let w = window.innerWidth;
    let h = window.innerHeight;
    if (w > h * aspect) {
        w = h * aspect;
    } else {
        h = w / aspect;
    }
    return {
        w: w,
        h: h,
    };
};
