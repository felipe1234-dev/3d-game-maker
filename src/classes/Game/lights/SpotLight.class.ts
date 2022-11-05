import { Game } from "@local/classes";
import {
    applyObject3DJSON,
    generateID,
    parseObjectChildren
} from "../utils/private";
import * as THREE from "three";

interface SpotLightOptions {
    id?: number;
    uuid?: string;
    color?: THREE.ColorRepresentation;
    intensity?: number;
    distance?: number;
    angle?: number;
    penumbra?: number;
    decay?: number;
}

class SpotLight extends THREE.SpotLight implements Game.Object3D {
    public readonly type: "SpotLight";
    public readonly receiveShadow: boolean;
    public helper: THREE.SpotLightHelper;

    constructor(
        options: SpotLightOptions = {}
    ) {
        const {
            id = generateID(),
            uuid = THREE.MathUtils.generateUUID(),
            color,
            intensity,
            distance,
            angle,
            penumbra,
            decay
        } = options;
        super(color, intensity, distance, angle, penumbra, decay);

        this.id = id;
        this.uuid = uuid;
        this.type = "SpotLight";

        this.helper = new THREE.SpotLightHelper(this);
        this.helper.visible = false;

        this.receiveShadow = false;
        this.castShadow = true;
    }

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.SpotLight {
        return super.toJSON(meta ? {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            ...meta
        } : undefined);
    }

    public static fromJSON(
        json: Game.Formats.SpotLight
    ): SpotLight {
        const light = new SpotLight(json.object);

        applyObject3DJSON(light, json);
        parseObjectChildren(light, json);

        return light;
    }
}

export default SpotLight;
export type { SpotLightOptions };