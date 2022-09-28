import * as THREE from "three";
import { Game } from "@local/classes";
import GamePhysics from "./Physics.class";

class Scene extends THREE.Scene {
    static DEFAULT_BACKGROUND: THREE.Color = new THREE.Color("#444");
    static DEFAULT_ENVIRONMENT: null = null;
    static DEFAULT_FOG: null = null;
    static DEFAULT_PHYSICS: GamePhysics = new GamePhysics();

    public game?: Game.Core;
    public stage?: Game.Stage;
    public physics: GamePhysics;

    constructor(
        options: Game.SceneOptions = {
            name: "",
            children: [],
        }
    ) {
        super();

        const {
            id = Game.generateID(),
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

    public override toJSON(): Game.SceneFormat {
        const json = super.toJSON() as Game.SceneFormat;

        json.object.id = this.id;
        if (this.stage) json.object.stage = this.stage.uuid;
        if (this.game) json.object.game = this.game.uuid;

        json.bodies = [];
        for (const body of this.physics.bodies) {
            json.bodies.push(body.toJSON());
        }

        json.object.physics = this.physics.toJSON();

        return json;
    }

    public static fromJSON(json: Game.SceneFormat): Game.Scene {
        let background: THREE.Color | THREE.Texture | null = null;
        const bgIsColor = typeof json.object.background === "number";
        const bgIsTexture = typeof json.object.background === "string";

        if (bgIsColor) {
            const color = json.object.background as THREE.ColorRepresentation;
            background = new THREE.Color(color);
        }

        if (bgIsTexture) {
            const texture = json.textures?.find(
                texture => texture.uuid === json.object.background
            );
            const image = json.images?.find(
                image => image.uuid === texture?.image
            );

            if (texture && image) {
                background = textureFromJSON(texture, image.url);
            }
        }

        let environment: THREE.Texture | null = null;
        const envIsTexture = typeof json.object.environment === "string";

        if (envIsTexture) {
            const texture = json.textures?.find(
                texture => texture.uuid === json.object.environment
            );
            const image = json.images?.find(
                image => image.uuid === texture?.image
            );

            if (texture && image) {
                environment = textureFromJSON(texture, image.url);
            }
        }

        let fog: THREE.FogBase | null = null;
        if (json.object.fog) {
            if (json.object.fog.type === "Fog") {
                const { color, near, far } = json.object.fog;
                fog = new THREE.Fog(color, near, far);
            } else if (json.object.fog.type === "FogExp2") {
                const { color, density } = json.object.fog;
                fog = new THREE.FogExp2(color, density);
            }
        }

        const scene = new Game.Scene({
            id: json.object.id,
            uuid: json.object.uuid,
            name: json.object.name,
            background,
            environment,
            fog,
            physics: GamePhysics.fromJSON(json.object.physics),
        });

        for (const objectJSON of json.object.children) {
            const meta: Game.MetaFormat = {};

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

function textureFromJSON(json: Game.TextureFormat, url: string): THREE.Texture {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(url);

    texture.uuid = json.uuid;
    texture.name = json.name;

    const [wrapS, wrapT] = json.wrap;
    texture.wrapS = wrapS;
    texture.wrapT = wrapT;

    texture.magFilter = json.magFilter;
    texture.minFilter = json.minFilter;

    texture.format = json.format;
    texture.type = json.type;
    texture.encoding = json.encoding;
    texture.anisotropy = json.anisotropy;
    texture.mapping = json.mapping;

    const [rx, ry] = json.repeat;
    texture.repeat = new THREE.Vector2(rx, ry);

    const [ox, oy] = json.offset;
    texture.offset = new THREE.Vector2(ox, oy);

    const [cx, cy] = json.center;
    texture.center = new THREE.Vector2(cx, cy);

    texture.rotation = json.rotation;
    texture.flipY = json.flipY;

    texture.premultiplyAlpha = json.premultiplyAlpha;
    texture.unpackAlignment = json.unpackAlignment;

    texture.userData = json.userData;
    texture.needsUpdate = true;

    return texture;
}