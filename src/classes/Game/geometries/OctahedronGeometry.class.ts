import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils/private";
import * as THREE from "three";

class OctahedronGeometry extends THREE.OctahedronGeometry implements Game.Geometry {
    public override toJSON(): Game.Formats.OctahedronGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.OctahedronGeometry
    ): OctahedronGeometry {
        const oct = new OctahedronGeometry(
            json.radius,
            json.detail
        );

        applyBaseGeometryJSON(oct, json);

        return oct;
    }
}

export default OctahedronGeometry;