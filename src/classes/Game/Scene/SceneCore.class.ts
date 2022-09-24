import * as THREE from "three";
import ScenePhysics from "./ScenePhysics.class";
import { Game } from "../..";

class SceneCore extends THREE.Scene {
    static DEFAULT_BACKGROUND: THREE.Color = new THREE.Color("#444");
    static DEFAULT_ENVIRONMENT: null = null;
    static DEFAULT_FOG: null = null;

    public game?: Game.Core;
    public stage?: Game.Stage;
    public physics: ScenePhysics;

    constructor(name: string, game?: Game.Core) {
        super();
        this.name = name;
        this.game = game;

        this.background = SceneCore.DEFAULT_BACKGROUND;
        this.environment = SceneCore.DEFAULT_ENVIRONMENT;
        this.fog = SceneCore.DEFAULT_FOG;

        this.physics = new ScenePhysics();
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

        const previousScene = this.game.currentScene;
        this.game.current.scene = this;

        this.dispatchEvent({ type: "changeScene", previousScene });
        this.game.dispatchEvent({ 
            type: "changeScene", 
            previousScene, 
            currentScene: this 
        });
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
                this.physics.addBody(object.body);
            }
        }

        this.dispatchEvent({ 
            type: "addObjects",
            objects: [ ...objects ] 
        });
        
        return this;
    }

    public override remove(...objects: THREE.Object3D[]): this {
        super.remove(...objects);
        
        for (const object of objects) {
            if (object instanceof Game.Mesh) {
                this.physics.removeBody(object.body);
            }
        }

        this.dispatchEvent({ 
            type: "removeObjects", 
            objects: [ ...objects ] 
        });

        return this;
    }

    public override toJSON(meta?: any): Game.SceneFormat {
        const json = super.toJSON(meta);

        if (this.game) json.game = this.game.uuid;
        json.bodies = [];

        for (const body of this.physics.bodies) {
            json.bodies.push(body.toJSON());
        }

        return json;
    }
}

export default SceneCore;