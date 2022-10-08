import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

class OctahedronGeometry extends THREE.OctahedronGeometry {
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

        applyData(oct, json.data);

        return oct;
    }
}

export default OctahedronGeometry;