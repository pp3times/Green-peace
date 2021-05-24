import * as PIXI from 'pixi.js';
import IBehavior from './behaviors/IBehavior';
import IView from '../views/IView';

export default class Entity extends PIXI.Sprite {
    behaviors: IBehavior[] = [];
    view: IView;
    isSpawned: boolean = false;

    constructor(texture: PIXI.Texture, view: IView) {
        super(texture);
        this.view = view;
    }

    update() {
        if (this.isSpawned) {
            this.behaviors.forEach((bh) => bh.update());
        }
    }

    spawn() {
        this.view.addChild(this);
        this.isSpawned = true;
    }

    deSpawn() {
        this.view.removeChild(this);
        const index = this.view.entities.indexOf(this);
        if (index > -1) {
            this.view.entities.splice(index, 1);
        }
        this.isSpawned = false;
    }
}
