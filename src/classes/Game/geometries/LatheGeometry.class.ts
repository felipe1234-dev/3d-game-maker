import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

class LatheGeometry extends THREE.LatheGeometry implements Game.Geometry {
    public override toJSON(): Game.Formats.LatheGeometry {
        const json: Game.Formats.LatheGeometry = super.toJSON();

        const { points } = this.parameters;
        json.points = points.map(point => point.toArray());

        return json;
    }

    public static override fromJSON(
        json: Game.Formats.LatheGeometry
    ): LatheGeometry {
        const points = json.points.map(pointArr => (
            new THREE.Vector2().fromArray(pointArr)
        ));

        const lathe = new LatheGeometry(
            points,
            json.segments,
            json.phiStart,
            json.phiLength,
        );

        applyData(lathe, json.data);

        return lathe;
    }
}

export default LatheGeometry;