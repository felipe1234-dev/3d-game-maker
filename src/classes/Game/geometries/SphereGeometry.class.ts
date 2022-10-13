import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils/private";
import * as THREE from "three";

class SphereGeometry extends THREE.SphereGeometry implements Game.Geometry {
    public override toJSON(): Game.Formats.SphereGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.SphereGeometry
    ): SphereGeometry {
        const sphere = new SphereGeometry(
            json.radius,
            json.widthSegments,
            json.heightSegments,
            json.phiStart,
            json.phiLength,
            json.thetaStart,
            json.thetaLength
        );

        applyBaseGeometryJSON(sphere, json);

        return sphere;
    }
}

export default SphereGeometry;