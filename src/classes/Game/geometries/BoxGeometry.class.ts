import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

class BoxGeometry extends THREE.BoxGeometry implements Game.Geometry {
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

        applyData(box, json.data);

        return box;
    }
}

export default BoxGeometry;