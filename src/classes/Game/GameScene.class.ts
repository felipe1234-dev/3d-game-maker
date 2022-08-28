import * as THREE from "three";
import { Game } from "..";

class GameScene extends THREE.Scene {
    static DEFAULT_BACKGROUND: THREE.Color = new THREE.Color("#444");
    static DEFAULT_ENVIRONMENT: null = null;
    static DEFAULT_FOG: null = null;

    public stage?: Game.Stage;
    public game: Game.Core;

    constructor(name: string, game: Game.Core) {
        super();
        this.name = name;
        this.game = game;
    }

    public select(): void {
        if (this.game.currentScene.uuid === this.uuid) {
            return;
        }

        this.game.currentScene = this;
    }

    public override clone(recursive: boolean = true): this {
        const clone = super.clone(recursive);

        clone.stage = this.stage;
        clone.game = this.game;

        return clone;
    }

    public override add(...objects: THREE.Object3D[]): this {
        super.add(...objects);
        this.dispatchEvent({ type: "add-object" });
        return this;
    }

    public override remove(...objects: THREE.Object3D[]): this {
        super.remove(...objects);
        this.dispatchEvent({ type: "remove-object" });
        return this;
    }
}

export default GameScene;