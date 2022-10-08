import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

class TorusKnotGeometry extends THREE.TorusKnotGeometry {
    public override toJSON(): Game.Formats.TorusKnotGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.TorusKnotGeometry
    ): TorusKnotGeometry {
        const torusKnot = new TorusKnotGeometry(
            json.radius, 
            json.tube, 
            json.radialSegments, 
            json.tubularSegments, 
            json.p, 
            json.q
        );

        applyData(torusKnot, json.data);

        return torusKnot;
    }
}

export default TorusKnotGeometry;