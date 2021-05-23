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
                                        if (e instanceof Fish) {
                                            if (rectsIntersect(tip, e)) {
                                                console.log('GOT', e.point);
                                                this.interface.addPoint(
                                                    e.point
                                                );

                                                this.player.got_fish++;
                                                console.log(this.player);
                                                e.deSpawn();
                                                move.pause();
                                                setTimeout(() => {
                                                    move.to(
                                                        { x: data.x },
                                                        1000
                                                    );
                                                    move.resume(1);
                                                    {
                                                        this.running = true;
                                                    }
                                                }, 1);
                                            }
                                        }
                                    });

                                    if (
                                        this.player.got_fish == 8 &&
                                        this.player.check != 1
                                    ) {
                                        {
                                            this.interface.setHealth(
                                                this.player.health - 1
                                            );
                                            this.player.check++;
                                            setTimeout(() => {
                                                move.to({ x: data.x }, 1000);
                                                move.resume(1);
                                                {
                                                    let scene = new CutScenes(
                                                        this.app,
                                                        [
                                                            {
                                                                frames: [
                                                                    'SCENE1-1',
                                                                ],
                                                                dpf: 1000,
                                                                duration: 5000,
                                                            },
                                                            {
                                                                frames: [
                                                                    'SCENE1-2',
                                                                ],
                                                                dpf: 1000,
                                                                duration: 5000,
                                                            },
                                                        ]
                                                    );
                                                    scene.start().then(() => {
                                                        this.running = true;
                                                    });
                                                    this.running = true;
                                                }
                                            }, 1000);
                                        }
                                    } else if (
                                        this.player.got_fish == 16 &&
                                        this.player.check != 2
                                    ) {
                                        {
                                            this.interface.setHealth(
                                                this.player.health - 1
                                            );
                                            this.player.check++;
                                            setTimeout(() => {
                                                move.to({ x: data.x }, 1000);
                                                move.resume(1);
                                                {
                                                    let scene = new CutScenes(
                                                        this.app,
                                                        [
                                                            {
                                                                frames: [
                                                                    'SCENE2-1-1',
                                                                ],
                                                                dpf: 1000,
                                                                duration: 4000,
                                                            },
                                                            {
                                                                frames: [
                                                                    'SCENE2-2-1',
                                                                ],
                                                                dpf: 1000,
                                                                duration: 4000,
                                                            },
                                                            {
                                                                frames: [
                                                                    'SCENE2-2-2',
                                                                ],
                                                                dpf: 1000,
                                                                duration: 4000,
                                                            },
                                                        ]
                                                    );
                                                    scene.start().then(() => {
                                                        this.running = true;
                                                    });
                                                    this.running = true;
                                                }
                                            }, 1000);
                                        }
                                    } else if (
                                        this.player.got_fish == 24 &&
                                        this.player.check != 3
                                    ) {
                                        {
                                            this.interface.setHealth(
                                                this.player.health - 1
                                            );
                                            this.player.check++;
                                            setTimeout(() => {
                                                move.to({ x: data.x }, 1000);
                                                move.resume(1);
                                                {
                                                    let scene = new CutScenes(
                                                        this.app,
                                                        [
                                                            {
                                                                frames: [
                                                                    'SCENE3-1',
                                                                ],
                                                                dpf: 1000,
                                                                duration: 4000,
                                                            },
                                                            {
                                                                frames: [
                                                                    'SCENE3-2-1',
                                                                ],
                                                                dpf: 1000,
                                                                duration: 4000,
                                                            },
                                                            {
                                                                frames: [
                                                                    'SCENE3-2-2',
                                                                ],
                                                                dpf: 1000,
                                                                duration: 4000,
                                                            },
                                                        ]
                                                    );
                                                    scene.start().then(() => {
                                                        this.running = true;
                                                        this.scroller.texture =
                                                            res[
                                                                'dark_sea'
                                                            ].texture;
                                                    });
                                                    this.running = true;
                                                }
                                            }, 1000);
                                        }
                                    } else if (
                                        this.player.got_fish == 34 &&
                                        this.player.check != 4
                                    ) {
                                        {
                                            this.interface.setHealth(
                                                this.player.health - 1
                                            );
                                            this.player.check++;
                                            setTimeout(() => {
                                                move.to({ x: data.x }, 1000);
                                                move.resume(1);
                                                {
                                                    let scene = new CutScenes(
                                                        this.app,
                                                        [
                                                            {
                                                                frames: [
                                                                    'SCENE4-1-1',
                                                                ],
                                                                dpf: 1000,
                                                                duration: 4000,
                                                            },
                                                            {
                                                                frames: [
                                                                    'SCENE4-2-1',
                                                                ],
                                                                dpf: 1000,
                                                                duration: 4000,
                                                            },
                                                        ]
                                                    );
                                                    scene.start().then(() => {
                                                        this.running = true;
                                                    });
                                                    this.running = true;
                                                }
                                            }, 1000);
                                        }
                                    } else if (
                                        this.player.got_fish == 44 &&
                                        this.player.check != 5
                                    ) {
                                        {
                                            this.interface.setHealth(
                                                this.player.health - 1
                                            );
                                            this.player.check++;
                                            setTimeout(() => {
                                                move.to({ x: data.x }, 1000);
                                                move.resume(1);
                                                {
                                                    let scene = new CutScenes(
                                                        this.app,
                                                        [
                                                            {
                                                                frames: [
                                                                    'SCENE5-1',
                                                                ],
                                                                dpf: 1000,
                                                                duration: 2000,
                                                            },
                                                            {
                                                                frames: [
                                                                    'SCENE5-2',
                                                                ],
                                                                dpf: 1000,
                                                                duration: 2000,
                                                            },
                                                            {
                                                                frames: [
                                                                    'SCENE5-3-1',
                                                                ],
                                                                dpf: 1000,
                                                                duration: 2000,
                                                            },
                                                        ]
                                                    );
                                                    scene.start().then(() => {
                                                        this.running = true;
                                                    });
                                                    this.running = true;
                                                }
                                            }, 1000);
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
            }
            this.addChild(new Boat(this));
        }

        {
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
            ]);
            await scene.start();
        }

        //this.scroller.texture = res['SCENE4-2'].texture;
    }

    randomSpawn() {
        let res = this.app.loader.resources;
        if (this.player.health > 2) {
            if (this.entities.length < 10) {
                this.spawnEntity(
                    new Fish(res['fish1'].texture, this, 100, 0.5, 'A')
                );
                this.spawnEntity(
                    new Fish(res['fish2'].texture, this, 500, 1, 'B')
                );
                this.spawnEntity(
                    new Fish(res['fish3'].texture, this, 1000, 2, 'C')
                );
            }
        } else {
            if (this.entities.length < 5) {
                this.spawnEntity(
                    new Fish(res['fish1'].texture, this, 100, 0.5, 'A')
                );
                this.spawnEntity(
                    new Fish(res['fish2'].texture, this, 500, 1, 'B')
                );
            }
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
