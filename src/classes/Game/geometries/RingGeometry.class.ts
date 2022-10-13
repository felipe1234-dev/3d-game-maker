import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils/private";
import * as THREE from "three";

class RingGeometry extends THREE.RingGeometry implements Game.Geometry {
    public override toJSON(): Game.Formats.RingGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.RingGeometry
    ): RingGeometry {
        const ring = new RingGeometry(
            json.innerRadius,
            json.outerRadius,
            json.thetaSegments,
            json.phiSegments,
            json.thetaStart,
            json.thetaLength
        );

        applyBaseGeometryJSON(ring, json);

        return ring;
    }
}

export default RingGeometry;