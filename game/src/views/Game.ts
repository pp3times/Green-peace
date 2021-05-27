import * as PIXI from 'pixi.js';
import GameScroller from '../components/GameScroller';
import IView from './IView';
import App from '../App';
import CutScenes from './CutScenes';
import { fadeIn, fadeOut } from '../lib/sound';
import { GAME_HEIGHT, GAME_WIDTH } from 'config';
import Fish from '../entities/passive/Fish';
import TWEEN, { Easing } from '@tweenjs/tween.js';
import Boat from '../entities/passive/Boat';
import { rectsIntersect } from '../lib/helper';
import Interface from '../controllers/Interface';
import Player from '../Player';
import End from './End';
import { sound } from '@pixi/sound';

export default class Game extends IView {
    hook: PIXI.Graphics;
    running: boolean = false;
    fishing: boolean = false;
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
        this.interface.setfish(8);
        fadeIn('bg1', 0.05, 2000, {
            loop: true,
        });
        let res = this.app.loader.resources;
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
                        this.hook.lineStyle(2, 0x000000).lineTo(data.x, 0);
                        tip.x = data.x;
                        if (!repeat) {
                            for (let e of this.entities) {
                                if (e instanceof Fish) {
                                    if (rectsIntersect(tip, e)) {
                                        fadeIn('get_fish', 4, 2000);
                                        this.interface.addPoint(e.point);
                                        this.interface.LowFish();
                                        this.player.got_fish++;
                                        e.deSpawn();
                                        move.pause();
                                        move.to({ x: data.x }, 1000);
                                        move.resume(1);
                                        this.onGotFish(e);
                                        break;
                                    }
                                }
                            }
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
        this.addChild(new Boat(this));

        {
            let image = new PIXI.Sprite(res['sound_open'].texture);
            image.x = GAME_WIDTH;
            image.y = GAME_HEIGHT;
            image.anchor.set(1.2);
            image.interactive = true;
            image.buttonMode = true;
            // @ts-ignore
            image.on('pointerdown', () => {
                let open = this.app.option.sound;
                fadeIn('click', 5, 2000);
                image.texture =
                    res[open ? 'sound_close' : 'sound_open'].texture;
                this.app.option.sound = !open;
                if (this.app.option.sound) {
                    sound.unmuteAll();
                } else {
                    sound.muteAll();
                }
            });
            this.addChild(image);
        }

        let scene = new CutScenes(this.app, [
            {
                frames: ['OPENNING-1-1'],
                dpf: 1000,
                duration: 4000,
            },
            {
                frames: ['OPENNING-1-2'],
                dpf: 1000,
                duration: 4000,
            },
            {
                frames: ['OPENNING-1-3'],
                dpf: 1000,
                duration: 4000,
            },
            {
                frames: ['OPENNING-2-1'],
                dpf: 1000,
                duration: 4000,
            },
            {
                frames: ['OPENNING-2-2'],
                dpf: 1000,
                duration: 4000,
            },
            {
                frames: ['OPENNING-3'],
                dpf: 1000,
                duration: 4000,
            },
            {
                frames: ['tutorial'],
                dpf: 1000,
                duration: 4000,
            },
        ]);
        await scene.start();
    }

    onGotFish(fish: Fish) {
        if (this.player.got_fish == 8 && this.player.check != 1) {
            this.interface.setHealth(this.player.health - 1);
            fadeIn('life_low', 0.5, 2000);
            this.player.check++;
            setTimeout(() => {
                let scene = new CutScenes(this.app, [
                    {
                        frames: ['SCENE1-1'],
                        dpf: 1000,
                        duration: 5000,
                    },
                    {
                        frames: ['SCENE1-2'],
                        dpf: 1000,
                        duration: 5000,
                    },
                ]);
                scene.start();
                this.interface.setfish(8);
            }, 1000);
        } else if (this.player.got_fish == 16 && this.player.check != 2) {
            this.interface.setHealth(this.player.health - 1);
            fadeIn('life_low', 0.5, 2000);
            this.player.check++;
            setTimeout(() => {
                let scene = new CutScenes(this.app, [
                    {
                        frames: ['SCENE2-1-1'],
                        dpf: 1000,
                        duration: 4000,
                    },
                    {
                        frames: ['SCENE2-2-1'],
                        dpf: 1000,
                        duration: 4000,
                    },
                    {
                        frames: ['SCENE2-2-2'],
                        dpf: 1000,
                        duration: 4000,
                    },
                ]);
                scene.start();
                this.interface.setfish(8);
            }, 1000);
        } else if (this.player.got_fish == 24 && this.player.check != 3) {
            this.interface.setHealth(this.player.health - 1);
            fadeIn('life_low', 0.5, 2000);
            this.player.check++;
            fadeOut('bg1');
            fadeIn('dark_song', 0.05, 2000, {
                loop: true,
            });
            setTimeout(() => {
                let scene = new CutScenes(this.app, [
                    {
                        frames: ['SCENE3-1'],
                        dpf: 1000,
                        duration: 4000,
                    },
                    {
                        frames: ['SCENE3-2-1'],
                        dpf: 1000,
                        duration: 4000,
                    },
                    {
                        frames: ['SCENE3-2-2'],
                        dpf: 1000,
                        duration: 4000,
                    },
                ]);
                scene.start().then(() => {
                    this.interface.setfish(10);
                    this.running = true;
                    this.scroller.texture = this.app.loader.resources[
                        'dark_sea'
                    ].texture;
                });
            }, 1000);
        } else if (this.player.got_fish == 34 && this.player.check != 4) {
            this.interface.setHealth(this.player.health - 1);
            fadeIn('life_low', 0.5, 2000);
            this.player.check++;
            setTimeout(() => {
                let scene = new CutScenes(this.app, [
                    {
                        frames: ['SCENE4-1-1'],
                        dpf: 1000,
                        duration: 4000,
                    },
                    {
                        frames: ['SCENE4-2-1'],
                        dpf: 1000,
                        duration: 4000,
                    },
                ]);
                scene.start();
                this.interface.setfish(10);
            }, 1000);
        } else if (this.player.got_fish == 44 && this.player.check != 5) {
            this.interface.setHealth(this.player.health - 1);
            this.interface.setfish(0);
            fadeIn('life_low', 0.5, 2000);
            this.player.check++;
            setTimeout(() => {
                let scene = new CutScenes(this.app, [
                    {
                        frames: ['SCENE5-1'],
                    },
                    {
                        frames: ['SCENE5-2'],
                    },
                    {
                        frames: ['SCENE5-3-1'],
                    },
                ]);
                scene.start().then(() => {
                    this.app.changeScenes(new End(this.app, this.player));
                });
            }, 1000);
        }
    }

    randomSpawn() {
        let res = this.app.loader.resources;
        if (this.player.health > 2 && this.entities.length < 10) {
            this.spawnEntity(new Fish(res['trash'].texture, this, 0, 0.3, 'D'));
            this.spawnEntity(
                new Fish(res['fish1'].texture, this, 100, 0.5, 'A')
            );
            this.spawnEntity(new Fish(res['fish2'].texture, this, 200, 1, 'B'));
            this.spawnEntity(new Fish(res['fish3'].texture, this, 500, 2, 'C'));
        } else if (this.entities.length < 7) {
            this.spawnEntity(new Fish(res['trash'].texture, this, 0, 0.5, 'D'));
            this.spawnEntity(new Fish(res['fish1'].texture, this, 100, 1, 'A'));
            this.spawnEntity(
                new Fish(res['fish2'].texture, this, 200, 1.75, 'B')
            );
        }
    }

    beforeDestroy() {
        super.beforeDestroy();
        fadeOut('dark_song');
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
