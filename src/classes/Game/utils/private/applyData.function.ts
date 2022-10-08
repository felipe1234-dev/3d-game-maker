import { Game } from "@local/classes";
import * as THREE from "three";
import bufferAttributeFromJSON from "./bufferAttributeFromJSON.function";

function applyData(
    geometry: THREE.BufferGeometry,
    data: Game.Formats.Geometry["data"]
): void {
    if (data.index) {
        const attribute = bufferAttributeFromJSON(data.index);
        geometry.setIndex(attribute);
    }

    if (data.attributes) {
        const attributes = Object.entries(data.attributes);

        for (const [name, attributeJSON] of attributes) {
            geometry.setAttribute(name, bufferAttributeFromJSON(attributeJSON));
        }
    }

    if (data.morphAttributes) {
        const morphAttributes = Object.entries(data.morphAttributes);
        const newMorphAttributes: {
            [name: string]: THREE.BufferAttribute[];
        } = {};

        for (const [name, list] of morphAttributes) {
            newMorphAttributes[name] = list.map(attributeJSON =>
                bufferAttributeFromJSON(attributeJSON)
            );
        }

        geometry.morphAttributes = newMorphAttributes;
        if (data.morphTargetsRelative !== undefined)
            geometry.morphTargetsRelative = data.morphTargetsRelative;
    }

    if (data.groups && data.groups.length > 0) {
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
}

export default applyData;