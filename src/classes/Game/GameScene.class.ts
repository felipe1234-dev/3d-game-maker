import * as THREE from "three";
import { Game } from "..";

class GameScene extends THREE.Scene {
    static DEFAULT_BACKGROUND: THREE.Color = new THREE.Color("#444");
    static DEFAULT_ENVIRONMENT: null = null;
    static DEFAULT_FOG: null = null;

    public game?: Game.Core;
    public stage?: Game.Stage;
    public physics: Game.Physics;

    constructor(name: string, game?: Game.Core) {
        super();
        this.name = name;
        this.game = game;

        this.background = GameScene.DEFAULT_BACKGROUND;
        this.environment = GameScene.DEFAULT_ENVIRONMENT;
        this.fog = GameScene.DEFAULT_FOG;

        this.physics = new Game.Physics();
    }

    public select(): void {
        if (!this.game) {
            return;
        }
        
        const { currentScene } = this.game;
        if (!currentScene) {
            return;
        }

        if (currentScene.uuid === this.uuid) {
            return;
        }

        this.game.current.scene = this;

        this.dispatchEvent({ type: "select-scene" });
    }

    public override clone(recursive: boolean = true): this {
        const clone = super.clone(recursive);

        clone.stage = this.stage;
        clone.game = this.game;
        clone.physics = this.physics;

        return clone;
    }

    public override add(...objects: THREE.Object3D[]): this {
        super.add(...objects);

        for (const object of objects) {
            if (object instanceof Game.Mesh) {
                //object;
            }
        }

        this.dispatchEvent({ 
            type: "add-objects",
            objects: [ ...objects ] 
        });
        
        return this;
    }

    public override remove(...objects: THREE.Object3D[]): this {
        super.remove(...objects);
        
        this.dispatchEvent({ 
            type: "remove-objects", 
            objects: [ ...objects ] 
        });

        return this;
    }
}

export default GameScene;