import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

class CircleGeometry extends THREE.CircleGeometry implements Game.Geometry {
    public override toJSON(): Game.Formats.CircleGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.CircleGeometry
    ): CircleGeometry {
        const cirlce = new CircleGeometry(
            json.radius,
            json.segments,
            json.thetaStart,
            json.thetaLength
        );

        applyData(cirlce, json.data);

        return cirlce;
    }
}

export default CircleGeometry;