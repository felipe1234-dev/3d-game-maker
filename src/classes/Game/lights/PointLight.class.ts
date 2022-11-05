import { Game } from "@local/classes";
import {
    generateID,
    applyObject3DJSON,
    parseObjectChildren
} from "../utils/private";
import * as THREE from "three";

interface PointLightOptions {
    id?: number;
    uuid?: string;
    color?: THREE.ColorRepresentation;
    intensity?: number;
    distance?: number;
    decay?: number;
}

class PointLight extends THREE.PointLight implements Game.Object3D {
    public readonly type: "PointLight";
    public readonly receiveShadow: boolean;
    public helper: THREE.PointLightHelper;

    constructor(
        options: PointLightOptions = {}
    ) {
        const {
            id = generateID(),
            uuid = THREE.MathUtils.generateUUID(),
            color,
            intensity,
            distance,
            decay
        } = options;
        super(color, intensity, distance, decay);

        this.id = id;
        this.uuid = uuid;
        this.type = "PointLight";

        this.helper = new THREE.PointLightHelper(this);
        this.helper.visible = false;

        this.receiveShadow = false;
        this.castShadow = true;
    }

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.PointLight {
        return super.toJSON(meta ? {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            ...meta
        } : undefined);
    }

    public static fromJSON(
        json: Game.Formats.PointLight
    ): PointLight {
        const light = new PointLight(json.object);

        applyObject3DJSON(light, json);
        parseObjectChildren(light, json);

        return light;
    }
}

export default PointLight;
export type { PointLightOptions };