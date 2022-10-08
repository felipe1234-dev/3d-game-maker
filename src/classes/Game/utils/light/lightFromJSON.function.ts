import { Game } from "@local/classes";
import * as THREE from "three";

function lightFromJSON(json: Game.Formats.Light): THREE.Light {
    let light = new THREE.Light();

    if (Game.Formats.isAmbientLight(json)) {
        light = new Game.AmbientLight(json.color, json.intensity);
    } else if (Game.Formats.isDirectionalLight(json)) {
        light = new Game.DirectionalLight(json.color, json.intensity);
    } else if (Game.Formats.isHemisphereLight(json)) {
        light = new Game.HemisphereLight(
            json.skyColor,
            json.groundColor,
            json.intensity
        );
    } else if (Game.Formats.isPointLight(json)) {
        light = new Game.PointLight(
            json.color,
            json.intensity,
            json.distance,
            json.decay
        );
    } else if (Game.Formats.isSpotLight(json)) {
        light = new Game.SpotLight(
            json.color,
            json.intensity,
            json.distance,
            json.angle,
            json.penumbra,
            json.decay
        );
    }

    light.id = json.id;
    light.uuid = json.uuid;
    light.name = json.name || "";

    const matrix = new THREE.Matrix4().fromArray(json.matrix);
    light.applyMatrix4(matrix);

    light.receiveShadow = !!json.receiveShadow;
    light.castShadow = !!json.castShadow;
    light.visible = !!json.visible;
    light.frustumCulled = !!json.frustumCulled;

    if (json.renderOrder) light.renderOrder = json.renderOrder;
    if (json.userData) light.userData = json.userData;

    return light;
}

export default lightFromJSON;