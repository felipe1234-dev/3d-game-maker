import * as THREE from "three";
import { Game } from "@local/classes";

function meshFromJSON(
    json: Game.Formats.Mesh,
    meta?: Game.Formats.Meta
): Game.Mesh {
    let geometry: THREE.BufferGeometry | undefined = undefined;
    let material: THREE.Material | undefined = undefined;
    let body: Game.Body | undefined = undefined;

    const geometries = meta?.geometries || {};
    const materials = meta?.materials || {};
    const bodies = meta?.bodies || {};

    const geometryUid = json.geometry || "";
    const materialUid = json.material || "";
    const bodyUid = json.body || "";

    if (geometries[geometryUid]) {
        const geomJSON = geometries[geometryUid];

        geometry = Game.Utils.geometry.fromJSON(geomJSON);
    }

    if (materials[materialUid]) {
        const matJSON = materials[materialUid];

        material = Game.Utils.material.fromJSON(matJSON);
    }

    if (bodies[bodyUid]) {
        const bodyJSON = bodies[bodyUid];

        body = Game.Utils.body.fromJSON(bodyJSON);
    }

    const mesh = new Game.Mesh(geometry, material, body);

    mesh.id = json.id;
    mesh.uuid = json.uuid;
    mesh.name = json.name || "";

    const matrix = new THREE.Matrix4().fromArray(json.matrix);
    mesh.applyMatrix4(matrix);

    for (const child of json.children || []) {
    }

    mesh.receiveShadow = !!json.receiveShadow;
    mesh.castShadow = !!json.castShadow;
    mesh.visible = !!json.visible;
    mesh.frustumCulled = !!json.frustumCulled;

    if (json.renderOrder) mesh.renderOrder = json.renderOrder;
    if (json.userData) mesh.userData = json.userData;

    return mesh;
}

export default meshFromJSON;