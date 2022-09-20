import React, { useEffect, useState } from "react";
import {
    Box,
    Collapse,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Divider,
} from "@mui/material";
import { Plus } from "@styled-icons/boxicons-regular";
import { Minus } from "@styled-icons/heroicons-outline";
import { ArrowIosBack } from "@styled-icons/evaicons-solid";

import * as ThreeControls from "@local/three-controls";

import { ResizableDrawer } from "@local/components";
import { useEditor, useGame } from "@local/contexts";
import { t } from "@local/i18n";
import { stringToColor } from "@local/functions";

import "@local/styles/pages/EditorPage/ObjectTree.scss";

function Center() {
    const editor = useEditor();
    const game = useGame();

    const [sceneObjects, setSceneObjects] = useState<THREE.Object3D[]>([]);
    const [expanded, setExpanded] = useState<string>("");

    const getChildrenOfChildren = (object: THREE.Object3D) =>
        object.children.reduce((childList, child) => {
            const children = getChildrenOfChildren(child);

            childList.push(child, ...children);

            return childList;
        }, [] as THREE.Object3D[]);

    const updateList = () => {
        setSceneObjects([
            ...(game.currentScene?.children || []).filter(
                child =>
                    !(child instanceof ThreeControls.TransformControls) &&
                    !/helper/gi.test(child.constructor.name)
            ),
        ]);
    };

    const ObjectItem = (props: { object: THREE.Object3D }) => {
        const { object } = props;
        const { children } = object;

        const childrenOfChildren = getChildrenOfChildren(object);
        const open = [
            ...childrenOfChildren.map(child => child.uuid),
            object.uuid,
        ].includes(expanded);
        const selected = editor.transformControls.object?.uuid === object.uuid;

        const toggleCollapser = (evt: React.MouseEvent) => {
            setExpanded(open ? object.parent?.uuid || "" : object.uuid);
            evt.stopPropagation();
        };

        const selectObject = () => {
            editor.transformControls.select(object);
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

        const dragOver = (evt: React.DragEvent) => evt.preventDefault();

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

            if (!game.currentScene) {
                return;
            }

            const childUuid = evt.dataTransfer.getData("child-uuid");
            const sceneChildren = getChildrenOfChildren(game.currentScene);
            const child = sceneChildren.find(child => child.uuid === childUuid);

            if (!child) {
                return;
            }

            if (object.uuid === child.parent?.uuid) {
                object.parent?.add(child);
            } else {
                object.add(child);
            }

            updateList();
        };

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
                        <div onClick={toggleCollapser}>
                            {children.length > 0 &&
                                (open ? (
                                    <Minus width={15} />
                                ) : (
                                    <Plus width={15} />
                                ))}
                        </div>
                        <Box
                            sx={{
                                backgroundColor: stringToColor(
                                    object.name || object.type
                                ),
                            }}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={object.name || t("No name")}
                        secondary={t(object.type)}
                    />
                </ListItemButton>
                {children.length > 0 && (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {children.map(child => (
                            <ObjectItem object={child} />
                        ))}
                        <Divider />
                    </Collapse>
                )}
            </>
        );
    };

    useEffect(() => {
        const { currentScene } = game;
        if (!currentScene) {
            return;
        }

        const events = ["addObjects", "removeObjects"];

        events.forEach(type => {
            currentScene.addEventListener(type, updateList);
            currentScene.dispatchEvent({ type });
        });
    }, [editor, game]);

    return (
        <Box>
            <ResizableDrawer
                anchor="right"
                PaperProps={{ className: "ObjectTree" }}
                defaultDrawerWidth={45}
                minDrawerWidth={45}
                Dragger={({ style, ...props }) => (
                    <Tooltip title={t("Object tree")} placement="left" arrow>
                        <span className="ObjectTree-dragger" style={style}>
                            <IconButton {...props}>
                                <ArrowIosBack width={25} />
                            </IconButton>
                        </span>
                    </Tooltip>
                )}
            >
                <List className="ObjectTree-list" component="ul">
                    {sceneObjects.map(object => (
                        <ObjectItem key={object.uuid} object={object} />
                    ))}
                </List>
            </ResizableDrawer>
        </Box>
    );
}

export default Center;