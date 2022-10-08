import * as THREE from "three";
import { Game } from "@local/classes";
import { applyObject3DJSON, parseObjectChildren } from "../utils/private";

class AmbientLight extends THREE.AmbientLight implements Game.Object3D {
    public helper: THREE.BoxHelper;
    public readonly receiveShadow: boolean;

    constructor(color?: THREE.ColorRepresentation, intensity?: number) {
        super(color, intensity);

        this.helper = new THREE.BoxHelper(this);
        this.helper.visible = false;

        this.receiveShadow = false;
        this.castShadow = true;
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