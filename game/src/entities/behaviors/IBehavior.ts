import Entity from '../Entity';

export default class IBehavior {
    entity: Entity;

    constructor(entity: Entity) {
        this.entity = entity;
    }

    update() {}
}
