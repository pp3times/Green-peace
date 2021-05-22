import * as PIXI from 'pixi.js';
import GameScroller from '../components/GameScroller';
import IView from './IView';
import App from '../App';
import CutScenes from './CutScenes';
import { fadeIn } from '../lib/sound';
import { GAME_HEIGHT, GAME_WIDTH } from 'config';
import Fish from '../entities/passive/Fish';
import TWEEN, { Easing } from '@tweenjs/tween.js';
import Boat from '../entities/passive/Boat';
import { rectsIntersect } from '../lib/helper';
import Interface from '../controllers/Interface';
import Player from '../Player';

export default class Game extends IView {
    hook: PIXI.Graphics;
    running: boolean = false;
    fishing: boolean = false;
    show: boolean = false;
    player: Player;
    interface: Interface;

    constructor(app: App) {
        super(app);
        this.scroller = new GameScroller(app);
        this.addChild(this.scroller);
        this.player = new Player();
        this.interface = new Interface(this.app, this, this.player);
        this.addChild(this.interface);
    }

    async initial() {
        super.initial();
        this.running = true;
        this.interface.setHealth(5);
        this.interface.setPoint(0);
        fadeIn('bg1', 0.05);
        let res = this.app.loader.resources;
        {
            {
                this.hook = new PIXI.Graphics();
                this.addChild(this.hook);

                this.hook.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20);
                this.hook.rotation = Math.PI * 0.1;
                this.hook.lineStyle(2, 0x000000).lineTo(50, 0);

                let tip = new PIXI.Sprite(res['hook'].texture);
                tip.x = 50;
                tip.anchor.set(0.5, 0);
                tip.rotation = -Math.PI / 2;
                this.hook.addChild(tip);

                let animation = new TWEEN.Tween(this.hook)
                    .to({ rotation: Math.PI * 0.9 }, 2000)
                    .easing(Easing.Cubic.InOut)
                    .repeat(Infinity)
                    .yoyo(true)
                    .start();

                addEventListener('keypress', (e) => {
                    if (e.code == 'Space' && !this.fishing) {
                        this.fishing = true;
                        animation.pause();
                        let repeat = false;
                        let move = new TWEEN.Tween({ x: 50 })
                            .to({ x: 300 }, 1000)
                            .onUpdate((data) => {
                                this.hook.clear();
                                this.hook
                                    .lineStyle(2, 0x000000)
                                    .lineTo(data.x, 0);
                                tip.x = data.x;
                                if (!repeat) {
                                    this.entities.forEach((e) => {
                                        if (rectsIntersect(tip, e)) {
                                            e.deSpawn();
                                            move.pause();

                                            setTimeout(() => {
                                                move.to({ x: data.x }, 1000);
                                                move.resume(1);
                                            }, 1000);
                                        }
                                    });
                                }
                            })
                            .onRepeat((data) => {
                                repeat = true;
                            })
                            .yoyo(true)
                            .repeat(1)
                            .onComplete(() => {
                                animation.resume();
                                this.fishing = false;
                            })
                            .start();
                    }
                });
            }
            this.addChild(new Boat(this));
        }

        {
            let scene = new CutScenes(this.app, [
                {
                    frames: ['OPENNING-1'],
                    dpf: 1000,
                    duration: 2000,
                },
                {
                    frames: ['OPENNING-2'],
                    dpf: 1000,
                    duration: 2000,
                },
                {
                    frames: ['OPENNING-3'],
                    dpf: 1000,
                    duration: 2000,
                },
            ]);
            //await scene.start();
        }
    }

    randomSpawn() {
        let res = this.app.loader.resources;
        if (this.entities.length < 10) {
            this.spawnEntity(
                new Fish(res['fish1'].texture, this, 500, 0.3, 'A')
            );
            this.spawnEntity(
                new Fish(res['fish2'].texture, this, 1000, 0.5, 'B')
            );
            this.spawnEntity(
                new Fish(res['fish3'].texture, this, 2000, 1, 'C')
            );
        }
    }

    beforeDestroy() {
        super.beforeDestroy();
        this.running = false;
    }

    update() {
        if (this.running) {
            super.update();
            this.randomSpawn();
            if (this.interface) {
                this.interface.update();
            }
        }
    }
}
