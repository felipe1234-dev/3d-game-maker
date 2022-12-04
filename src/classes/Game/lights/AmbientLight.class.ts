import { Game } from "@local/classes";
import {
    applyObject3DJSON,
    generateID,
    parseObjectChildren
} from "../utils";
import * as THREE from "three";
interface AmbientLightOptions {
    id?: number;
    uuid?: string;
    color?: THREE.ColorRepresentation;
    intensity?: number;
}

class AmbientLight extends THREE.AmbientLight implements Game.Object3D {
    public readonly type: "AmbientLight";
    public readonly receiveShadow: boolean;
    public helper: THREE.BoxHelper;

    constructor(
        options: AmbientLightOptions = {}
    ) {
        const {
            id = generateID(),
            uuid = THREE.MathUtils.generateUUID(),
            color = "#fff",
            intensity = 1
        } = options;
        super(color, intensity);

        this.id = id;
        this.uuid = uuid;
        this.type = "AmbientLight";

        this.helper = new THREE.BoxHelper(this);
        this.helper.visible = false;

        this.receiveShadow = false;
        this.castShadow = true;
    }

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.AmbientLight {
        return super.toJSON(meta ? {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            ...meta
        } : undefined);
    }

    public static fromJSON(json: Game.Formats.AmbientLight): AmbientLight {
        const light = new AmbientLight(json.object);

        applyObject3DJSON(light, json);
        parseObjectChildren(light, json);

        return light;
    }
}

export default AmbientLight;
export type { AmbientLightOptions };