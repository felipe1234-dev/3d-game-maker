import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

class SphereGeometry extends THREE.SphereGeometry {
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

        applyData(sphere, json.data);

        return sphere;
    }
}

export default SphereGeometry;