import { useState, useContext } from "react";
import {
    Box,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Flashlight } from "@styled-icons/fluentui-system-filled";
import { Shapes } from "@styled-icons/fa-solid";
import { CameraVideo as Camera } from "@styled-icons/bootstrap";
import { GameController as Controls } from "@styled-icons/ionicons-solid";

import * as THREE from "three";
import { Game } from "@local/classes";
import { GameContext } from "@local/contexts";
import { t } from "@local/i18n";
import { stringToColor } from "@local/functions";

import lightList from "@local/consts/editor/lights/list";
import shapeList from "@local/consts/editor/shapes/list";

const categories = [
    { label: "Lights", Icon: Flashlight, list: lightList },
    { label: "Shapes", Icon: Shapes, list: shapeList },
    { label: "Cameras", Icon: Camera, list: [] },
    { label: "Controls", Icon: Controls, list: [] }
];

function Body() {
    const game = useContext(GameContext);
    const [expanded, setExpanded] = useState<number>(-1);

    const addLight = (item: typeof lightList[number]) => {
        const light = new item.Constructor();
        light.name = light.type;
        
        game?.currentScene.add(light);
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
        
        game?.currentScene.add(object);
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
        </List>
    );
}

export default Body;