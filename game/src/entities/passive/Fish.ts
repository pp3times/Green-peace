import Entity from '../Entity';
import * as PIXI from 'pixi.js';
import Swimming from '../behaviors/Swimming';
import { GAME_HEIGHT } from 'config';
import IView from '../../views/IView';

export default class Fish extends Entity {
    type: string;
    point: number;

    constructor(
        texture: PIXI.Texture,
        view: IView,
        point: number,
        speed?: number,
        type?: string
    ) {
        super(texture, view);
        this.behaviors.push(new Swimming(this, speed || 0.3));
        this.anchor.set(0.5);
        this.y =
            (Math.random() * GAME_HEIGHT) / 2 +
            GAME_HEIGHT / 2 +
            GAME_HEIGHT / 10;
        this.scale.x = -1;
        this.type = type;
        this.point = point;
    }

    update() {
        super.update();
    }
}
