import { Game } from "@local/classes";
import { applyBaseMaterialJSON } from "../utils/private";
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
        const applyMap = (
            mapType:
                "bumpMap" | "normalMap" | "displacementMap",
            json: Game.Formats.Texture
        ) => {
            Game.Texture.fromJSON(json, meta).then((texture) => {
                material[mapType] = texture;
                material.needsUpdate = true;
            }).catch(err => {
                console.error(`Error parsing ${mapType} texture:`, err);
            });
        };

        const {
            bumpMap,
            normalMap,
            displacementMap,

            normalScale,

            ...params
        } = json;
        const textures = meta?.textures || {};
        const material = new MeshNormalMaterial(params);

        if (bumpMap && textures[bumpMap]) {
            const bumpMapJSON = textures[bumpMap];
            applyMap("bumpMap", bumpMapJSON);
        }

        if (normalMap && textures[normalMap]) {
            const normalMapJSON = textures[normalMap];
            applyMap("normalMap", normalMapJSON);
        }

        if (displacementMap && textures[displacementMap]) {
            const displacementMapJSON = textures[displacementMap];
            applyMap("displacementMap", displacementMapJSON);
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