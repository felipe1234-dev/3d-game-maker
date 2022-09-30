import * as THREE from "three";

/**
 *
 * @param {Game.Formats.Material} json
 * @param {Game.Formats.Meta=} meta
 * @returns {THREE.Material}
 */
function materialFromJSON(json, meta) {
    const material = new THREE[json.type]();

    const colors = [];
    const vectors = [];
    const maps = [];

    for (const key in json) {
        material[key] = json[key];
    }

    return material;
}

export default materialFromJSON;