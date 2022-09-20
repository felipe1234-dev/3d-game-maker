import * as THREE from "three";
import GameObject from "../Interfaces/GameObject.interface";

class PointLight extends THREE.PointLight implements GameObject {
    public helper: THREE.PointLightHelper;

    constructor(
        color?: THREE.ColorRepresentation, 
        intensity?: number, 
        distance?: number, 
        decay?: number
    ) {
        super(color, intensity, distance, decay);

        this.helper = new THREE.PointLightHelper(this);
        this.helper.visible = false;

        this.receiveShadow = true;
        this.castShadow = true;
    }
}

export default PointLight;