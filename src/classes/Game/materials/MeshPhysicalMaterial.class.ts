import { Game } from "@local/classes";
import { applyBaseMaterialJSON } from "../utils/private";
import * as THREE from "three";

class MeshPhysicalMaterial extends THREE.MeshPhysicalMaterial implements Game.Material {
    public readonly type: "MeshPhysicalMaterial" = "MeshPhysicalMaterial";

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.MeshPhysicalMaterial {
        return super.toJSON(meta);
    }

    public static fromJSON(
        json: Game.Formats.MeshPhysicalMaterial,
        meta?: Game.Formats.Meta
    ): MeshPhysicalMaterial {
        const {
            color, // Color representation
            emissive, // Color representation
            sheenColor, // Color representation
            attenuationColor, // Color representation
            specularColor, // Color representation 

            map, // Map uuid
            lightMap, // Map uuid
            aoMap, // Map uuid
            emissiveMap, // Map uuid
            bumpMap, // Map uuid
            normalMap, // Map uuid
            displacementMap, // Map uuid
            roughnessMap, // Map uuid
            metalnessMap, // Map uuid
            alphaMap, // Map uuid
            envMap, // Map uuid
            clearcoatRoughnessMap, // Map uuid
            clearcoatMap, // Map uuid
            clearcoatNormalMap, // Map uuid
            sheenColorMap, // Map uuid
            sheenRoughnessMap, // Map uuid
            transmissionMap, // Map uuid
            thicknessMap, // Map uuid
            specularIntensityMap, // Map uuid
            specularColorMap, // Map uuid
            iridescenceMap, // Map uuid
            iridescenceThicknessMap, // Map uuid

            clearcoatNormalScale,
            normalScale,

            ...params
        } = json;
        const material = new MeshPhysicalMaterial(params);

        const colors = Object.entries({
            color,
            emissive,
            sheenColor,
            attenuationColor,
            specularColor,
        });

        for (const [prop, value] of colors) {
            // @ts-ignore
            material[prop] = new THREE.Color(value);
        }

        const maps = Object.entries({
            map,
            lightMap,
            aoMap,
            emissiveMap,
            bumpMap,
            normalMap,
            displacementMap,
            roughnessMap,
            metalnessMap,
            alphaMap,
            envMap,
            clearcoatRoughnessMap,
            clearcoatMap,
            clearcoatNormalMap,
            sheenColorMap,
            sheenRoughnessMap,
            transmissionMap,
            thicknessMap,
            specularIntensityMap,
            specularColorMap,
            iridescenceMap,
            iridescenceThicknessMap,
        });
        const textures = meta?.textures || {};

        for (const [mapType, mapUuid] of maps) {
            if (mapUuid === undefined) continue;

            const mapJSON = textures[mapUuid];
            if (!mapJSON) continue;

            Game.Texture.fromJSON(mapJSON, meta).then((texture) => {
                // @ts-ignore
                material[mapType] = texture;
                material.needsUpdate = true;
            }).catch(err => {
                console.error(`Error parsing ${mapType} texture:`, err);
            });
        }

        if (clearcoatNormalScale) {
            const [x, y] = clearcoatNormalScale;
            material.clearcoatNormalScale = new THREE.Vector2(x, y);
        }

        if (normalScale) {
            const [x, y] = normalScale;
            material.normalScale = new THREE.Vector2(x, y);
        }

        applyBaseMaterialJSON(material, json);

        return material;
    }
}

export default MeshPhysicalMaterial;