import * as THREE from "three";
import { Game } from "@local/classes";
import { applyObject3DJSON, parseObjectChildren } from "../utils/private";

class SpotLight extends THREE.SpotLight implements Game.Object3D {
    public helper: THREE.SpotLightHelper;
    public readonly receiveShadow: boolean;

    constructor(
        color?: THREE.ColorRepresentation,
        intensity?: number,
        distance?: number,
        angle?: number,
        penumbra?: number,
        decay?: number
    ) {
        super(color, intensity, distance, angle, penumbra, decay);

        this.helper = new THREE.SpotLightHelper(this);
        this.helper.visible = false;

        this.receiveShadow = false;
        this.castShadow = true;
    }

    public static fromJSON(
        json: Game.Formats.SpotLight,
        meta?: Game.Formats.Meta,
    ): SpotLight {
        const light = new SpotLight(
            json.object.color,
            json.object.intensity,
            json.object.distance,
            json.object.angle,
            json.object.penumbra,
            json.object.decay
        );

        applyObject3DJSON(light, json);
        parseObjectChildren(light, json, meta);

        return light;
    }
}

export default SpotLight;