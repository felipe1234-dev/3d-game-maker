import { Game } from "@local/classes";
import * as THREE from "three";

interface Material extends THREE.Material {
    toJSON(): Game.Formats.Material;
}

export default Material;