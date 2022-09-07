import { useState, useContext } from "react";
import {
    Box,
    Button,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Flashlight } from "@styled-icons/fluentui-system-filled";
import { Shapes } from "@styled-icons/fa-solid";
import { CameraVideo as Camera, Tools } from "@styled-icons/bootstrap";
import { GameController as Controls } from "@styled-icons/ionicons-solid";

import * as THREE from "three";
import { Game } from "@local/classes";
import { EditorContext, GameContext } from "@local/contexts";
import { t } from "@local/i18n";
import { stringToColor } from "@local/functions";
import { Modal, ModalProps } from "@local/components";

import miscList from "@local/consts/editor/aliases/misc/list";
import lightList from "@local/consts/editor/aliases/lights/list";
import shapeList from "@local/consts/editor/aliases/shapes/list";

const categories = [
    { label: "Misc", Icon: Tools, list: miscList },
    { label: "Lights", Icon: Flashlight, list: lightList },
    { label: "Shapes", Icon: Shapes, list: shapeList },
    { label: "Cameras", Icon: Camera, list: [] },
    { label: "Controls", Icon: Controls, list: [] }
];

function Body() {
    const game = useContext(GameContext);
    const editor = useContext(EditorContext);

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalProps, setModalProps] = useState<ModalProps>({});
    const [expanded, setExpanded] = useState<number>(-1);

    const addLight = (item: typeof lightList[number]) => {
        const light = new item.Constructor();
        light.name = light.type;
        
        game?.currentScene?.add(light);
    }

    const addShape = (item: typeof shapeList[number]) => {
        const geometry = new item.Constructor();
        geometry.name = geometry.type;
        
        const material = new THREE.MeshBasicMaterial({
            color: stringToColor(item.label),
            side: THREE.DoubleSide
        });
        material.name = "MeshBasicMaterial";
        
        const object = new Game.Mesh(geometry, material);
        object.name = "Mesh";
        
        const selectedObject = editor?.transformControls.object;

        if (!game) {
            return;
        }

        const { currentScene } = game;
        if (!currentScene) {
            return;
        }

        if (selectedObject) {
            setModalProps(prevState => ({
                ...prevState,
                placement: "center",
                height: 170,
                header: t("Group this object with the currently selected one?"),
                footer: (
                    <>
                        <Button onClick={() => {
                            game?.currentScene?.add(object);
                            setOpenModal(false);
                        }}>
                            {t("No")}
                        </Button>
                        <Button onClick={() => {
                            const group = new THREE.Group();
                            const selectedObject = editor.transformControls.object;

                            if (!selectedObject) return;

                            group.add(object);
                            group.add(selectedObject);

                            game.currentScene?.add(group);

                            setOpenModal(false);
                        }}>
                            {t("Yes")}
                        </Button>
                    </>
                )
            }));
            setOpenModal(true);
        } else {
            currentScene.add(object);
        }
    }

    const addMisc = (item: typeof miscList[number]) => {
        const miscObject = new item.Constructor();
        miscObject.name = miscObject.type;

        game?.currentScene?.add(miscObject);
    }

    return (
        <List component="ul">
            {categories.map(({ label, Icon, list }, i) => {
                const open = expanded === i;

                return (
                    <>
                        <ListItemButton
                            key={i}
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
                                    key={i} 
                                    component="li"
                                    onClick={() => {
                                        if (list === lightList) {
                                            addLight(item as typeof lightList[number]);
                                        }

                                        if (list === shapeList) {
                                            addShape(item as typeof shapeList[number]);
                                        }

                                        if (list === miscList) {
                                            addMisc(item as typeof miscList[number]);
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ justifyContent: "flex-end" }}>
                                        <Box sx={{ 
                                            borderRadius: "50%",
                                            backgroundColor: stringToColor(item.label),
                                            width: 10,
                                            height: 10
                                        }}/>
                                    </ListItemIcon>
                                    <ListItemText primary={t(item.label)} />
                                </ListItemButton>
                            ))}
                        </Collapse>
                    </>
                );
            })}

            {(openModal && Object.keys(modalProps)) && (
                <Modal {...modalProps}/>
            )}
        </List>
    );
}

export default Body;