import * as THREE from "three";

class Scene extends THREE.Scene {
    constructor(name: string) {
        super();
        this.name = name;
    }
}

export default Scene;