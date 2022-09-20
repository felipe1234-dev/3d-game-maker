import * as THREE from "three";
import GameObject from "../Interfaces/GameObject.interface";

class HemisphereLight extends THREE.HemisphereLight implements GameObject {
    public helper: THREE.HemisphereLightHelper;
    
    constructor(
        skyColor?: THREE.ColorRepresentation, 
        groundColor?: THREE.ColorRepresentation, 
        intensity?: number
    ) {
        super(skyColor, groundColor, intensity);

        this.helper = new THREE.HemisphereLightHelper(this, 1);
        this.helper.visible = false;

        this.receiveShadow = true;
        this.castShadow = true;
    }
}

export default HemisphereLight;