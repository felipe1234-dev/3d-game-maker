import * as THREE from "three";
import { Game } from "@local/classes";

class AmbientLight extends THREE.AmbientLight implements Game.Object {
    public helper: THREE.BoxHelper;
    public readonly receiveShadow: boolean;

    constructor(color?: THREE.ColorRepresentation, intensity?: number) {
        super(color, intensity);

        this.helper = new THREE.BoxHelper(this);
        this.helper.visible = false;

        this.receiveShadow = false;
        this.castShadow = true;
    }
}

export default AmbientLight;
