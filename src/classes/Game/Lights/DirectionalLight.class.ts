import * as THREE from "three";
import { Game } from "@local/classes";

class DirectionalLight extends THREE.DirectionalLight implements Game.Object {
    public helper: THREE.DirectionalLightHelper;
    public readonly receiveShadow: boolean;

    constructor(color?: THREE.ColorRepresentation, intensity?: number) {
        super(color, intensity);

        this.helper = new THREE.DirectionalLightHelper(this);
        this.helper.visible = false;

        this.receiveShadow = false;
        this.castShadow = true;
    }
}

export default DirectionalLight;
