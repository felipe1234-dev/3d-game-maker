import { Game } from "@local/classes";
import { applyBaseGeometryJSON } from "../utils";
import * as THREE from "three";

class IcosahedronGeometry extends THREE.IcosahedronGeometry implements Game.Geometry {
    public readonly type: "IcosahedronGeometry" = "IcosahedronGeometry";

    public override toJSON(): Game.Formats.IcosahedronGeometry {
        return super.toJSON();
    }

    public static override fromJSON(
        json: Game.Formats.IcosahedronGeometry
    ): IcosahedronGeometry {
        const ico = new IcosahedronGeometry(
            json.radius,
            json.detail
        );

        applyBaseGeometryJSON(ico, json);

        return ico;
    }
}

export default IcosahedronGeometry;