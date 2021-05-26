import * as PIXI from 'pixi.js';
import { GAME_HEIGHT, GAME_SIZE, GAME_WIDTH } from 'config';
import App from '../App';
import Scroller from '../controllers/Scroller';
import { sound } from '@pixi/sound';
import { TweenMax } from 'gsap';
import Entity from '../entities/Entity';

export default class IView extends PIXI.Container {
    app: App;
    scroller: Scroller;
    entities: Entity[] = [];

    constructor(app: App) {
        super();
        let { w, h } = GAME_SIZE();
        this.width = w;
        this.height = h;
        this.app = app;
    }

    initial(): void {
        this.mask = this.app.mask;
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
        this.entities.forEach((e) => {
            e.deSpawn();
        });
        this.scroller = null;
    }

    update() {
        if (this.scroller) {
            this.scroller.update();
        }
        this.entities.forEach((e) => e.update());
    }

    spawnEntity(entity: Entity) {
        this.entities.push(entity);
        entity.spawn();
    }
}
