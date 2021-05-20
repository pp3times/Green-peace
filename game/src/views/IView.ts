import * as PIXI from 'pixi.js';
import { GAME_WIDTH, GAME_HEIGHT } from 'config';
import App from '../App';
import Scroller from '../controllers/Scroller';
import { sound } from '@pixi/sound';
import { TweenMax } from 'gsap';

export default class IView extends PIXI.Container {
    app: App;
    scroller: Scroller;

    constructor(app: App) {
        super();
        this.width = GAME_WIDTH;
        this.height = GAME_HEIGHT;
        this.app = app;
        this.alpha = 0;
    }

    initial() {
        TweenMax.to(this, 2, {
            pixi: { alpha: 1 },
            ease: 'easeIn',
        });
    }

    beforeDestroy() {}

    destroy(options?: boolean | PIXI.IDestroyOptions) {
        super.destroy(options);
    }

    update() {}
}
