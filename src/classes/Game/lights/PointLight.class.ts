import * as THREE from "three";
import { Game } from "@local/classes";
import { applyObject3DJSON, parseObjectChildren } from "../utils/private";

class PointLight extends THREE.PointLight implements Game.Object3D {
    public helper: THREE.PointLightHelper;
    public readonly receiveShadow: boolean;

    constructor(
        color?: THREE.ColorRepresentation,
        intensity?: number,
        distance?: number,
        decay?: number
    ) {
        super(color, intensity, distance, decay);

        this.helper = new THREE.PointLightHelper(this);
        this.helper.visible = false;

        this.receiveShadow = false;
        this.castShadow = true;
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