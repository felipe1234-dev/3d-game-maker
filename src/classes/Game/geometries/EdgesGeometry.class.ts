import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

class EdgesGeometry extends THREE.EdgesGeometry {
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

        applyData(edges, json.data);

        return edges;
    }
}

export default EdgesGeometry;