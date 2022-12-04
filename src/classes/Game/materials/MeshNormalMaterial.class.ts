import { Game } from "@local/classes";
import { applyBaseMaterialJSON } from "../utils";
import * as THREE from "three";

class MeshNormalMaterial extends THREE.MeshNormalMaterial implements Game.Material {
    public readonly type: "MeshNormalMaterial" = "MeshNormalMaterial";

    public override toJSON(
        meta?: Game.Formats.Meta
    ): Game.Formats.MeshNormalMaterial {
        return super.toJSON(meta);
    }

    public static fromJSON(
        json: Game.Formats.MeshNormalMaterial,
        meta?: Game.Formats.Meta
    ): MeshNormalMaterial {
        const {
            bumpMap,
            normalMap,
            displacementMap,

            normalScale,

            ...params
        } = json;
        const textures = meta?.textures || {};
        const material = new MeshNormalMaterial(params);

        const maps = Object.entries({
            bumpMap,
            normalMap,
            displacementMap,
        });

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

export default MeshNormalMaterial;