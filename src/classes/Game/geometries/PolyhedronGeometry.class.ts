import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

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

        applyData(poly, json.data);

        return poly;
    }
}

export default PolyhedronGeometry;