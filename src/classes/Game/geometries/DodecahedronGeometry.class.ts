import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils/private";
import * as THREE from "three";

class DodecahedronGeometry extends THREE.DodecahedronGeometry implements Game.Geometry {
    public readonly type: "DodecahedronGeometry" = "DodecahedronGeometry";

    public override toJSON(): Game.Formats.DodecahedronGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.DodecahedronGeometry
    ): DodecahedronGeometry {
        const dod = new DodecahedronGeometry(
            json.radius,
            json.detail
        );

        applyBaseGeometryJSON(dod, json);

        return dod;
    }
}

export default DodecahedronGeometry;