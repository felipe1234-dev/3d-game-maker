import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils/private";
import * as THREE from "three";

class EdgesGeometry extends THREE.EdgesGeometry implements Game.Geometry {
    public override toJSON(): Game.Formats.EdgesGeometry {
        const json: Game.Formats.EdgesGeometry = super.toJSON();

        json.geometry = this.parameters.geometry.toJSON();

        return json;
    }

    public static fromJSON(
        json: Game.Formats.EdgesGeometry
    ): EdgesGeometry {
        const { geometry: geomJSON } = json;
        // @ts-ignore
        const geometry = Game[geomJSON.type].fromJSON(geomJSON);

        const edges = new EdgesGeometry(
            geometry,
            json.thresholdAngle
        );

        applyBaseGeometryJSON(edges, json);

        return edges;
    }
}

export default EdgesGeometry;