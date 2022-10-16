import { Game } from "@local/classes";
import * as THREE from "three";

interface Material extends THREE.Material {
    type: typeof Game.Libs.materials[number];
    toJSON(): Game.Formats.Material;
}

export default Material;