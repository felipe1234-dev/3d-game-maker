import * as THREE from "three";
import { Game } from "@local/classes";

class PointLight extends THREE.PointLight implements Game.Object {
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
}

export default PointLight;
