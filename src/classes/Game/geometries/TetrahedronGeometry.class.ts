import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils";
import * as THREE from "three";

class TetrahedronGeometry extends THREE.TetrahedronGeometry implements Game.Geometry {
    public readonly type: "TetrahedronGeometry" = "TetrahedronGeometry";

    public override toJSON(): Game.Formats.TetrahedronGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.TetrahedronGeometry
    ): TetrahedronGeometry {
        const tet = new TetrahedronGeometry(
            json.radius,
            json.detail
        );

        applyBaseGeometryJSON(tet, json);

        return tet;
    }
}

export default TetrahedronGeometry;