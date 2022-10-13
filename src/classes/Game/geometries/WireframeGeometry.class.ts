import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils/private";
import * as THREE from "three";

class WireframeGeometry extends THREE.WireframeGeometry implements Game.Geometry {
    public override toJSON(): Game.Formats.WireframeGeometry {
        const json: Game.Formats.WireframeGeometry = super.toJSON();

        json.geometry = this.parameters.geometry.toJSON();

        return json;
    }

    public static fromJSON(
        json: Game.Formats.WireframeGeometry
    ): WireframeGeometry {
        const { geometry: geomJSON } = json;
        // @ts-ignore
        const geometry = Game[geomJSON.type].fromJSON(geomJSON);

        const frame = new WireframeGeometry(geometry);

        applyBaseGeometryJSON(frame, json);

        return frame;
    }
}

export default WireframeGeometry;