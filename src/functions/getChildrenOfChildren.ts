import { Game } from "@local/classes";
import getGameObjects from "./getGameObjects";

function getChildrenOfChildren(object: Game.Object3D | Game.Controls) {
    return getGameObjects(object).reduce((childList, child) => {
        const children = getChildrenOfChildren(child);

        childList.push(child, ...children);

        return childList;
    }, [] as Game.Object3D[]);
}

export default getChildrenOfChildren;