import { Game } from "@local/classes";
import { applyBaseMaterialJSON } from "../utils/private";
import * as THREE from "three";

class MeshBasicMaterial extends THREE.MeshBasicMaterial implements Game.Material {
    public readonly type: "MeshBasicMaterial" = "MeshBasicMaterial";

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.MeshBasicMaterial {
        return super.toJSON(meta);
    }

    public static fromJSON(
        json: Game.Formats.MeshBasicMaterial,
        meta?: Game.Formats.Meta
    ): MeshBasicMaterial {
        const {
            map, // Map uuid
            envMap, // Map uuid
            lightMap, // Map uuid
            aoMap, // Map uuid
            specularMap, // Map uuid
            alphaMap, // Map uuid

            ...params
        } = json;

        const material = new MeshBasicMaterial(params);

        const maps = Object.entries({
            map,
            envMap,
            lightMap,
            aoMap,
            specularMap,
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

        applyBaseMaterialJSON(material, json);

        return material;
    }
}

export default MeshBasicMaterial;