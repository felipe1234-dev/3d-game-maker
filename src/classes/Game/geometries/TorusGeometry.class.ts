import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils/private";
import * as THREE from "three";

class TorusGeometry extends THREE.TorusGeometry implements Game.Geometry {
    public override toJSON(): Game.Formats.TorusGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.TorusGeometry
    ): TorusGeometry {
        const torus = new TorusGeometry(
            json.radius,
            json.tube,
            json.radialSegments,
            json.tubularSegments,
            json.arc
        );

        applyBaseGeometryJSON(torus, json);

        return torus;
    }
}

export default TorusGeometry;