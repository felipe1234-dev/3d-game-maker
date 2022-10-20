import { useEffect, useState } from "react";
import { List } from "@mui/material";

import {
    useForceUpdate,
    useUnmount
} from "@local/hooks";
import { Game } from "@local/classes";
import { useGame } from "@local/contexts";

import TreeItem from "./TreeItem";

import "@local/styles/pages/EditorPage/ObjectTree.scss";

function ObjectTree() {
    const game = useGame();
    const { forceUpdate } = useForceUpdate();
    const [activeObject, setActiveObject] = useState("");


    const allObjects = (game.currentScene?.children || []);
    const gameObjects = allObjects.filter(child => (
        Game.isObject3D(child)
    )) as Game.Object3D[];

    useEffect(() => {
        game.renderer.canvas.addEventListener("click", forceUpdate);
    }, [game]);

    useUnmount(() => {
        game.renderer.canvas.removeEventListener("click", forceUpdate);
    });

    return (
        <List className="ObjectTree-list" component="ul">
            {gameObjects.map(object => (
                <TreeItem
                    key={object.uuid}
                    object={object}

                    activeObject={activeObject}
                    setActiveObject={setActiveObject}

                    rerenderTreeList={forceUpdate}
                />
            ))}
        </List>
    );
}

export default ObjectTree;