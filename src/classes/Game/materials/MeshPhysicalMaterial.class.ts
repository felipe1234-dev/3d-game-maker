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
            sheenColor, // Color representation
            attenuationColor, // Color representation
            specularColor, // Color representation 

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

            ...params
        } = json;
        const material = new MeshPhysicalMaterial(params);

        material.sheenColor = new THREE.Color(sheenColor);
        material.attenuationColor = new THREE.Color(attenuationColor);
        material.specularColor = new THREE.Color(specularColor);

        const maps = Object.entries({
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

        applyBaseMaterialJSON(material, json);

        return material;
    }
}

export default MeshPhysicalMaterial;