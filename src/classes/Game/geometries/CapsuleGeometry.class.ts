import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

class CapsuleGeometry extends THREE.CapsuleGeometry {
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

        applyData(capsule, json.data);

        return capsule;
    }
}

export default CapsuleGeometry;