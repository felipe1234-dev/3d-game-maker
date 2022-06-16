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
import { ScreenContext } from "@local/contexts";

function Toolbar() {
    const { screen } = React.useContext(ScreenContext);
    
    const onZoom = (type: "in" | "out") => {
        if (screen) {
            const wheelEvent = new WheelEvent("wheel", {
                deltaY: type === "in" ? -240 : +240,
                bubbles: true, 
                cancelable: true
            });
            screen.canvas.dispatchEvent(wheelEvent);
        }
    }
    
    return (
        <Box className="Editor-toolbar" component="aside">
            <Tooltip title="Zoom In" placement="right">
                <Pressable 
                    component={IconButton}
                    aria-label="Zoom In"
                    onMousePress={() => onZoom("in")}
                    ms={50}
                >
                    <ZoomInIcon />
                </Pressable>
            </Tooltip>
            <Tooltip title="Zoom Out" placement="right">
                <Pressable 
                    component={IconButton}
                    aria-label="Zoom Out"
                    onMousePress={() => onZoom("out")}
                    ms={50}
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