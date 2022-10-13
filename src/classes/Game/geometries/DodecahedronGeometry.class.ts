import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

class DodecahedronGeometry extends THREE.DodecahedronGeometry implements Game.Geometry {
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

        applyData(dod, json.data);

        return dod;
    }
}

export default DodecahedronGeometry;