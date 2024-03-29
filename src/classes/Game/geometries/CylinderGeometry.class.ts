import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils";
import * as THREE from "three";

class CylinderGeometry extends THREE.CylinderGeometry implements Game.Geometry {
    public readonly type: "CylinderGeometry" = "CylinderGeometry";

    public override toJSON(): Game.Formats.CylinderGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.CylinderGeometry
    ): CylinderGeometry {
        const cylinder = new CylinderGeometry(
            json.radiusTop,
            json.radiusBottom,
            json.height,
            json.radialSegments,
            json.heightSegments,
            json.openEnded,
            json.thetaStart,
            json.thetaLength,
        );
        applyBaseGeometryJSON(cylinder, json);


        return cylinder;
    }
}

export default CylinderGeometry;