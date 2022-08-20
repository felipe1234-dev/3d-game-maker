import * as THREE from "three";
import { Game } from "..";

class Scene extends THREE.Scene {
    static DEFAULT_BACKGROUND: THREE.Color = new THREE.Color("#444");
    static DEFAULT_ENVIRONMENT: null = null;
    static DEFAULT_FOG: null = null;

    public stage: Game.Stage;
    public game: Game.Core;

    constructor(name: string, stage: Game.Stage, game: Game.Core) {
        super();
        this.name = name;
        this.stage = stage;
        this.game = game;
    }

    public select(): void {
        this.game.currentScene = this;
    }
}

export default Scene;