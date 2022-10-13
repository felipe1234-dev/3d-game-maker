import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils/private";
import * as THREE from "three";

class PolyhedronGeometry extends THREE.PolyhedronGeometry implements Game.Geometry {
    public override toJSON(): Game.Formats.PolyhedronGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.PolyhedronGeometry
    ): PolyhedronGeometry {
        const poly = new PolyhedronGeometry(
            json.vertices,
            json.indices,
            json.radius,
            json.detail,
        );

        applyBaseGeometryJSON(poly, json);

        return poly;
    }
}

export default PolyhedronGeometry;