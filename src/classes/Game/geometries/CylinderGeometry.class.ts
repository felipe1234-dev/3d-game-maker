import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

class CylinderGeometry extends THREE.CylinderGeometry {
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

        applyData(cylinder, json.data);

        return cylinder;
    }
}

export default CylinderGeometry;