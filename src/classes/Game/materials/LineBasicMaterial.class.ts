import { Game } from "@local/classes";
import { applyBaseMaterialJSON } from "../utils/private";
import * as THREE from "three";

class LineBasicMaterial extends THREE.LineBasicMaterial implements Game.Material {
    public readonly type: "LineBasicMaterial" = "LineBasicMaterial";

    public override toJSON(): Game.Formats.LineBasicMaterial {
        return super.toJSON();
    }

    public static fromJSON(
        json: Game.Formats.LineBasicMaterial
    ): LineBasicMaterial {
        const material = new LineBasicMaterial();

        material.color = new THREE.Color(json.color);

        if (json.linewidth !== undefined)
            material.linewidth = json.linewidth;
        if (json.linecap !== undefined)
            material.linecap = json.linecap;
        if (json.linejoin !== undefined)
            material.linejoin = json.linejoin;

        applyBaseMaterialJSON(material, json);

        return material;
    }
}

export default LineBasicMaterial;