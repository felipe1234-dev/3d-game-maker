import { Game } from "@local/classes";
import { applyBaseMaterialJSON } from "../utils";
import * as THREE from "three";

class MeshMatcapMaterial extends THREE.MeshMatcapMaterial implements Game.Material {
    public readonly type: "MeshMatcapMaterial" = "MeshMatcapMaterial";

    public override toJSON(meta?: Game.Formats.Meta): Game.Formats.MeshMatcapMaterial {
        return super.toJSON(meta);
    }

    public static fromJSON(
        json: Game.Formats.MeshMatcapMaterial,
        meta?: Game.Formats.Meta
    ): MeshMatcapMaterial {
        const {
            matcap, // Map uuid
            map, // Map uuid
            bumpMap, // Map uuid
            normalMap, // Map uuid
            displacementMap, // Map uuid
            alphaMap, // Map uuid

            normalScale,

            ...params
        } = json;

        const material = new MeshMatcapMaterial(params);

        const maps = Object.entries({
            matcap,
            map,
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

export default MeshMatcapMaterial;