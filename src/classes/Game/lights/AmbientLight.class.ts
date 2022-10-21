import * as THREE from "three";
import { Game } from "@local/classes";
import { applyObject3DJSON, parseObjectChildren } from "../utils/private";

class AmbientLight extends THREE.AmbientLight implements Game.Object3D {
    public readonly type: "AmbientLight";
    public readonly receiveShadow: boolean;
    public helper: THREE.BoxHelper;

    constructor(color?: THREE.ColorRepresentation, intensity?: number) {
        super(color, intensity);

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

    public static fromJSON(
        json: Game.Formats.AmbientLight,
        meta?: Game.Formats.Meta
    ): AmbientLight {
        const light = new AmbientLight(
            json.object.color,
            json.object.intensity,
        );

        applyObject3DJSON(light, json);
        parseObjectChildren(light, json, meta);

        return light;
    }
}

export default AmbientLight;