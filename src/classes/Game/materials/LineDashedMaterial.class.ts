import { Game } from "@local/classes";
import { applyBaseMaterialJSON } from "../utils/private";
import LineBasicMaterial from "./LineBasicMaterial.class";
import * as THREE from "three";

class LineDashedMaterial extends THREE.LineDashedMaterial implements Game.Material {
    public readonly type: "LineDashedMaterial" = "LineDashedMaterial";

    public override toJSON(): Game.Formats.LineDashedMaterial {
        return super.toJSON();
    }

    public static fromJSON(
        json: Game.Formats.LineDashedMaterial
    ): LineDashedMaterial {
        const basicLine = LineBasicMaterial.fromJSON({
            ...json,
            type: "LineBasicMaterial"
        });

        const material = new LineDashedMaterial();

        material.scale = json.scale;
        material.dashSize = json.dashSize;
        material.gapSize = json.gapSize;
        material.color = basicLine.color;
        material.linewidth = basicLine.linewidth;
        material.linecap = basicLine.linecap;
        material.linejoin = basicLine.linejoin;

        applyBaseMaterialJSON(material, json);

        return material;
    }
}

export default LineDashedMaterial;