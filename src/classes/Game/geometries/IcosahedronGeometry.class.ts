import { Game } from "@local/classes";
import * as THREE from "three";
import { applyData } from "../utils/private";

class IcosahedronGeometry extends THREE.IcosahedronGeometry implements Game.Geometry {
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

        applyData(ico, json.data);

        return ico;
    }
}

export default IcosahedronGeometry;