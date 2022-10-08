import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

class PlaneGeometry extends THREE.PlaneGeometry {
    public override toJSON(): Game.Formats.PlaneGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.PlaneGeometry
    ): PlaneGeometry {
        const plane = new PlaneGeometry(
            json.width,
            json.height,
            json.widthSegments,
            json.heightSegments,
        );

        applyData(plane, json.data);

        return plane;
    }
}

export default PlaneGeometry;