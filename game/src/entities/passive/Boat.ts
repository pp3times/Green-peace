import Entity from '../Entity';
import * as PIXI from 'pixi.js';
import IView from '../../views/IView';
import { GAME_HEIGHT, GAME_WIDTH } from 'config';
import TWEEN, { Easing } from '@tweenjs/tween.js';

export default class Boat extends Entity {
    hook: PIXI.Graphics;

    constructor(view: IView) {
        let res = view.app.loader.resources;
        super(res['boat'].texture, view);
        this.x = GAME_WIDTH / 2;
        this.y = GAME_HEIGHT / 2 - 20;
        this.anchor.set(0.5);
        this.width *= 0.2;
        this.height *= 0.2;
    }

    spawn() {
        super.spawn();
    }

    deSpawn() {
        super.deSpawn();
    }

    update() {
        super.update();
    }
}
