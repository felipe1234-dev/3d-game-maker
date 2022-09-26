import * as THREE from "three";
import { Game } from "@local/classes";

class SpotLight extends THREE.SpotLight implements Game.Object {
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
}

export default SpotLight;
