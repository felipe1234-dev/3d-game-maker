import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils/private";
import * as THREE from "three";

class CircleGeometry extends THREE.CircleGeometry implements Game.Geometry {
    public readonly type: "CircleGeometry" = "CircleGeometry";

    public override toJSON(): Game.Formats.CircleGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.CircleGeometry
    ): CircleGeometry {
        const cirlce = new CircleGeometry(
            json.radius,
            json.segments,
            json.thetaStart,
            json.thetaLength
        );

        applyBaseGeometryJSON(cirlce, json);

        return cirlce;
    }
}

export default CircleGeometry;