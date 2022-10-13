import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

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

        applyData(ring, json.data);

        return ring;
    }
}

export default RingGeometry;