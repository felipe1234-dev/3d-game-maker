import { Game } from "@local/classes";
import * as THREE from "three";

interface Geometry extends THREE.BufferGeometry {
    toJSON(): Game.Formats.Geometry;
}

export default Geometry;