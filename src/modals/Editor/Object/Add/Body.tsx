import { useState } from "react";
import {
    Box,
    Button,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Flashlight } from "@styled-icons/fluentui-system-filled";
import { Shapes } from "@styled-icons/fa-solid";
import { CameraVideo as Camera, Tools } from "@styled-icons/bootstrap";
import { GameController as Controls } from "@styled-icons/ionicons-solid";
import * as THREE from "three";

import { Game } from "@local/classes";
import { useEditor, useGame } from "@local/contexts";
import { stringToColor } from "@local/functions";
import { Modal, ModalProps } from "@local/components";
import { t } from "@local/i18n";

import miscList from "@local/consts/editor/aliases/misc/list";
import lightList from "@local/consts/editor/aliases/lights/list";
import shapeList from "@local/consts/editor/aliases/shapes/list";
import cameraList from "@local/consts/editor/aliases/cameras/list";

const categories = [
    { label: "Misc", Icon: Tools, list: miscList },
    { label: "Lights", Icon: Flashlight, list: lightList },
    { label: "Shapes", Icon: Shapes, list: shapeList },
    { label: "Cameras", Icon: Camera, list: cameraList },
    { label: "Controls", Icon: Controls, list: [] },
];

function generateModalProps(
    props: {
        cancel: () => void;
        confirm: () => void;
    }
): ModalProps {
    return ({
        placement: "center",
        height: 170,
        header: t("Group this object with the currently selected one?"),
        footer: (
            <>
                <Button onClick={props.cancel}>
                    {t("No")}
                </Button>
                <Button onClick={props.confirm}>
                    {t("Yes")}
                </Button>
            </>
        ),
    })
}

function Body() {
    const { game } = useGame();
    const { editor } = useEditor();
    const transformer = editor?.transformControls;

    const [showModal, setShowModal] = useState(false);
    const [expanded, setExpanded] = useState(-1);

    const addLight = (item: typeof lightList[number]) => {
        const light = new item.Constructor();
        light.name = light.type;

        game?.currentScene?.add(light);
        transformer?.unselect();
        transformer?.select(light);
    };

    const addShape = (item: typeof shapeList[number]) => {
        const geometry = new item.Constructor();
        geometry.name = geometry.type;

        const material = new Game.MeshPhysicalMaterial({
            color: stringToColor(item.label),
            side: THREE.DoubleSide,
        });
        material.name = "MeshBasicMaterial";

        const object = new Game.Mesh(geometry, material);
        object.name = "Mesh";

        game?.currentScene?.add(object);
        transformer?.unselect();
        transformer?.select(object);
    };

    const addCamera = (item: typeof cameraList[number]) => {
        const camera = new item.Constructor();
        camera.name = camera.type;

        game?.currentScene?.add(camera);
        transformer?.unselect();
        transformer?.select(camera);
    };

    const addMisc = (item: typeof miscList[number]) => {
        const miscObject = new item.Constructor();
        miscObject.name = miscObject.type;

        game?.currentScene?.add(miscObject);
        transformer?.unselect();
        transformer?.select(miscObject);
    };

    return (
        <List component="ul">
            {categories.map(({ label, Icon, list }, i) => {
                const open = expanded === i;

                return (
                    <>
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
                                    onClick={() => {
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

                                        setShowModal(true);
                                    }}
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
                    </>
                );
            })}

            {showModal && (
                <Modal
                    placement="center"
                    height={170}
                    header={t("Object added")}
                    footer={(
                        <Button onClick={() => setShowModal(false)}>
                            {t("Ok")}
                        </Button>
                    )}
                />
            )}
        </List>
    );
}

export default Body;