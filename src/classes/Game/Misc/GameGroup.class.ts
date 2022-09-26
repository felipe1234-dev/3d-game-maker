import * as THREE from "three";
import { Game } from "@local/classes";

class GameGroup extends THREE.Group implements Game.Object {
    public helper: THREE.BoxHelper;

    constructor() {
        super();

        this.helper = new THREE.BoxHelper(this);
        this.helper.visible = false;
    }
}

export default GameGroup;