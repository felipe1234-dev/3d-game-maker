import { Game } from "@local/classes";

function getGameObjects(object: Game.Object3D): Game.Object3D[] {
    return object.children.filter(child => Game.isObject3D(child)) as Game.Object3D[];
}

export default getGameObjects;