import { useEffect, useState } from "react";
import { List } from "@mui/material";

import { getGameObjects } from "@local/functions";
import {
    useForceUpdate,
    useUnmount
} from "@local/hooks";
import {
    useGame,
    useEditor
} from "@local/contexts";

import TreeItem from "./TreeItem";

function ObjectTree() {
    const game = useGame();
    const editor = useEditor();
    const transformer = editor.transformControls;
    const { forceUpdate } = useForceUpdate();

    const [activeObject, setActiveObject] = useState("");

    const events = [
        "select",
        "unselect",
        "changeMode"
    ];

    useEffect(() => {
        for (const event of events) {
            transformer.addEventListener(event, forceUpdate);
        }
    }, [game]);

    useUnmount(() => {
        for (const event of events) {
            transformer.removeEventListener(event, forceUpdate);
        }
    });

    const scene = game.current.scene;
    const gameObjects = scene ? getGameObjects(scene) : [];

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