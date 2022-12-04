import { Game } from "@local/classes";
import { applyBaseMaterialJSON } from "../utils";
import * as THREE from "three";

class MeshDepthMaterial extends THREE.MeshDepthMaterial implements Game.Material {
    public readonly type: "MeshDepthMaterial" = "MeshDepthMaterial";

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.MeshDepthMaterial {
        return super.toJSON(meta);
    }

    public static fromJSON(
        json: Game.Formats.MeshDepthMaterial,
        meta?: Game.Formats.Meta
    ): MeshDepthMaterial {
        const {
            map, // Map uuid
            alphaMap, // Map uuid
            displacementMap, // Map uuid

            ...params
        } = json;

        const material = new MeshDepthMaterial(params);

        const maps = Object.entries({
            map,
            alphaMap,
            displacementMap,
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

        applyBaseMaterialJSON(material, json);

        return material;
    }
}

export default MeshDepthMaterial;