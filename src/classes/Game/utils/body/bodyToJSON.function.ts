import { Game } from "@local/classes";

function bodyToJSON(body: Game.Body): Game.Formats.Body {
    const json: Game.Formats.Body = {
        id: body.id,
        uuid: body.uuid,

        collisionFilterGroup: body.collisionFilterGroup,
        collisionFilterMask: body.collisionFilterMask,
        collisionResponse: body.collisionResponse,
        position: {
            x: body.position.x,
            y: body.position.y,
            z: body.position.z,
        },
        velocity: {
            x: body.velocity.x,
            y: body.velocity.y,
            z: body.velocity.z,
        },
        mass: body.mass,
        linearDamping: body.linearDamping,
        type: body.type,
        allowSleep: body.allowSleep,
        sleepSpeedLimit: body.sleepSpeedLimit,
        sleepTimeLimit: body.sleepTimeLimit,
        quaternion: {
            x: body.quaternion.x,
            y: body.quaternion.y,
            z: body.quaternion.z,
            w: body.quaternion.w,
        },
        angularVelocity: {
            x: body.angularVelocity.x,
            y: body.angularVelocity.y,
            z: body.angularVelocity.z,
        },
        fixedRotation: body.fixedRotation,
        angularDamping: body.angularDamping,
        linearFactor: {
            x: body.linearFactor.x,
            y: body.linearFactor.y,
            z: body.linearFactor.z,
        },
        angularFactor: {
            x: body.angularFactor.x,
            y: body.angularFactor.y,
            z: body.angularFactor.z,
        },
        isTrigger: body.isTrigger,
    };

    if (body.mesh) json.mesh = body.mesh.uuid;
    if (body.material) {
        json.material = {
            friction: body.material.friction,
            restitution: body.material.restitution,
        };
    }

    return json;
}

export default bodyToJSON;