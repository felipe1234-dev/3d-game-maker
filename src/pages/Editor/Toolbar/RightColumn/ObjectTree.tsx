import { useEffect, useState } from "react";
import { Divider, List } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import { getGameObjects } from "@local/functions";
import { useForceUpdate, useUnmount } from "@local/hooks";
import { useGame, useEditor } from "@local/contexts";

import TreeItem from "./TreeItem";

function ObjectTree() {
    const [activeObject, setActiveObject] = useState("");

    const location = useLocation();
    const { game } = useGame();
    const { editor } = useEditor();
    const { forceUpdate } = useForceUpdate();

    const transformer = editor?.transformControls;
    const scene = game?.current.scene;
    const gameObjects = scene ? getGameObjects(scene) : [];
    const controls = scene?.controls || [];

    const events = [
        "select",
        "unselect",
        "changeMode"
    ];

    useEffect(() => {
        for (const event of events) {
            transformer?.addEventListener(event, forceUpdate);
        }
    }, [game]);

    useUnmount(() => {
        for (const event of events) {
            transformer?.removeEventListener(event, forceUpdate);
        }
    });

    return (
        <List className="ObjectTree-list" component="ul">
            {controls.length > 0 && (<>
                {controls.map(control => (
                    <Link
                        key={control.uuid}
                        to={`controls/edit/${control.uuid}`}
                        state={{
                            background: location,
                            useLoader: false,
                        }}
                    >
                        {control.name}
                    </Link>
                ))}
                <Divider />
            </>)}
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