import { Game } from "@local/classes";
import { applyBaseMaterialJSON } from "../utils";
import * as THREE from "three";

class MeshLambertMaterial extends THREE.MeshLambertMaterial implements Game.Material {
    public readonly type: "MeshLambertMaterial" = "MeshLambertMaterial";

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.MeshLambertMaterial {
        return super.toJSON(meta);
    }

    public static fromJSON(
        json: Game.Formats.MeshLambertMaterial,
        meta?: Game.Formats.Meta
    ): MeshLambertMaterial {
        const {
            emissiveMap, // Map uuid
            map, // Map uuid
            lightMap, // Map uuid
            aoMap, // Map uuid
            specularMap, // Map uuid
            alphaMap, // Map uuid
            envMap, // Map uuid

            ...params
        } = json;

        const material = new MeshLambertMaterial(params);

        const maps = Object.entries({
            emissiveMap,
            map,
            lightMap,
            aoMap,
            specularMap,
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

        applyBaseMaterialJSON(material, json);

        return material;
    }
}

export default MeshLambertMaterial;