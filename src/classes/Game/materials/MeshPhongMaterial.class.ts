import { Game } from "@local/classes";
import * as THREE from "three";
import { applyBaseMaterialJSON } from "../utils/private";

class MeshPhongMaterial extends THREE.MeshPhongMaterial implements Game.Material {
    public readonly type: "MeshPhongMaterial" = "MeshPhongMaterial";

    public override toJSON(meta?: Game.Formats.Meta): Game.Formats.MeshPhongMaterial {
        return super.toJSON(meta);
    }

    public static fromJSON(
        json: Game.Formats.MeshPhongMaterial,
        meta?: Game.Formats.Meta
    ): MeshPhongMaterial {
        const {
            map, // Map uuid
            lightMap, // Map uuid
            aoMap, // Map uuid
            emissiveMap, // Map uuid
            bumpMap, // Map uuid
            displacementMap, // Map uuid
            normalMap, // Map uuid
            specularMap, // Map uuid
            alphaMap, // Map uuid
            envMap, // Map uuid

            normalScale,

            ...params
        } = json;
        const material = new MeshPhongMaterial(params);

        const maps = Object.entries({
            map,
            lightMap,
            aoMap,
            emissiveMap,
            bumpMap,
            displacementMap,
            normalMap,
            specularMap,
            alphaMap,
            envMap
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

export default MeshPhongMaterial;