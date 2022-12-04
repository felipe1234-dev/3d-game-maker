import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils";
import * as THREE from "three";

class PlaneGeometry extends THREE.PlaneGeometry implements Game.Geometry {
    public readonly type: "PlaneGeometry" = "PlaneGeometry";

    public override toJSON(): Game.Formats.PlaneGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.PlaneGeometry
    ): PlaneGeometry {
        const plane = new PlaneGeometry(
            json.width,
            json.height,
            json.widthSegments,
            json.heightSegments,
        );

        applyBaseGeometryJSON(plane, json);

        return plane;
    }
}

export default PlaneGeometry;