import * as THREE from "three";
import { Game } from "@local/classes";

function geometryToJSON(geometry: THREE.BufferGeometry): Game.Formats.Geometry {
    const json = geometry.toJSON();

    json.name = geometry.name;
    if (geometry.index)
        json.data.index = Game.Utils.bufferAttribute.toJSON(geometry.index);

    return json;
}

export default geometryToJSON;