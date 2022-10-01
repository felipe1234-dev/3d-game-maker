import * as THREE from "three";
import { Game } from "@local/classes";

/**
 * @param {Game.Formats.Geometry} json
 * @returns {THREE.BufferGeometry}
 */
function geometryFromJSON(json) {
    /**
     * @type {THREE.BufferGeometry}
     */
    const mock = new THREE[json.type]();

    const args = [];

    for (const param in mock.parameters) {
        args.push(json[param]);
    }

    /**
     * @type {THREE.BufferGeometry}
     */
    const geometry = new THREE[json.type](...args);

    geometry.uuid = json.uuid;
    geometry.name = json.name || "";

    const data = json.data;

    if (data.index) {
        const attribute = Game.Utils.bufferAttribute.fromJSON(data.index);
        geometry.setIndex(attribute);
    }

    if (data.attributes) {
        const attributes = Object.entries(data.attributes);

        for (const [name, attributeJSON] of attributes) {
            geometry.setAttribute(
                name,
                Game.Utils.bufferAttribute.fromJSON(attributeJSON)
            );
        }
    }

    if (data.morphAttributes) {
        const morphAttributes = Object.entries(data.morphAttributes);
        /**
         * @type {{
         *     [name: string]: THREE.BufferAttribute[]
         * }}
         */
        const newMorphAttributes = {};

        for (const [name, list] of morphAttributes) {
            newMorphAttributes[name] = list.map(attributeJSON =>
                Game.Utils.bufferAttribute.fromJSON(attributeJSON)
            );
        }

        geometry.morphAttributes = newMorphAttributes;
        if (data.morphTargetsRelative !== undefined)
            geometry.morphTargetsRelative = data.morphTargetsRelative;
    }

    if (data.groups?.length > 0) {
        geometry.groups = JSON.parse(JSON.stringify(data.groups));
    }

    if (data.boundingSphere) {
        const sphereJSON = data.boundingSphere;
        const center = sphereJSON.center;
        const [x, y, z] = center;
        const radius = sphereJSON.radius;

        geometry.boundingSphere = new THREE.Sphere(
            new THREE.Vector3(x, y, z),
            radius
        );
    }

    return geometry;
}

export default geometryFromJSON;