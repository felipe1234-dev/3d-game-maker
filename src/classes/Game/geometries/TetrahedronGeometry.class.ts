import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

class TetrahedronGeometry extends THREE.TetrahedronGeometry implements Game.Geometry {
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

        applyData(tet, json.data);

        return tet;
    }
}

export default TetrahedronGeometry;