import { Game } from "@local/classes";
import {
    generateID,
    metaFromObjectJSON,
    parseObjectChildren
} from "../utils/private";
import GamePhysics from "./Physics.class";
import * as THREE from "three";

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

    children?: Game.Object3D[];
}

class Scene extends THREE.Scene implements Game.Object3D {
    static DEFAULT_BACKGROUND: THREE.Color = new THREE.Color("#444");
    static DEFAULT_ENVIRONMENT: null = null;
    static DEFAULT_FOG: null = null;
    static DEFAULT_PHYSICS: GamePhysics = new GamePhysics();

    public readonly type: "Scene";
    public game?: Game.Core;
    public stage?: Game.Stage;
    public physics: GamePhysics;
    public children: (Game.Object3D | THREE.Object3D)[];

    constructor(
        options: SceneOptions = {
            name: "",
            children: [],
        }
    ) {
        super();

        const {
            id = generateID(),
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
        this.type = "Scene";

        this.background = background;
        this.environment = environment;
        this.fog = fog;

        this.game = game;
        this.stage = stage;
        this.physics = physics;

        this.children = [];
        for (const object of children) {
            this.add(object);
        }
    }

    public select(): void {
        if (!this.game) {
            return;
        }

        const { currentScene } = this.game;
        if ((currentScene || {}).uuid === this.uuid) {
            return;
        }

        const previousScene = this.game.currentScene;
        this.game.current.scene = this;

        this.dispatchEvent({
            type: "changeScene",
            previousScene
        });
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

    public override add(...objects: (Game.Object3D | THREE.Object3D)[]): this {
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

    public override getObjectByProperty(
        name: string,
        value: any
    ): Game.Object3D | THREE.Object3D | undefined {
        return super.getObjectByProperty(name, value);
    }

    public getObjectByUuid(
        uuid: string
    ): Game.Object3D | THREE.Object3D | undefined {
        return this.getObjectByProperty("uuid", uuid);
    }

    public override getObjectById(
        id: number
    ): Game.Object3D | THREE.Object3D | undefined {
        return super.getObjectById(id) as Game.Object3D | undefined;
    }

    public override getObjectByName(
        name: string
    ): Game.Object3D | THREE.Object3D | undefined {
        return super.getObjectByName(name) as Game.Object3D | undefined;
    }

    public override remove(
        ...objects: (Game.Object3D | THREE.Object3D)[]
    ): this {
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

    public override toJSON(): Game.Formats.Scene {
        const obj = super.toJSON();
        delete obj.metadata;
        const json = obj as Game.Formats.Scene;

        json.object.id = this.id;
        json.object.uuid = this.uuid;
        json.object.name = this.name;

        if (this.stage) json.object.stage = this.stage.uuid;
        if (this.game) json.object.game = this.game.uuid;
        if (this.children.length === 0) json.object.children = [];

        json.bodies = this.physics.bodies.map(body => body.toJSON());
        json.object.physics = this.physics.toJSON();

        return json;
    }

    public static fromJSON(json: Game.Formats.Scene): Scene {
        const meta = metaFromObjectJSON(json);
        const scene = new Scene({
            id: json.object.id,
            uuid: json.object.uuid,
            name: json.object.name,
            physics: Game.Physics.fromJSON(json.object.physics)
        });

        const bgIsColor = typeof json.object.background === "number";
        const bgIsTexture = typeof json.object.background === "string";

        if (bgIsColor) {
            const color = json.object.background as THREE.ColorRepresentation;
            scene.background = new THREE.Color(color);
        } else if (bgIsTexture) {
            const textureJSON = json.textures?.find(
                texture => texture.uuid === json.object.background
            );

            if (textureJSON) {
                Game.Texture.fromJSON(textureJSON, meta).then((texture) => {
                    texture.needsUpdate = true;
                    scene.background = texture;
                }).catch((error) => {
                    console.error(error);
                });
            }
        }

        const envIsDefined = json.object.environment !== undefined;
        if (envIsDefined) {
            const textureJSON = json.textures?.find(
                texture => texture.uuid === json.object.environment
            );

            if (textureJSON) {
                Game.Texture.fromJSON(textureJSON, meta).then((texture) => {
                    texture.needsUpdate = true;
                    scene.environment = texture;
                }).catch((error) => {
                    console.error(error);
                });
            }
        }

        if (json.object.fog) {
            if (json.object.fog.type === "Fog") {
                const { color, near, far } = json.object.fog;
                scene.fog = new THREE.Fog(color, near, far);
            } else if (json.object.fog.type === "FogExp2") {
                const { color, density } = json.object.fog;
                scene.fog = new THREE.FogExp2(color, density);
            }
        }

        parseObjectChildren(scene, json, meta);

        return scene;
    }
}

export default Scene;
export type { SceneOptions };