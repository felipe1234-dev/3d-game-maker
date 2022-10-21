import * as THREE from "three";
import { Game } from "@local/classes";
import { applyObject3DJSON, parseObjectChildren } from "../utils/private";

class PointLight extends THREE.PointLight implements Game.Object3D {
    public readonly type: "PointLight";
    public readonly receiveShadow: boolean;
    public helper: THREE.PointLightHelper;
    public children: Game.Object3D[];

    constructor(
        color?: THREE.ColorRepresentation,
        intensity?: number,
        distance?: number,
        decay?: number
    ) {
        super(color, intensity, distance, decay);

        this.type = "PointLight";

        this.helper = new THREE.PointLightHelper(this);
        this.helper.visible = false;

        this.receiveShadow = false;
        this.castShadow = true;

        this.children = [];
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
        json: Game.Formats.PointLight,
        meta?: Game.Formats.Meta
    ): PointLight {
        const light = new PointLight(
            json.object.color,
            json.object.intensity,
            json.object.distance,
            json.object.decay,
        );

        applyObject3DJSON(light, json);
        parseObjectChildren(light, json, meta);

        return light;
    }
}

export default PointLight;