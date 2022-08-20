import React, { useContext, useState } from "react";
import { 
    Box, 
    List, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
    Collapse
} from "@mui/material";
import { stringToColor } from "@local/functions";
import { EditorContext, GameContext } from "@local/contexts";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Game } from "@local/classes";

function Body() {
    const game = useContext(GameContext);
    const editor = useContext(EditorContext);

    const [expanded, setExpanded] = useState<string>("");

    const drag = (evt: React.DragEvent, scene: Game.Scene) => {
        evt.stopPropagation();
        evt.dataTransfer.setData("sceneUuid", scene.uuid);
    }

    const drop = (evt: React.DragEvent, stage: Game.Stage) => {
        evt.preventDefault();

        const sceneUuid = evt.dataTransfer.getData("sceneUuid");
        stage.transferScene(sceneUuid);
        setExpanded(stage.uuid);

        console.log("drop")
    }

    const allowDrop = (evt: React.DragEvent) => {
        evt.preventDefault();
    }

    const selectScene = (scene: Game.Scene) => {
        if (!editor) {
            return;
        }

        editor.removeGrids();
        scene.select();
        editor.addGrids();

        console.log("click")
    }

    return (
        <Box className="SceneTree-outliner">
            <List className="SceneTree-outliner-list" component="ul">
                {(game?.stages || []).map(stage => {
                    const open = expanded === stage.uuid;

                    return (
                        <>
                            <ListItemButton 
                                key={stage.uuid} 
                                component="li"
                                onClick={() => setExpanded(open ? "" : stage.uuid)}

                                onDrop={(evt: React.DragEvent) => drop(evt, stage)} 
                                onDragOver={allowDrop}
                            >
                                <ListItemIcon>
                                    <Box sx={{ backgroundColor: stringToColor(stage.name) }}/>
                                </ListItemIcon>
                                <ListItemText primary={stage.name} />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                {stage.scenes.map(scene => (
                                    <ListItemButton 
                                        key={scene.uuid} 
                                        component="li"
                                        onDragStart={(evt: React.DragEvent) => (
                                            drag(evt, scene)
                                        )}
                                        onClick={() => selectScene(scene)}
                                        draggable
                                    >
                                        <ListItemIcon>
                                            <Box sx={{ backgroundColor: stringToColor(scene.name) }}/>
                                        </ListItemIcon>
                                        <ListItemText primary={scene.name} />
                                    </ListItemButton>
                                ))}
                            </Collapse>
                        </>
                    );
                })}
            </List>
        </Box>
    );
}

export default Body;