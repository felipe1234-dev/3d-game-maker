import * as THREE from "three";
import { Game } from "@local/classes";

class Scene extends THREE.Scene {
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

        this.background = Scene.DEFAULT_BACKGROUND;
        this.environment = Scene.DEFAULT_ENVIRONMENT;
        this.fog = Scene.DEFAULT_FOG;

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

        const previousScene = this.game.currentScene;
        this.game.current.scene = this;

        this.dispatchEvent({ type: "changeScene", previousScene });
        this.game.dispatchEvent({
            type: "changeScene",
            previousScene,
            currentScene: this,
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
            objects: [...objects],
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
            objects: [...objects],
        });

        return this;
    }

    public override toJSON(meta?: Game.MetaFormat): Game.SceneFormat {
        const json = super.toJSON(meta) as Game.SceneFormat;

        if (this.stage) json.object.stage = this.stage.uuid;
        if (this.game) json.object.game = this.game.uuid;
        json.bodies = [];

        for (const body of this.physics.bodies) {
            json.bodies.push(body.toJSON());
        }

        json.physics = this.physics.toJSON();

        return json;
    }

    public static fromJSON(json: Game.SceneFormat): Game.Scene {
        const scene = new Game.Scene(json.object.name);
        (scene as any).uuid = json.object.uuid;
        scene.physics = Game.Physics.fromJSON(json.physics);

        for (const objectJSON of json.object.children) {
            switch (objectJSON.type) {
                case "Mesh":
                    const meshJSON = objectJSON as Game.MeshFormat;
                    const mesh = Game.Mesh.fromJSON(meshJSON);
                    scene.add(mesh);
                    break;
                default:
                    break;
            }
        }

        return scene;
    }
}

export default Scene;