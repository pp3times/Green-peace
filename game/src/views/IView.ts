import * as PIXI from 'pixi.js';
import { GAME_HEIGHT, GAME_SIZE, GAME_WIDTH } from 'config';
import App from '../App';
import Scroller from '../controllers/Scroller';
import { sound } from '@pixi/sound';
import { TweenMax } from 'gsap';

export default class IView extends PIXI.Container {
    app: App;
    scroller: Scroller;

    constructor(app: App) {
        super();
        let { w, h } = GAME_SIZE();
        this.width = w;
        this.height = h;
        this.app = app;
        this.mask = app.mask;
    }

    initial(): void {
        TweenMax.to(this.app.mask, 1, {
            pixi: { alpha: 1 },
            ease: 'easeIn',
        }).then(() => {
            this.app.mask.interactive = false;
        });
    }

    beforeDestroy(): void {}

    destroy(options?: boolean | PIXI.IDestroyOptions): void {
        super.destroy(options);
    }

    update(): void {}
}
