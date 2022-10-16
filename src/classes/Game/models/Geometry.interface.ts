import { Game } from "@local/classes";
import * as THREE from "three";

interface Geometry extends THREE.BufferGeometry {
    type: typeof Game.Libs.geometries[number];
    parameters: any;
    toJSON: () => Game.Formats.Geometry;
}

export default Geometry;