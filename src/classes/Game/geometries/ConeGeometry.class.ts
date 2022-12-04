import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils";
import * as THREE from "three";

class ConeGeometry extends THREE.ConeGeometry implements Game.Geometry {
    public readonly type: "ConeGeometry" = "ConeGeometry";

    public override toJSON(): Game.Formats.ConeGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.ConeGeometry
    ): ConeGeometry {
        const cone = new ConeGeometry(
            json.radius,
            json.height,
            json.radialSegments,
            json.heightSegments,
            json.openEnded,
            json.thetaStart,
            json.thetaLength,
        );

        applyBaseGeometryJSON(cone, json);

        return cone;
    }
}

export default ConeGeometry;