import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

class ConeGeometry extends THREE.ConeGeometry implements Game.Geometry {
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

        applyData(cone, json.data);

        return cone;
    }
}

export default ConeGeometry;