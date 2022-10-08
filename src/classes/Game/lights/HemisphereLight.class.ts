import * as THREE from "three";
import { Game } from "@local/classes";
import { applyObject3DJSON, parseObjectChildren } from "../utils/private";

class HemisphereLight extends THREE.HemisphereLight implements Game.Object3D {
    public helper: THREE.HemisphereLightHelper;
    public readonly castShadow: boolean;
    public readonly receiveShadow: boolean;

    constructor(
        skyColor?: THREE.ColorRepresentation,
        groundColor?: THREE.ColorRepresentation,
        intensity?: number
    ) {
        super(skyColor, groundColor, intensity);

        this.helper = new THREE.HemisphereLightHelper(this, 1);
        this.helper.visible = false;

        this.castShadow = false;
        this.receiveShadow = false;
    }

    public set skyColor(skyColor: THREE.ColorRepresentation) {
        this.color = new THREE.Color(skyColor);
    }

    public static fromJSON(
        json: Game.Formats.HemisphereLight,
        meta?: Game.Formats.Meta
    ): HemisphereLight {
        const light = new HemisphereLight(
            json.object.skyColor,
            json.object.groundColor,
            json.object.intensity
        );

        applyObject3DJSON(light, json);
        parseObjectChildren(light, json, meta);

        return light;
    }
}

export default HemisphereLight;