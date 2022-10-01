import * as THREE from "three";

/**
 *
 * @param {Game.Formats.Material} json
 * @param {Game.Formats.Meta=} meta
 * @returns {THREE.Material}
 */
function materialFromJSON(json, meta) {
    const material = new THREE[json.type]();

    const colors = [
        "color",
        "sheenColor",
        "emissive",
        "specular",
        "specularColor",
        "attenuationColor",
    ];
    const vectors = ["clearcoatNormalScale", "normalScale"];
    const textures = [
        "clearcoatMap",
        "clearcoatRoughnessMap",
        "clearcoatNormalMap",

        "iridescenceMap",
        "iridescenceThicknessMap",

        "map",
        "matcap",
        "alphaMap",

        "lightMap",

        "aoMap",

        "bumpMap",

        "normalMap",

        "displacementMap",
        "roughnessMap",
        "metalnessMap",
        "emissiveMap",
        "specularMap",
        "specularIntensityMap",
        "specularColorMap",
        "envMap",
    ];

    for (const key in json) {
        if (colors.includes(key)) {
            const color = new THREE.Color(json[key]);
            material[key] = color;
        } else if (vectors.includes(key)) {
            const [x, y, z, w] = json[key];
            let vector;

            if (
                x !== undefined &&
                y !== undefined &&
                z !== undefined &&
                w !== undefined
            ) {
                vector = new THREE.Vector4(x, y, z, w);
            } else if (x !== undefined && y !== undefined && z !== undefined) {
                vector = new THREE.Vector3(x, y, z);
            } else if (x !== undefined && y !== undefined) {
                vector = new THREE.Vector2(x, y);
            }

            if (vector) material[key] = vector;
        } else if (textures.includes(key)) {
        }

        material.needsUpdate = true;
    }

    return material;
}

export default materialFromJSON;