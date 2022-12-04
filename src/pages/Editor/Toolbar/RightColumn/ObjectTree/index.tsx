import { useEffect, useState } from "react";
import { List } from "@mui/material";

import { Game } from "@local/classes";
import { getGameObjects } from "@local/functions";
import { useForceUpdate, useUnmount } from "@local/hooks";
import { useGame, useEditor } from "@local/contexts";

import ObjectItem from "./ObjectItem";
import ControlItem from "./ControlItem";

function ObjectTree() {
    const [activeObject, setActiveObject] = useState("");

    const { game } = useGame();
    const { editor } = useEditor();
    const { forceUpdate } = useForceUpdate();

    const transformer = editor?.transformControls;
    const scene = game?.current.scene;
    const controls = scene?.controls || [];

    const controlsChildren = controls.reduce((children, control) => {
        children.push(...control.children);
        return children;
    }, [] as Game.Object3D[]);
    const controlsChildrenUuids = controlsChildren.map(child => child.uuid);
    const gameObjects = (scene ? getGameObjects(scene) : []).filter(
        object => !controlsChildrenUuids.includes(object.uuid)
    );

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
                    <ControlItem
                        key={control.uuid}
                        control={control}

                        activeObject={activeObject}
                        setActiveObject={setActiveObject}

                        rerenderTreeList={forceUpdate}
                    />
                ))}
            </>)}
            {gameObjects.map(object => (
                <ObjectItem
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