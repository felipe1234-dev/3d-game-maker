import { Game } from "@local/classes";
import { applyBaseMaterialJSON } from "../utils/private";
import * as THREE from "three";

class MeshDistanceMaterial extends THREE.MeshDistanceMaterial implements Game.Material {
    public readonly type: "MeshDistanceMaterial" = "MeshDistanceMaterial";

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.MeshDistanceMaterial {
        return super.toJSON(meta);
    }

    public static fromJSON(
        json: Game.Formats.MeshDistanceMaterial,
        meta?: Game.Formats.Meta
    ): MeshDistanceMaterial {
        const {
            map, // Map uuid
            alphaMap, // Map uuid
            displacementMap, // Map uuid

            ...params
        } = json;

        const material = new MeshDistanceMaterial(params);

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

export default MeshDistanceMaterial;