import * as CANNON from "cannon-es";
import { Game } from "@local/classes";

function bodyFromJSON(json: Game.Formats.Body): Game.Body {
    const {
        position,
        velocity,
        material,
        quaternion,
        angularVelocity,
        angularFactor,
        linearFactor,
        mesh,
        ...rest
    } = json;
    const options: Game.BodyOptions = {
        ...rest,
    };

    if (position) {
        const { x, y, z } = position;
        options.position = new CANNON.Vec3(x, y, z);
    }

    if (velocity) {
        const { x, y, z } = velocity;
        options.velocity = new CANNON.Vec3(x, y, z);
    }

    if (material) {
        options.material = new CANNON.Material(material);
    }

    if (quaternion) {
        const { x, y, z, w } = quaternion;
        options.quaternion = new CANNON.Quaternion(x, y, z, w);
    }

    if (angularVelocity) {
        const { x, y, z } = angularVelocity;
        options.angularVelocity = new CANNON.Vec3(x, y, z);
    }

    if (linearFactor) {
        const { x, y, z } = linearFactor;
        options.linearFactor = new CANNON.Vec3(x, y, z);
    }

    if (angularFactor) {
        const { x, y, z } = angularFactor;
        options.angularFactor = new CANNON.Vec3(x, y, z);
    }

    return new Game.Body(options);
}

export default bodyFromJSON;