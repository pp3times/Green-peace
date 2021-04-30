export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 540;
export const GAME_SIZE = () => {
    let aspect = 16 / 9;
    let w = window.innerWidth * 0.9;
    let h = window.innerHeight * 0.9;
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
