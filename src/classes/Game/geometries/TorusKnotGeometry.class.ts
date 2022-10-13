import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils/private";
import * as THREE from "three";

class TorusKnotGeometry extends THREE.TorusKnotGeometry implements Game.Geometry {
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

        applyBaseGeometryJSON(torusKnot, json);

        return torusKnot;
    }
}

export default TorusKnotGeometry;