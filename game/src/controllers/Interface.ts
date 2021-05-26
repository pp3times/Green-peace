import * as PIXI from 'pixi.js';
import App from '../App';
import Player from '../Player';
import { GAME_WIDTH } from 'config';
import Game from '../views/Game';

export default class Interface extends PIXI.Container {
    app: App;
    player: Player;
    game: Game;
    private health: PIXI.Container;
    private point: PIXI.Container;

    constructor(app: App, game: Game, player: Player) {
        super();
        this.app = app;
        this.game = game;
        this.player = player;
    }

    setHealth(health: number) {
        let texture = this.app.loader.resources['heart'].texture;
        if (this.health) {
            this.removeChild(this.health);
        }
        this.health = new PIXI.Container();
        for (let i = 0; i < health; i++) {
            let health = new PIXI.Sprite(texture);
            health.x += i * (health.width + 5);
            this.health.addChild(health);
        }
        this.health.x = 10;
        this.health.y = 10;

        this.addChild(this.health);
        this.player.health = health;
    }

    setPoint(point: number) {
        if (this.point) {
            this.removeChild(this.point);
        }
        this.point = new PIXI.Container();
        this.point.pivot.set(0, 0);
        let texture = this.app.loader.resources['coin'].texture;
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: texture.height,
            fontWeight: 'bold',
            fill: '#ffffff',
        });
        const text = new PIXI.Text(`${point}`, style);
        text.x += texture.width + 5;
        text.resolution = 3;
        this.point.addChild(new PIXI.Sprite(texture));
        this.point.addChild(text);
        this.point.x = GAME_WIDTH - (this.point.width + 10);
        this.point.y = 10;
        this.addChild(this.point);
        this.player.point = point;
    }

    addPoint(point: number) {
        this.setPoint(this.player.point + point);
    }

    update() {}
}
