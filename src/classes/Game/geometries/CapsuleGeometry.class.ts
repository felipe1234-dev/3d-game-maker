import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils";
import * as THREE from "three";

class CapsuleGeometry extends THREE.CapsuleGeometry implements Game.Geometry {
    public readonly type: "CapsuleGeometry" = "CapsuleGeometry";

    public override toJSON(): Game.Formats.CapsuleGeometry {
        const json = super.toJSON();
        return json;
    }

    public static override fromJSON(
        json: Game.Formats.CapsuleGeometry
    ): CapsuleGeometry {
        const capsule = new CapsuleGeometry(
            json.radius,
            json.length,
            json.capSegments,
            json.radialSegments
        );

        applyBaseGeometryJSON(capsule, json);

        return capsule;
    }
}

export default CapsuleGeometry;