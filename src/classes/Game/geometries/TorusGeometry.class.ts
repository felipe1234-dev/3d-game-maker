import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

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

        applyData(torus, json.data);

        return torus;
    }
}

export default TorusGeometry;