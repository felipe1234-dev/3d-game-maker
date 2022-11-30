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

    background?: THREE.Color | Game.Texture | null;
    environment?: Game.Texture | null;
    fog?: Game.FogBase | null;
    controls?: Game.Controls[];

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
    public controls: Game.Controls[];

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
            controls = [],

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
            this.addObject(object);
        }

        this.controls = [];

        for (const control of controls) {
            this.addControls(control);
        }
    }

    public get cameras(): Game.Camera[] {
        const cameras: Game.Camera[] = [];

        for (const child of this.children) {
            if (Game.isCamera(child)) {
                cameras.push(child);
            }
        }

        return cameras;
    }

    public get meshes(): Game.Mesh[] {
        const meshes: Game.Mesh[] = [];

        for (const child of this.children) {
            if (child instanceof Game.Mesh) {
                meshes.push(child);
            }
        }

        return meshes;
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
            type: "selectScene",
            previousScene
        });
        this.game.dispatchEvent({
            type: "selectScene",
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

    // Objects

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

    public override add(
        ...objects: (Game.Object3D | THREE.Object3D)[]
    ): this {
        for (const object of objects) {
            const alreadyAdded = !!this.getObjectByUuid(object.uuid);

            if (alreadyAdded) continue;

            if (object instanceof Game.Mesh && object.body) {
                this.physics.addBody(object.body);
            }

            super.add(object);
        }

        this.dispatchEvent({
            type: "addObjects",
            objects: [...objects],
        });

        return this;
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

    public addObject(
        ...objects: (Game.Object3D | THREE.Object3D)[]
    ): this {
        return this.add(...objects);
    }

    public removeObject(
        ...objects: (Game.Object3D | THREE.Object3D)[]
    ): this {
        return this.remove(...objects);
    }

    // Controls

    public addControls(
        ...controls: Game.Controls[]
    ): void {
        for (const control of controls) {
            this.controls.push(control);
            this.addObject(control.mesh, control.camera);
        }
    }

    public removeControls(
        ...controls: Game.Controls[]
    ): void {
        for (const control of controls) {
            control.disconnect();
        }

        const controlsUuids = controls.map(control => control.uuid);
        this.controls = this.controls.filter(control => !controlsUuids.includes(control.uuid));
    }

    public getControlsByProperty(
        name: string,
        value: any
    ): Game.Controls | undefined {
        return this.controls.find(control => (
            // @ts-ignore
            control[name] === value
        ));
    }

    public getControlsByUuid(uuid: string): Game.Controls | undefined {
        return this.getControlsByProperty("uuid", uuid);
    }

    public getControlsById(id: number): Game.Controls | undefined {
        return this.getControlsByProperty("id", id);
    }

    public getControlsByName(name: string): Game.Controls | undefined {
        return this.getControlsByProperty("name", name);
    }

    // Cameras

    public addCamera(
        ...cameras: Game.Camera[]
    ): void {
        for (const camera of cameras) {
            this.addObject(camera);
        }
    }

    public removeCamera(
        ...cameras: Game.Camera[]
    ): void {
        for (const camera of cameras) {
            this.removeObject(camera);
        }
    }

    public getCameraByProperty(
        name: string,
        value: any
    ): Game.Camera | undefined {
        const object = this.getObjectByProperty(name, value);
        return Game.isCamera(object) ? object : undefined;
    }

    public getCameraByUuid(uuid: string): Game.Camera | undefined {
        return this.getCameraByProperty("uuid", uuid);
    }

    public getCameraById(id: number): Game.Camera | undefined {
        return this.getCameraByProperty("id", id);
    }

    public getCameraByName(name: string): Game.Camera | undefined {
        return this.getCameraByProperty("name", name);
    }

    // Conversions

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
        json.object.controls = this.controls.map(control => control.toJSON());

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
                scene.fog = new Game.Fog(color, near, far);
            } else if (json.object.fog.type === "FogExp2") {
                const { color, density } = json.object.fog;
                scene.fog = new Game.FogExp2(color, density);
            }
        }

        const metaObjects = meta.objects;
        if (metaObjects) {
            for (const controlJson of json.object.controls || []) {
                let control: Game.Controls | undefined = undefined;

                for (const type of Game.Libs.controls) {
                    if (Game.Formats[`is${type}`](controlJson)) {
                        control = Game[type].fromJSON(controlJson, {
                            objects: metaObjects,
                            ...meta
                        });
                    }
                }

                if (control) scene.addControls(control);
            }
        }

        parseObjectChildren(scene, json);

        return scene;
    }
}

export default Scene;
export type { SceneOptions };