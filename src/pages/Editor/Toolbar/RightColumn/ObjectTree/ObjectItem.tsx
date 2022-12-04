import React from "react";
import {
    Box,
    Collapse,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    IconButton
} from "@mui/material";
import { Plus } from "@styled-icons/boxicons-regular";
import { Minus } from "@styled-icons/heroicons-outline";

import { Game } from "@local/classes";
import {
    stringToColor,
    getGameObjects,
    getChildrenOfChildren
} from "@local/functions";
import {
    useEditor,
    useGame
} from "@local/contexts";
import { t } from "@local/i18n";

interface ObjectItemProps {
    object: Game.Object3D;
    setActiveObject: (uuid: string) => void;
    activeObject: string;
    rerenderTreeList: () => void;
}

function ObjectItem(props: ObjectItemProps) {
    const { editor } = useEditor();
    const transformer = editor?.transformControls;
    const { game } = useGame();

    const {
        object,
        setActiveObject,
        activeObject,
        rerenderTreeList
    } = props;

    const selected = transformer?.object?.uuid === object.uuid;
    const childrenOfChildren = getChildrenOfChildren(object).map(child => child.uuid);
    const openDropdown = [
        ...childrenOfChildren,
        object.uuid
    ].includes(activeObject);

    const toggleCollapser = (evt: React.MouseEvent) => {
        setActiveObject(
            openDropdown
                ? object.parent?.uuid || ""
                : object.uuid
        );
        rerenderTreeList();

        evt.stopPropagation();
    };

    const selectObject = () => {
        transformer?.select(object);
    };

    const dragStart = (evt: React.DragEvent) => {
        (evt.target as HTMLElement).classList.add(
            "ObjectTree-list-item--dragging"
        );

        evt.dataTransfer.setData("child-uuid", object.uuid);
    };

    const dragEnd = (evt: React.DragEvent) => {
        (evt.target as HTMLElement).classList.remove(
            "ObjectTree-list-item--dragging"
        );
    };

    const dragOver = (evt: React.DragEvent) => (
        evt.preventDefault()
    );

    const dragEnter = (evt: React.DragEvent) => {
        let target = evt.target as HTMLElement;
        target =
            target.tagName !== "LI"
                ? target.closest("li") || target
                : target;

        if (target.classList.contains("MuiListItemButton-root")) {
            target.classList.add("ObjectTree-list-item--dragOver");
        }
    };

    const dragLeave = (evt: React.DragEvent) => {
        let target = evt.target as HTMLElement;
        target =
            target.tagName !== "LI"
                ? target.closest("li") || target
                : target;

        if (target.classList.contains("MuiListItemButton-root")) {
            target.classList.remove("ObjectTree-list-item--dragOver");
        }
    };

    const drop = (evt: React.DragEvent) => {
        evt.preventDefault();

        if (!game || !game.currentScene) {
            return;
        }

        const childUuid = evt.dataTransfer.getData("child-uuid");
        const child = game.currentScene.getObjectByUuid(childUuid);
        const parent = object;

        console.log("child", child);
        console.log("parent", parent);

        if (!child) {
            return;
        }

        if (child.uuid === parent.uuid) {
            return;
        }

        const alreadyAdded = child.parent?.uuid === parent.uuid;
        console.log("alreadyAdded", alreadyAdded);

        if (alreadyAdded) {
            const parentOfParent = parent.parent;
            if (!parentOfParent) return;

            parent.remove(child);
            parentOfParent.add(child);
        } else {
            parent.add(child);
        }

        rerenderTreeList();
    };

    const gameObjects = getGameObjects(object);

    return (
        <>
            <ListItemButton
                key={object.uuid}
                className="ObjectTree-list-item"
                component="li"

                onClick={selectObject}
                onDragStart={dragStart}
                onDragEnd={dragEnd}
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={drop}

                selected={selected}
                draggable
            >
                <ListItemIcon>
                    {gameObjects.length > 0 && (
                        <IconButton onClick={toggleCollapser}>
                            {openDropdown ? (
                                <Minus width={15} />
                            ) : (
                                <Plus width={15} />
                            )}
                        </IconButton>
                    )}
                    <Box
                        sx={{
                            backgroundColor: stringToColor(object.name || object.type),
                        }}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={object.name || t("No name")}
                    secondary={t(object.type)}
                />
            </ListItemButton>
            {gameObjects.length > 0 && (
                <Collapse in={openDropdown} timeout="auto" unmountOnExit>
                    {gameObjects.map(child => (
                        <ObjectItem
                            key={child.uuid}
                            object={child}
                            setActiveObject={setActiveObject}
                            activeObject={activeObject}
                            rerenderTreeList={rerenderTreeList}
                        />
                    ))}
                    <Divider />
                </Collapse>
            )}
        </>
    );
}

export default ObjectItem;