import * as THREE from "three";
import GameObject from "../Interfaces/GameObject.interface";

class DirectionalLight extends THREE.DirectionalLight implements GameObject {
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