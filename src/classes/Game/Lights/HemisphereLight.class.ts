import * as THREE from "three";
import GameObject from "../Interfaces/GameObject.interface";

class HemisphereLight extends THREE.HemisphereLight implements GameObject {
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
}

export default HemisphereLight;