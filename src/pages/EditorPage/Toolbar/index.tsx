import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
    AddRounded as ZoomInIcon,
    RemoveRounded as ZoomOutIcon,
    OpenWithRounded as MoveIcon,
    FitScreenRounded as ResizeIcon,
    CropRotateRounded as RotateIcon
} from "@mui/icons-material";

import { Pressable } from "@local/components";
import { EditorContext } from "@local/contexts";

function Toolbar() {
    const [zoomSpeed, setZoomSpeed] = React.useState<number>(50);
    const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
    const [mode, setMode] = React.useState<string>("translate");
    const editor = React.useContext(EditorContext);
    
    const onSetStates = () => {
        if (!editor) {
            return;
        }
        
        setZoomSpeed(editor.orbitControls.zoomSpeed*50);
        setIsDisabled(!editor.transformControls.object);
        setMode(editor.transformControls.mode);
    }
    
    React.useEffect(() => {
        if (!editor) {
            return;
        }
        
        const { transformControls: transform } = editor;
        const events = ["select", "unselect", "set-mode"]; 
        
        events.forEach((type) => {
            if (!transform.hasEventListener(type, onSetStates)) {
                transform.addEventListener(type, onSetStates);
                transform.dispatchEvent({ type });
            }
        });
    }, [editor]);
    
    const onSetMode = (mode: "translate" | "rotate" | "scale") => {
        if (isDisabled) {
            return;
        }
        
        if (!editor) {
            return;
        }
        
        editor.transformControls.setMode(mode);
        setMode(mode);
    }
    
    return (
        <Box className="Editor-toolbar" component="aside">
            <Pressable
                component={IconButton}
                aria-label="Zoom In"
                onMousePress={() => editor?.orbitControls.zoomIn()}
                ms={zoomSpeed}
            >
                <Tooltip title="Zoom In" placement="right">
                    <ZoomInIcon />
                </Tooltip>
            </Pressable>
            <Pressable 
                component={IconButton}
                aria-label="Zoom Out"
                onMousePress={() => editor?.orbitControls.zoomOut()}
                ms={zoomSpeed}
            >
                <Tooltip title="Zoom Out" placement="right">
                    <ZoomOutIcon />
                </Tooltip>
            </Pressable>
            
            <Tooltip title="Move object" placement="right">
                <span>
                    <IconButton
                        aria-label="Move object"
                        onClick={() => onSetMode("translate")}
                        data-selected={mode === "translate"}
                        disabled={isDisabled}
                    >
                        <MoveIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Resize object" placement="right">
                <span>
                    <IconButton
                        aria-label="Resize object"
                        onClick={() => onSetMode("scale")}
                        data-selected={mode === "scale"}
                        disabled={isDisabled}
                    >
                        <ResizeIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Rotate object" placement="right">
                <span>
                    <IconButton
                        aria-label="Rotate object"
                        onClick={() => onSetMode("rotate")}
                        data-selected={mode === "rotate"}
                        disabled={isDisabled}
                    >
                        <RotateIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </Box>
    );
}

export default Toolbar;