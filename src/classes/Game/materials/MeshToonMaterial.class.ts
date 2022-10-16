import { Game } from "@local/classes";
import { applyBaseMaterialJSON } from "../utils/private";
import * as THREE from "three";

class MeshToonMaterial extends THREE.MeshToonMaterial implements Game.Material {
    public readonly type: "MeshToonMaterial" = "MeshToonMaterial";

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.MeshToonMaterial {
        return super.toJSON(meta);
    }

    public static fromJSON(
        json: Game.Formats.MeshToonMaterial,
        meta?: Game.Formats.Meta
    ): MeshToonMaterial {
        const {
            color, // Color representation
            emissive, // Color representation

            gradientMap, // Map uuid
            map, // Map uuid
            lightMap, // Map uuid
            aoMap, // Map uuid
            emissiveMap, // Map uuid
            bumpMap, // Map uuid
            normalMap, // Map uuid
            displacementMap, // Map uuid
            alphaMap, // Map uuid

            normalScale,

            ...params
        } = json;
        const material = new MeshToonMaterial(params);

        material.color = new THREE.Color(color);
        material.emissive = new THREE.Color(emissive);

        const maps = Object.entries({
            gradientMap,
            map,
            lightMap,
            aoMap,
            emissiveMap,
            bumpMap,
            normalMap,
            displacementMap,
            alphaMap,
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

export default MeshToonMaterial;