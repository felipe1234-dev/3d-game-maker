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
    const editor = React.useContext(EditorContext);
    const zoomSpeed = editor ? editor.orbitControls.zoomSpeed*50 : 1;
    
    return (
        <Box className="Editor-toolbar" component="aside">
            <Tooltip title="Zoom In" placement="right">
                <Pressable 
                    component={IconButton}
                    aria-label="Zoom In"
                    onMousePress={() => editor?.orbitControls.zoomIn()}
                    ms={zoomSpeed}
                >
                    <ZoomInIcon />
                </Pressable>
            </Tooltip>
            <Tooltip title="Zoom Out" placement="right">
                <Pressable 
                    component={IconButton}
                    aria-label="Zoom Out"
                    onMousePress={() => editor?.orbitControls.zoomOut()}
                    ms={zoomSpeed}
                >
                    <ZoomOutIcon />
                </Pressable>
            </Tooltip>
            
            <Tooltip title="Move object" placement="right">
                <IconButton
                    aria-label="Move object"
                >
                    <MoveIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Resize object" placement="right">
                <IconButton
                    aria-label="Resize object"
                >
                    <ResizeIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Rotate object" placement="right">
                <IconButton
                    aria-label="Rotate object"
                >
                    <RotateIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
}

export default Toolbar;