import * as THREE from "three";
import GameObject from "../Interfaces/GameObject.interface";

class GameGroup extends THREE.Group implements GameObject {
    public helper: THREE.BoxHelper;
    
    constructor() {
        super();

        this.helper = new THREE.BoxHelper(this);
        this.helper.visible = false;
    }
}

export default GameGroup;