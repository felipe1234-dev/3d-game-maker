import { useState } from "react";
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { CameraVideo as Camera, Tools } from "@styled-icons/bootstrap";
import { GameController as Controls } from "@styled-icons/ionicons-solid";
import { Flashlight } from "@styled-icons/fluentui-system-filled";
import { Shapes } from "@styled-icons/fa-solid";

import { Game } from "@local/classes";
import { useEditor, useGame } from "@local/contexts";
import { stringToColor } from "@local/functions";
import { t } from "@local/i18n";

import miscList from "@local/consts/editor/aliases/misc/list";
import lightList from "@local/consts/editor/aliases/lights/list";
import shapeList from "@local/consts/editor/aliases/shapes/list";
import cameraList from "@local/consts/editor/aliases/cameras/list";
import controlList from "@local/consts/editor/controls/list";

import ObjectAdded from "./ObjectAdded";
import AddPointerLock from "./AddPointerLock";

const categories = [
    { label: "Misc", Icon: Tools, list: miscList },
    { label: "Lights", Icon: Flashlight, list: lightList },
    { label: "Shapes", Icon: Shapes, list: shapeList },
    { label: "Cameras", Icon: Camera, list: cameraList },
    { label: "Controls", Icon: Controls, list: controlList },
];

function Body() {
    const { game } = useGame();
    const { editor } = useEditor();
    const transformer = editor?.transformControls;

    const [modal, setModal] = useState<string>();
    const [modalProps, setModalProps] = useState({});
    const [expanded, setExpanded] = useState(-1);

    const hideModal = () => {
        setModal(undefined);
    };
    const showModal = (modalName: string, props: any = {}) => {
        setModal(modalName);
        setModalProps(props);
    };

    const addObject = (item: any, list: any[]) => {
        if (list === lightList) {
            addLight(
                item as typeof lightList[number]
            );
        }

        if (list === shapeList) {
            addShape(
                item as typeof shapeList[number]
            );
        }

        if (list === cameraList) {
            addCamera(
                item as typeof cameraList[number]
            );
        }

        if (list === miscList) {
            addMisc(
                item as typeof miscList[number]
            );
        }

        if (list === controlList) {
            addControls(
                item as typeof controlList[number]
            );
        }
    };

    const addLight = (item: typeof lightList[number]) => {
        const light = new item.Constructor();
        light.name = light.type;

        game?.currentScene?.add(light);
        transformer?.unselect();
        transformer?.select(light);

        showModal("objectAdded");
    };

    const addShape = (item: typeof shapeList[number]) => {
        const geometry = new item.Constructor();
        geometry.name = geometry.type;

        const material = new Game.MeshPhysicalMaterial({
            color: stringToColor(item.label),
            side: Game.DoubleSide,
        });
        material.name = "MeshBasicMaterial";

        const object = new Game.Mesh(geometry, material);
        object.name = "Mesh";

        game?.currentScene?.add(object);
        transformer?.unselect();
        transformer?.select(object);

        showModal("objectAdded");
    };

    const addCamera = (item: typeof cameraList[number]) => {
        const camera = new item.Constructor();
        camera.name = camera.type;

        game?.currentScene?.add(camera);
        transformer?.unselect();
        transformer?.select(camera);

        showModal("objectAdded");
    };

    const addMisc = (item: typeof miscList[number]) => {
        const miscObject = new item.Constructor();
        miscObject.name = miscObject.type;

        game?.currentScene?.add(miscObject);
        transformer?.unselect();
        transformer?.select(miscObject);

        showModal("objectAdded");
    };

    const addControls = (item: typeof controlList[number]) => {
        const { Constructor } = item;

        if (Constructor.prototype instanceof Game.PointerLockControls) {
            showModal("addPointerLock", { item });
        }
    };

    return (
        <List component="ul">
            {categories.map(({ label, Icon, list }, i) => {
                const open = expanded === i;

                return (<>
                    <ListItemButton
                        key={`${label}-${i}`}
                        component="li"
                        onClick={() => setExpanded(open ? -1 : i)}
                    >
                        <ListItemIcon>
                            <Icon width={30} />
                        </ListItemIcon>
                        <ListItemText primary={t(label)} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {list.map((item, i) => (
                            <ListItemButton
                                key={`${item.label}-${i}`}
                                component="li"
                                onClick={() => addObject(item, list)}
                            >
                                <ListItemIcon
                                    sx={{ justifyContent: "flex-end" }}
                                >
                                    <Box
                                        sx={{
                                            borderRadius: "50%",
                                            backgroundColor: stringToColor(
                                                item.label
                                            ),
                                            width: 10,
                                            height: 10,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={t(item.label)} />
                            </ListItemButton>
                        ))}
                    </Collapse>
                </>);
            })}

            {modal === "objectAdded" && <ObjectAdded onHide={hideModal} />}
            {modal === "addPointerLock" && (
                <AddPointerLock 
                    onHide={() => {
                        hideModal();
                        showModal("objectAdded");
                    }}
                    {...modalProps}
                />
            )}
        </List>
    );
}

export default Body;