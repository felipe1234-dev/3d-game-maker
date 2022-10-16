import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils/private";
import * as THREE from "three";

class BoxGeometry extends THREE.BoxGeometry implements Game.Geometry {
    public readonly type: "BoxGeometry" = "BoxGeometry";

    public override toJSON(): Game.Formats.BoxGeometry {
        const json = super.toJSON();
        return json;
    }

    public static override fromJSON(
        json: Game.Formats.BoxGeometry
    ): BoxGeometry {
        const box = new BoxGeometry(
            json.width,
            json.height,
            json.depth,
            json.widthSegments,
            json.heightSegments,
            json.depthSegments
        );

        applyBaseGeometryJSON(box, json);

        return box;
    }
}

export default BoxGeometry;