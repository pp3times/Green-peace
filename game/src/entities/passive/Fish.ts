import Entity from '../Entity';
import * as PIXI from 'pixi.js';
import Swimming from '../behaviors/Swimming';
import { GAME_HEIGHT } from 'config';
import IView from '../../views/IView';

export default class Fish extends Entity {
    constructor(texture: PIXI.Texture, view: IView, speed?: number) {
        super(texture, view);
        this.behaviors.push(new Swimming(this, speed || 0.3));
        this.anchor.set(0.5);
        this.y = (Math.random() * GAME_HEIGHT) / 2 + GAME_HEIGHT / 2;
        this.scale.x = -1;
    }

    update() {
        super.update();
    }
}
