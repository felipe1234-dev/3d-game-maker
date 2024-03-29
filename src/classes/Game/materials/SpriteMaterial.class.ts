import { Game } from "@local/classes";
import { applyBaseMaterialJSON } from "../utils";
import * as THREE from "three";

class SpriteMaterial extends THREE.SpriteMaterial implements Game.Material {
    public readonly type: "SpriteMaterial" = "SpriteMaterial";

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.SpriteMaterial {
        return super.toJSON(meta);
    }

    public static fromJSON(
        json: Game.Formats.SpriteMaterial,
        meta?: Game.Formats.Meta
    ): SpriteMaterial {
        const {
            map, // Map uuid
            alphaMap, // Map uuid

            ...params
        } = json;
        const material = new SpriteMaterial(params);

        const maps = Object.entries({ map, alphaMap });
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

export default SpriteMaterial;