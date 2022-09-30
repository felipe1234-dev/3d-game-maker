import * as THREE from "three";
import { Game } from "@local/classes";
import GamePhysics from "./Physics.class";

interface SceneOptions {
    id?: number;
    uuid?: string;
    name: string;

    background?: THREE.Color | THREE.Texture | null;
    environment?: THREE.Texture | null;
    fog?: THREE.FogBase | null;

    game?: Game.Core;
    stage?: Game.Stage;
    physics?: Game.Physics;

    children?: Game.Models.Object[];
}

class Scene extends THREE.Scene {
    static DEFAULT_BACKGROUND: THREE.Color = new THREE.Color("#444");
    static DEFAULT_ENVIRONMENT: null = null;
    static DEFAULT_FOG: null = null;
    static DEFAULT_PHYSICS: GamePhysics = new GamePhysics();

    public game?: Game.Core;
    public stage?: Game.Stage;
    public physics: GamePhysics;

    constructor(
        options: SceneOptions = {
            name: "",
            children: [],
        }
    ) {
        super();

        const {
            id = Game.Utils.generateID(),
            uuid = this.uuid,
            name = "",

            background = Scene.DEFAULT_BACKGROUND,
            environment = Scene.DEFAULT_ENVIRONMENT,
            fog = Scene.DEFAULT_FOG,

            game,
            physics = Scene.DEFAULT_PHYSICS,
            stage,

            children = [],
        } = options;

        this.id = id;
        this.uuid = uuid;
        this.name = name;

        this.background = background;
        this.environment = environment;
        this.fog = fog;

        this.game = game;
        this.stage = stage;
        this.physics = physics;

        for (const object of children) {
            this.add(object);
        }
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
                if (object.body) this.physics.addBody(object.body);
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
                if (object.body) this.physics.removeBody(object.body);
            }
        }

        this.dispatchEvent({
            type: "removeObjects",
            objects: [...objects],
        });

        return this;
    }
}

export default Scene;
export type { SceneOptions };