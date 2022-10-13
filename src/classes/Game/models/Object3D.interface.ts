import * as THREE from "three";
import { Game } from "@local/classes";

interface Object3D extends THREE.Object3D {
    helper?: Game.Helper;
    children: (Object3D | THREE.Object3D)[];
    toJSON: (meta?: Game.Formats.Meta) => Game.Formats.Object3D;
}

export default Object3D;