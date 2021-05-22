import IBehavior from './IBehavior';
import Entity from '../Entity';
import { GAME_WIDTH } from 'config';

export default class Swimming extends IBehavior {
    speed: number;

    constructor(entity: Entity, speed: number) {
        super(entity);
        this.speed = speed;
    }
    update() {
        super.update();
        this.entity.x += this.speed;
        if (this.entity.x > GAME_WIDTH + this.entity.width) {
            this.entity.deSpawn();
        }
    }
}
