import * as THREE from "three";
import { Game } from "@local/classes";
import { applyObject3DJSON, parseObjectChildren } from "../utils/private";

class DirectionalLight extends THREE.DirectionalLight implements Game.Object3D {
    public helper: THREE.DirectionalLightHelper;
    public readonly receiveShadow: boolean;

    constructor(color?: THREE.ColorRepresentation, intensity?: number) {
        super(color, intensity);

        this.helper = new THREE.DirectionalLightHelper(this);
        this.helper.visible = false;

        this.receiveShadow = false;
        this.castShadow = true;
    }

    public static fromJSON(
        json: Game.Formats.DirectionalLight,
        meta?: Game.Formats.Meta
    ): DirectionalLight {
        const light = new DirectionalLight(
            json.object.color,
            json.object.intensity,
        );

        applyObject3DJSON(light, json);
        parseObjectChildren(light, json, meta);

        return light;
    }
}

export default DirectionalLight;