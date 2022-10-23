import { Game } from "@local/classes";
import * as THREE from "three";

/**
 * Standard object conversion from JSON.
 * Receives a Game.Formats.Object3D and applies the properties containing 
 * in the JSON that mandatorily exist in all objects.
 */
function applyObject3DJSON(object: Game.Object3D, json: Game.Formats.Object3D): void {
    object.id = json.object.id;
    object.uuid = json.object.uuid;
    object.name = json.object.name || "";

    const matrix = new THREE.Matrix4().fromArray(json.object.matrix);
    object.applyMatrix4(matrix);

    if (json.object.receiveShadow !== undefined) object.receiveShadow = json.object.receiveShadow;
    if (json.object.castShadow !== undefined) object.castShadow = json.object.castShadow;
    if (json.object.visible !== undefined) object.visible = json.object.visible;
    if (json.object.frustumCulled !== undefined) object.frustumCulled = json.object.frustumCulled;
    if (json.object.renderOrder !== undefined) object.renderOrder = json.object.renderOrder;
    if (json.object.userData instanceof Object) object.userData = json.object.userData;
}

export default applyObject3DJSON;