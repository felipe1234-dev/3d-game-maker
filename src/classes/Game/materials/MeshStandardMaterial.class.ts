import { Game } from "@local/classes";
import { applyBaseMaterialJSON } from "../utils/private";
import * as THREE from "three";

class MeshStandardMaterial extends THREE.MeshStandardMaterial implements Game.Material {
    public readonly type: "MeshStandardMaterial" = "MeshStandardMaterial";

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.MeshStandardMaterial {
        return super.toJSON(meta);
    }

    public static fromJSON(
        json: Game.Formats.MeshStandardMaterial,
        meta?: Game.Formats.Meta
    ): MeshStandardMaterial {
        const {
            color, // Color representation
            emissive, // Color representation

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

            normalScale,

            ...params
        } = json;
        const material = new MeshStandardMaterial(params);

        material.color = new THREE.Color(color);
        material.emissive = new THREE.Color(emissive);

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

        if (normalScale) {
            const [x, y] = normalScale;
            material.normalScale = new THREE.Vector2(x, y);
        }

        applyBaseMaterialJSON(material, json);

        return material;
    }
}

export default MeshStandardMaterial;